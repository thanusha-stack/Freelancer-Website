require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Project = require("./models/Project");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/freelancer";
const clients = [
    {
        name: "Sarah Johnson",
        email: "sarah.johnson@techcorp.com",
        password: "Client123!",
        role: "client",
        isProfileComplete: true,
        companyName: "TechCorp Solutions",
        contactPerson: "Sarah Johnson",
        phone: "+1-555-0101",
        website: "https://techcorp-solutions.com",
        industry: "Technology",
        description: "Leading software development company specializing in enterprise solutions and cloud infrastructure.",
        location: "San Francisco, CA 94102",
        country: "United States",
        profilePhoto: "https://ui-avatars.com/api/?name=Sarah+Johnson&size=200&background=4F46E5&color=fff"
    },
    {
        name: "Michael Chen",
        email: "michael.chen@designstudio.com",
        password: "Client123!",
        role: "client",
        isProfileComplete: true,
        companyName: "Creative Design Studio",
        contactPerson: "Michael Chen",
        phone: "+1-555-0202",
        website: "https://creativedesignstudio.com",
        industry: "Design",
        description: "Award-winning design agency creating stunning visual experiences for global brands.",
        location: "New York, NY 10001",
        country: "United States",
        profilePhoto: "https://ui-avatars.com/api/?name=Michael+Chen&size=200&background=EC4899&color=fff"
    },
    {
        name: "Emily Rodriguez",
        email: "emily.r@healthplus.com",
        password: "Client123!",
        role: "client",
        isProfileComplete: true,
        companyName: "HealthPlus Medical",
        contactPerson: "Emily Rodriguez",
        phone: "+1-555-0303",
        website: "https://healthplusmedical.com",
        industry: "Healthcare",
        description: "Innovative healthcare technology company improving patient care through digital solutions.",
        location: "Boston, MA 02108",
        country: "United States",
        profilePhoto: "https://ui-avatars.com/api/?name=Emily+Rodriguez&size=200&background=10B981&color=fff"
    },
    {
        name: "David Kumar",
        email: "david.kumar@edutech.com",
        password: "Client123!",
        role: "client",
        isProfileComplete: true,
        companyName: "EduTech Learning",
        contactPerson: "David Kumar",
        phone: "+1-555-0404",
        website: "https://edutechlearning.com",
        industry: "Education",
        description: "E-learning platform providing quality education to students worldwide.",
        location: "Austin, TX 78701",
        country: "United States",
        profilePhoto: "https://ui-avatars.com/api/?name=David+Kumar&size=200&background=F59E0B&color=fff"
    },
    {
        name: "Lisa Anderson",
        email: "lisa.a@greenventures.com",
        password: "Client123!",
        role: "client",
        isProfileComplete: true,
        companyName: "Green Ventures Inc",
        contactPerson: "Lisa Anderson",
        phone: "+1-555-0505",
        website: "https://greenventures.com",
        industry: "Environment",
        description: "Sustainable business solutions helping companies reduce their carbon footprint.",
        location: "Seattle, WA 98101",
        country: "United States",
        profilePhoto: "https://ui-avatars.com/api/?name=Lisa+Anderson&size=200&background=059669&color=fff"
    }
];

