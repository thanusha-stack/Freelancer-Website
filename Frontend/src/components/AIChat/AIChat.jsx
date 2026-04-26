import React, { useState, useRef, useEffect, useCallback } from "react";
import "./AIChat.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Role-aware suggestions
const SUGGESTIONS = {
    freelancer: [
        "Find React projects under $500",
        "Show me Python projects",
        "How do I apply for a project?",
        "Find short-deadline projects",
    ],
    client: [
        "Find React developers",
        "Show me Python freelancers",
        "How do I post a project?",
        "Find affordable freelancers",
    ],
    default: [
        "What is HireElite?",
        "How does this platform work?",
        "Show me open projects",
        "Find skilled freelancers",
    ],
};

// ── Icons ──────────────────────────────────────────────────────────────────────

const BotIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM7.05 14a5 5 0 1 0 9.9 0H7.05zM9 15a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM3 20h18v2H3v-2z" />
    </svg>
);

const SendIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
    </svg>
);

// ── Helpers ────────────────────────────────────────────────────────────────────

function getToken() {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
}

function getUserRole() {
    try {
        const token = getToken();
        if (!token) return null;
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.role || null;
    } catch {
        return null;
    }
}

// ── Component ──────────────────────────────────────────────────────────────────

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showBadge, setShowBadge] = useState(true);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const userRole = getUserRole();
    const isLoggedIn = !!getToken();
    const suggestions = SUGGESTIONS[userRole] || SUGGESTIONS.default;

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    // Focus input when panel opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
        setShowBadge(false);
    };

    const sendMessage = useCallback(async (queryText) => {
        const text = (queryText || input).trim();
        if (!text || isLoading) return;

        const token = getToken();
        if (!token) {
            setError("Please log in to use HireBot.");
            return;
        }

        setError(null);
        setInput("");

        // Add user message
        setMessages(prev => [...prev, { role: "user", text }]);
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE}/api/rag/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ query: text }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Something went wrong");
            }

            const data = await response.json();

            // Add bot response
            setMessages(prev => [
                ...prev,
                {
                    role: "bot",
                    text: data.answer,
                    sources: data.sources || [],
                },
            ]);
        } catch (err) {
            setError(err.message || "HireBot is unavailable. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleSuggestion = (suggestion) => {
        sendMessage(suggestion);
    };

    // Auto-resize textarea
    const handleInputChange = (e) => {
        setInput(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
    };

    // Summarise sources into readable chips
    const getSourceChips = (sources) => {
        const counts = { project: 0, freelancer: 0, faq: 0 };
        sources.forEach(s => {
            if (counts[s.type] !== undefined) counts[s.type]++;
        });
        return Object.entries(counts)
            .filter(([, count]) => count > 0)
            .map(([type, count]) => {
                const labels = { project: "📋 Projects", freelancer: "👤 Freelancers", faq: "❓ FAQs" };
                return `${labels[type]}: ${count}`;
            });
    };

    // ── Render ──────────────────────────────────────────────────────────────────

    return (
        <>
            {/* Floating Trigger Button */}
            <button
                id="ai-chat-trigger-btn"
                className="ai-chat-trigger"
                onClick={handleOpen}
                aria-label="Open HireBot AI assistant"
                title="Chat with HireBot"
                style={{ display: isOpen ? "none" : "flex" }}
            >
                <BotIcon />
                {showBadge && <span className="ai-chat-badge">AI</span>}
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div id="ai-chat-panel" className="ai-chat-panel" role="dialog" aria-label="HireBot AI Assistant">

                    {/* Header */}
                    <div className="ai-chat-header">
                        <div className="ai-chat-header-avatar">🤖</div>
                        <div className="ai-chat-header-info">
                            <div className="ai-chat-header-name">HireBot</div>
                            <div className="ai-chat-header-status">Online · AI Assistant</div>
                        </div>
                        <button
                            id="ai-chat-close-btn"
                            className="ai-chat-close-btn"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="ai-chat-messages" id="ai-chat-messages">
                        {messages.length === 0 && !isLoading && (
                            <div className="ai-chat-empty">
                                <div className="ai-chat-empty-icon">🤖</div>
                                <h4>Hi, I'm HireBot!</h4>
                                <p>
                                    {userRole === "freelancer"
                                        ? "Ask me to find projects that match your skills, or anything about HireElite."
                                        : userRole === "client"
                                        ? "Ask me to find skilled freelancers, or anything about HireElite."
                                        : "I can help you find projects, freelancers, or answer questions about HireElite."}
                                </p>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} className={`ai-chat-message ${msg.role}`}>
                                <div className="ai-chat-message-avatar">
                                    {msg.role === "bot" ? "🤖" : "👤"}
                                </div>
                                <div>
                                    <div className="ai-chat-bubble">{msg.text}</div>
                                    {msg.role === "bot" && msg.sources && msg.sources.length > 0 && (
                                        <div className="ai-chat-sources">
                                            <span className="ai-chat-source-chip">🔍 Based on:</span>
                                            {getSourceChips(msg.sources).map((chip, ci) => (
                                                <span key={ci} className="ai-chat-source-chip">{chip}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isLoading && (
                            <div className="ai-chat-message bot ai-chat-typing">
                                <div className="ai-chat-message-avatar">🤖</div>
                                <div className="ai-chat-typing-dots">
                                    <span /><span /><span />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="ai-chat-error" role="alert">⚠️ {error}</div>
                    )}

                    {/* Suggestions */}
                    {messages.length === 0 && (
                        <div className="ai-chat-suggestions">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    className="ai-chat-suggestion-btn"
                                    onClick={() => handleSuggestion(s)}
                                    disabled={isLoading}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input area */}
                    <div className="ai-chat-input-area">
                        {!isLoggedIn ? (
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12.5px", margin: "0 auto", fontFamily: "Inter, sans-serif" }}>
                                Please <a href="/Login" style={{ color: "#a5b4fc" }}>log in</a> to chat with HireBot.
                            </p>
                        ) : (
                            <>
                                <textarea
                                    ref={inputRef}
                                    id="ai-chat-input"
                                    className="ai-chat-input"
                                    value={input}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask HireBot anything…"
                                    rows={1}
                                    disabled={isLoading}
                                    aria-label="Chat message input"
                                />
                                <button
                                    id="ai-chat-send-btn"
                                    className="ai-chat-send-btn"
                                    onClick={() => sendMessage()}
                                    disabled={isLoading || !input.trim()}
                                    aria-label="Send message"
                                >
                                    <SendIcon />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChat;
