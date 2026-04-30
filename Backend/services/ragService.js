const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require("mongoose");
const Embedding = require("../models/Embedding");
const Project = require("../models/Project");
const User = require("../models/User");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ─── Static FAQ knowledge base ────────────────────────────────────────────────
const FAQ_DOCS = [
    {
        text: "HireElite is a freelancer platform that connects skilled freelancers with clients who need project work done. Clients post projects with budgets and deadlines, and freelancers apply to complete them.",
        metadata: { topic: "platform overview" },
    },
    {
        text: "To apply for a project on HireElite, navigate to View Projects as a freelancer, browse available pending projects, and click Apply on any project that matches your skills.",
        metadata: { topic: "how to apply" },
    },
    {
        text: "Clients can post a new project by clicking Post Project, entering the project name, task description, budget, and deadline. Projects are visible to all freelancers once posted.",
        metadata: { topic: "posting projects" },
    },
    {
        text: "Freelancers can build a profile including their skills, bio, hourly rate, experience, and education. A strong profile increases the chances of being hired.",
        metadata: { topic: "freelancer profile" },
    },
    {
        text: "Project statuses on HireElite are: Pending (open for applications), In Progress (a freelancer has been assigned), and Done (project completed).",
        metadata: { topic: "project status" },
    },
    {
        text: "Clients can view all freelancer applications for their projects and accept or reject them. Once accepted, the project moves to In Progress status.",
        metadata: { topic: "application review" },
    },
    {
        text: "HireElite supports notifications so both clients and freelancers are informed when applications are submitted, accepted, or rejected.",
        metadata: { topic: "notifications" },
    },
];

// ─── Embed a single piece of text using Gemini ────────────────────────────────
async function embedText(text) {
    const model = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
    const result = await model.embedContent(text);
    return result.embedding.values; // float array
}

// ─── Convert a Project doc to plain text ──────────────────────────────────────
function projectToText(project) {
    const parts = [
        `Project: ${project.name}`,
        `Task: ${project.task}`,
        project.description ? `Description: ${project.description}` : null,
        project.budget ? `Budget: ${project.budget}` : null,
        project.deadline ? `Deadline: ${new Date(project.deadline).toDateString()}` : null,
        `Status: ${project.status}`,
    ];
    return parts.filter(Boolean).join(". ");
}

// ─── Convert a Freelancer User doc to plain text ──────────────────────────────
function freelancerToText(user) {
    const skills = user.skills && user.skills.length > 0 ? `Skills: ${user.skills.join(", ")}` : null;
    const exp = user.experience && user.experience.length > 0
        ? `Experience: ${user.experience.map(e => `${e.jobTitle} at ${e.employer}`).join("; ")}`
        : null;
    const parts = [
        `Freelancer: ${user.name}`,
        user.bio ? `Bio: ${user.bio}` : null,
        user.description ? `About: ${user.description}` : null,
        skills,
        user.hourlyRate ? `Hourly Rate: $${user.hourlyRate}/hr` : null,
        user.location ? `Location: ${user.location}` : null,
        user.experienceLevel ? `Experience Level: ${user.experienceLevel}` : null,
        exp,
    ];
    return parts.filter(Boolean).join(". ");
}

// ─── Ingest all platform data into vector store ───────────────────────────────
async function ingestDocuments() {
    console.log("🔄 Starting RAG ingestion...");

    // Clear existing embeddings
    await Embedding.deleteMany({});
    console.log("🗑️  Cleared old embeddings");

    const results = { projects: 0, freelancers: 0, faqs: 0, errors: 0 };

    // 1. Ingest Projects
    const projects = await Project.find({ status: "Pending" }).lean();
    for (const project of projects) {
        try {
            const text = projectToText(project);
            const vector = await embedText(text);
            await Embedding.create({
                docType: "project",
                docId: project._id,
                text,
                vector,
                metadata: {
                    name: project.name,
                    status: project.status,
                    budget: project.budget,
                    deadline: project.deadline,
                },
            });
            results.projects++;
        } catch (err) {
            console.error(`❌ Failed to embed project ${project._id}:`, err.message);
            results.errors++;
        }
    }
    console.log(`✅ Embedded ${results.projects} projects`);

    // 2. Ingest Freelancer profiles
    const freelancers = await User.find({ role: "freelancer", isProfileComplete: true }).lean();
    for (const user of freelancers) {
        try {
            const text = freelancerToText(user);
            const vector = await embedText(text);
            await Embedding.create({
                docType: "freelancer",
                docId: user._id,
                text,
                vector,
                metadata: {
                    name: user.name,
                    skills: user.skills,
                    hourlyRate: user.hourlyRate,
                    location: user.location,
                },
            });
            results.freelancers++;
        } catch (err) {
            console.error(`❌ Failed to embed freelancer ${user._id}:`, err.message);
            results.errors++;
        }
    }
    console.log(`✅ Embedded ${results.freelancers} freelancers`);

    // 3. Ingest FAQ docs
    for (const faq of FAQ_DOCS) {
        try {
            const vector = await embedText(faq.text);
            await Embedding.create({
                docType: "faq",
                docId: null,
                text: faq.text,
                vector,
                metadata: faq.metadata,
            });
            results.faqs++;
        } catch (err) {
            console.error(`❌ Failed to embed FAQ:`, err.message);
            results.errors++;
        }
    }
    console.log(`✅ Embedded ${results.faqs} FAQ entries`);
    console.log(`📊 Ingestion complete:`, results);

    return results;
}