const freelancers = [
    {
        name: "Alex Thompson",
        email: "alex.thompson@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["React", "Node.js", "MongoDB", "AWS"],
        experienceLevel: "Pro",
        hourlyRate: 75,
        bio: "Full-stack developer specializing in MERN stack with 5+ years of experience building scalable web applications.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Alex+Thompson&size=200&background=3B82F6&color=fff",
        videoLikes: 124,
        profileViews: 1540
    },
    {
        name: "Leo Thomas",
        email: "leo@gmail.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["Frontend Development", "React", "Tailwind CSS"],
        experienceLevel: "Pro",
        hourlyRate: 25,
        bio: "Innovative Web Developer with over 8 years of experience in dynamic tech environments, specializing in front-end technologies and responsive design. Proven track record of increasing user engagement by 30% and optimizing web performance by 25%. Expert in React, Node.js, and implementing scalable RESTful APIs to deliver high-quality web applications.",
        language: "English",
        location: "Mumbai",
        profilePhoto: "https://ui-avatars.com/api/?name=Leo+Thomas&size=200&background=F97316&color=fff",
        videoLikes: 450,
        profileViews: 2800,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        name: "Priya Sharma",
        email: "priya.sharma@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["UI/UX Design", "Figma", "Adobe XD", "Prototyping"],
        experienceLevel: "Intermediate",
        hourlyRate: 60,
        bio: "Creative UI/UX designer passionate about creating intuitive and beautiful user experiences.",
        language: "English",
    },
    {
        name: "James Wilson",
        email: "james.wilson@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["Python", "Django", "Machine Learning", "Data Science"],
        experienceLevel: "Pro",
        hourlyRate: 85,
        bio: "Data scientist and ML engineer with expertise in building intelligent systems and predictive models.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=James+Wilson&size=200&background=8B5CF6&color=fff"
    },
    {
        name: "Maria Garcia",
        email: "maria.garcia@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["Content Writing", "SEO", "Copywriting", "Blog Management"],
        experienceLevel: "Intermediate",
        hourlyRate: 45,
        bio: "Professional content writer and SEO specialist helping businesses grow through engaging content.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Maria+Garcia&size=200&background=F59E0B&color=fff"
    },
    {
        name: "Chen Wei",
        email: "chen.wei@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["iOS", "Swift", "Android", "Kotlin", "React Native"],
        experienceLevel: "Pro",
        hourlyRate: 80,
        bio: "Mobile app developer with 6+ years building native and cross-platform applications for startups and enterprises.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Chen+Wei&size=200&background=06B6D4&color=fff"
    },
    {
        name: "Sophie Martin",
        email: "sophie.martin@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["DevOps", "Docker", "Kubernetes", "CI/CD", "Terraform"],
        experienceLevel: "Pro",
        hourlyRate: 90,
        bio: "DevOps engineer specializing in cloud infrastructure automation and containerization strategies.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Sophie+Martin&size=200&background=10B981&color=fff"
    },
    {
        name: "Raj Patel",
        email: "raj.patel@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["Blockchain", "Solidity", "Web3", "Smart Contracts", "Ethereum"],
        experienceLevel: "Intermediate",
        hourlyRate: 95,
        bio: "Blockchain developer building decentralized applications and smart contracts for DeFi and NFT projects.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Raj+Patel&size=200&background=6366F1&color=fff"
    },
    {
        name: "Emma Davis",
        email: "emma.davis@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["Video Editing", "After Effects", "Premiere Pro", "Motion Graphics"],
        experienceLevel: "Intermediate",
        hourlyRate: 55,
        bio: "Creative video editor and motion graphics designer with expertise in storytelling through visual media.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Emma+Davis&size=200&background=EF4444&color=fff"
    },
    {
        name: "Lucas Silva",
        email: "lucas.silva@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["3D Modeling", "Blender", "Maya", "3D Animation", "Rendering"],
        experienceLevel: "Pro",
        hourlyRate: 70,
        bio: "3D artist and animator creating stunning visualizations for games, films, and architectural projects.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Lucas+Silva&size=200&background=A855F7&color=fff"
    },
    {
        name: "Aisha Khan",
        email: "aisha.khan@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["WordPress", "PHP", "WooCommerce", "Elementor", "Custom Themes"],
        experienceLevel: "Intermediate",
        hourlyRate: 50,
        bio: "WordPress developer specializing in custom themes, e-commerce solutions, and performance optimization.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Aisha+Khan&size=200&background=14B8A6&color=fff"
    },
    {
        name: "Oliver Brown",
        email: "oliver.brown@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["QA Testing", "Selenium", "Test Automation", "Manual Testing", "Bug Tracking"],
        experienceLevel: "Intermediate",
        hourlyRate: 48,
        bio: "Quality assurance specialist ensuring software reliability through comprehensive testing strategies.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Oliver+Brown&size=200&background=F97316&color=fff"
    },
    {
        name: "Nina Kowalski",
        email: "nina.kowalski@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["Technical Writing", "Documentation", "API Docs", "User Manuals"],
        experienceLevel: "Pro",
        hourlyRate: 65,
        bio: "Technical writer creating clear, comprehensive documentation for software products and APIs.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Nina+Kowalski&size=200&background=84CC16&color=fff"
    },
    {
        name: "Marcus Johnson",
        email: "marcus.johnson@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["Digital Marketing", "Google Ads", "Facebook Ads", "Analytics", "SEO"],
        experienceLevel: "Pro",
        hourlyRate: 72,
        bio: "Digital marketing strategist driving growth through data-driven campaigns and conversion optimization.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Marcus+Johnson&size=200&background=DC2626&color=fff"
    },
    {
        name: "Yuki Tanaka",
        email: "yuki.tanaka@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["Product Management", "Agile", "Scrum", "Roadmapping", "User Research"],
        experienceLevel: "Pro",
        hourlyRate: 88,
        bio: "Product manager with expertise in leading cross-functional teams and delivering user-centric solutions.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Yuki+Tanaka&size=200&background=0891B2&color=fff"
    },
    {
        name: "Isabella Rossi",
        email: "isabella.rossi@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["Cybersecurity", "Penetration Testing", "Security Audits", "Ethical Hacking"],
        experienceLevel: "Pro",
        hourlyRate: 100,
        bio: "Cybersecurity specialist protecting organizations through vulnerability assessments and security implementations.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Isabella+Rossi&size=200&background=7C3AED&color=fff"
    },
    {
        name: "Daniel Kim",
        email: "daniel.kim@freelancer.com",
        password: "Freelancer123!",
        role: "freelancer",
        isProfileComplete: true,
        skills: ["Game Development", "Unity", "C#", "Unreal Engine", "Game Design"],
        experienceLevel: "Intermediate",
        hourlyRate: 68,
        bio: "Game developer creating immersive gaming experiences for mobile, PC, and console platforms.",
        language: "English",
        profilePhoto: "https://ui-avatars.com/api/?name=Daniel+Kim&size=200&background=DB2777&color=fff"
    }
];