// ─── Vector similarity search using cosine similarity (in-memory fallback) ───
// Note: For production, replace with MongoDB Atlas $vectorSearch aggregation
// after creating the Atlas Vector Search index named "vector_index".
async function vectorSearch(queryVector, k = 5) {
    // Try Atlas $vectorSearch first (requires index), fall back to in-memory
    try {
        const collection = mongoose.connection.collection("embeddings");
        const results = await collection.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index",
                    path: "vector",
                    queryVector,
                    numCandidates: 50,
                    limit: k,
                },
            },
            {
                $project: {
                    docType: 1,
                    docId: 1,
                    text: 1,
                    metadata: 1,
                    score: { $meta: "vectorSearchScore" },
                },
            },
        ]).toArray();

        if (results.length > 0) return results;
    } catch (atlasErr) {
        // Atlas vector search index not yet created — use cosine fallback
        console.warn("⚠️  Atlas $vectorSearch not available, using cosine fallback:", atlasErr.message);
    }

    // ── Cosine similarity fallback ──
    const allEmbeddings = await Embedding.find({}).lean();
    if (allEmbeddings.length === 0) return [];

    const cosineSim = (a, b) => {
        let dot = 0, magA = 0, magB = 0;
        for (let i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            magA += a[i] * a[i];
            magB += b[i] * b[i];
        }
        return dot / (Math.sqrt(magA) * Math.sqrt(magB) + 1e-10);
    };

    const scored = allEmbeddings.map(doc => ({
        ...doc,
        score: cosineSim(queryVector, doc.vector),
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, k);
}

// ─── Build Gemini prompt from retrieved context ────────────────────────────────
function buildPrompt(query, contextDocs, userRole) {
    const roleContext = userRole === "client"
        ? "The user is a CLIENT looking to hire freelancers or manage projects."
        : userRole === "freelancer"
        ? "The user is a FREELANCER looking for work opportunities or platform guidance."
        : "The user is browsing the HireElite platform.";

    const contextText = contextDocs
        .map((doc, i) => `[${i + 1}] (${doc.docType.toUpperCase()}) ${doc.text}`)
        .join("\n\n");

    return `You are HireBot, the AI assistant for HireElite — a freelancer marketplace platform.
${roleContext}

Answer the user's question using ONLY the context provided below. Be concise, helpful, and specific.
If the context doesn't contain enough information, say so honestly and suggest the user browse the platform.
Do NOT make up freelancer names, project details, or budgets that aren't in the context.

CONTEXT:
${contextText}

USER QUESTION: ${query}

ANSWER:`;
}

// ─── Main RAG chat function ────────────────────────────────────────────────────
async function ragChat(query, userRole = "client") {
    // 1. Check if there are any embeddings
    const count = await Embedding.countDocuments();
    if (count === 0) {
        return {
            answer: "⚠️ The knowledge base is empty. Please ask an admin to run the data ingestion first.",
            sources: [],
        };
    }

    // 2. Embed the query
    const queryVector = await embedText(query);

    // 3. Retrieve top-5 relevant docs
    const topDocs = await vectorSearch(queryVector, 5);

    // 4. Build prompt and call Gemini
    const prompt = buildPrompt(query, topDocs, userRole);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    // 5. Build sources summary
    const sources = topDocs.map(doc => ({
        type: doc.docType,
        text: doc.text.substring(0, 120) + "...",
        score: doc.score ? parseFloat(doc.score.toFixed(3)) : undefined,
        metadata: doc.metadata,
    }));

    return { answer, sources };
}

module.exports = { ragChat, ingestDocuments, embedText };