const projectsData = [
    {
        name: "E-Commerce Platform Redesign",
        task: "Full Stack Development",
        description: "We need a complete redesign of our e-commerce platform with modern UI/UX, payment gateway integration, and inventory management system. The platform should support 10,000+ concurrent users and include admin dashboard, customer portal, and mobile responsiveness.",
        budget: 15000,
        deadline: new Date("2026-04-15"),
        status: "Pending",
        clientEmail: "sarah.johnson@techcorp.com"
    },
    {
        name: "Mobile App Development - iOS & Android",
        task: "Mobile Development",
        description: "Develop a cross-platform mobile application for our fitness tracking service. Features include workout logging, nutrition tracking, social features, and integration with wearable devices. Must support offline mode and real-time sync.",
        budget: 25000,
        deadline: new Date("2026-05-30"),
        status: "Pending",
        clientEmail: "sarah.johnson@techcorp.com"
    },
    {
        name: "Brand Identity & Logo Design",
        task: "Graphic Design",
        description: "Create a complete brand identity package including logo design, color palette, typography guidelines, and brand style guide. We're a modern fintech startup targeting millennials and Gen Z.",
        budget: 5000,
        deadline: new Date("2026-03-20"),
        status: "Pending",
        clientEmail: "michael.chen@designstudio.com"
    },
    {
        name: "Marketing Website Development",
        task: "Web Development",
        description: "Build a modern, responsive marketing website with animations, interactive elements, and SEO optimization. Should include blog section, contact forms, and integration with email marketing tools.",
        budget: 8000,
        deadline: new Date("2026-04-10"),
        status: "Pending",
        clientEmail: "michael.chen@designstudio.com"
    },
    {
        name: "Patient Management System",
        task: "Healthcare Software Development",
        description: "Develop a HIPAA-compliant patient management system with appointment scheduling, electronic health records, billing integration, and telemedicine capabilities. Must include role-based access control and audit logging.",
        budget: 35000,
        deadline: new Date("2026-06-30"),
        status: "Pending",
        clientEmail: "emily.r@healthplus.com"
    },
    {
        name: "Medical Data Analytics Dashboard",
        task: "Data Analytics & Visualization",
        description: "Create an interactive dashboard for analyzing patient data, treatment outcomes, and operational metrics. Should include real-time data visualization, custom report generation, and predictive analytics.",
        budget: 18000,
        deadline: new Date("2026-05-15"),
        status: "Pending",
        clientEmail: "emily.r@healthplus.com"
    },
    {
        name: "Online Learning Platform",
        task: "EdTech Development",
        description: "Build a comprehensive online learning platform with video streaming, interactive quizzes, progress tracking, and certification system. Should support live classes, recorded sessions, and student-teacher interaction.",
        budget: 28000,
        deadline: new Date("2026-07-20"),
        status: "Pending",
        clientEmail: "david.kumar@edutech.com"
    },
    {
        name: "Educational Content Creation",
        task: "Content Writing & Video Production",
        description: "Create 50 educational video courses on programming topics (Python, JavaScript, React). Each course should include video lessons, written materials, code examples, and practice exercises.",
        budget: 12000,
        deadline: new Date("2026-06-01"),
        status: "Pending",
        clientEmail: "david.kumar@edutech.com"
    },
    {
        name: "Carbon Footprint Tracking App",
        task: "Mobile & Web Development",
        description: "Develop an application that helps businesses track and reduce their carbon emissions. Features include data input forms, analytics dashboard, sustainability recommendations, and reporting tools.",
        budget: 22000,
        deadline: new Date("2026-05-25"),
        status: "Pending",
        clientEmail: "lisa.a@greenventures.com"
    },
    {
        name: "Sustainability Consulting Website",
        task: "Web Design & Development",
        description: "Create a professional website showcasing our sustainability consulting services. Should include case studies, blog, resource library, and client portal for document sharing.",
        budget: 9000,
        deadline: new Date("2026-04-05"),
        status: "Pending",
        clientEmail: "lisa.a@greenventures.com"
    },
    {
        name: "AI Chatbot Integration",
        task: "AI/ML Development",
        description: "Integrate an AI-powered chatbot into our customer service platform. Should handle common queries, escalate complex issues, and learn from interactions. Must support multiple languages.",
        budget: 16000,
        deadline: new Date("2026-05-10"),
        status: "Pending",
        clientEmail: "sarah.johnson@techcorp.com"
    },
    {
        name: "Social Media Marketing Campaign",
        task: "Digital Marketing",
        description: "Plan and execute a 3-month social media marketing campaign across Instagram, LinkedIn, and Twitter. Includes content creation, community management, and performance analytics.",
        budget: 7500,
        deadline: new Date("2026-06-15"),
        status: "Pending",
        clientEmail: "michael.chen@designstudio.com"
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");
        console.log("\n🗑️  Clearing existing data...");
        await User.deleteMany({});
        await Project.deleteMany({});
        console.log("✅ Existing data cleared");
        console.log("\n👥 Creating clients...");
        const createdClients = [];
        for (const client of clients) {
            console.log(`   Creating client: ${client.name}...`);
            const hashedPassword = await bcrypt.hash(client.password, 10);
            const newClient = await User.create({
                ...client,
                password: hashedPassword
            });
            createdClients.push(newClient);
            console.log(`   ✓ Created client: ${client.name} (${client.email})`);
        }
        console.log("\n💼 Creating freelancers...");
        for (const freelancer of freelancers) {
            const hashedPassword = await bcrypt.hash(freelancer.password, 10);
            await User.create({
                ...freelancer,
                password: hashedPassword
            });
            console.log(`   ✓ Created freelancer: ${freelancer.name} (${freelancer.email})`);
        }
        console.log("\n📋 Creating projects...");
        for (const projectData of projectsData) {
            const client = createdClients.find(c => c.email === projectData.clientEmail);
            if (client) {
                await Project.create({
                    name: projectData.name,
                    task: projectData.task,
                    description: projectData.description,
                    budget: projectData.budget,
                    deadline: projectData.deadline,
                    status: projectData.status,
                    clientId: client._id
                });
                console.log(`   ✓ Created project: ${projectData.name} ($${projectData.budget})`);
            }
        }

        console.log("\n✅ Database seeded successfully!");
        console.log("\n📊 Summary:");
        console.log(`   - ${clients.length} clients created`);
        console.log(`   - ${freelancers.length} freelancers created`);
        console.log(`   - ${projectsData.length} projects created`);
        console.log("\n🔐 Login credentials:");
        console.log("   Clients: password = Client123!");
        console.log("   Freelancers: password = Freelancer123!");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
