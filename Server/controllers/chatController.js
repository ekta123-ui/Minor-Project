// const { colaSystem } = require("../services/chatbotService");
const { saveChatLog, getChatHistory } = require("../models/chatModel");
const { colaModel } = require("../services/colaModelService");

// POST /api/chat  — existing chatbot
const handleChat = async (req, res) => {
    const { query, studentId } = req.body;

    if (!query) {
        return res.status(400).json({ error: "query is required." });
    }
    const UNKNOWN_QUERY_RESPONSE = "I am working on this. Your query has been noted for future improvements.";

    try {
        const botResponse = colaModel(query);
        const isUnknownLocal = botResponse.startsWith("❓");
        const finalBotResponse = isUnknownLocal ? UNKNOWN_QUERY_RESPONSE : botResponse;

        await saveChatLog(studentId || null, query, finalBotResponse, isUnknownLocal);

        res.json({
            content: [{ type: "text", text: finalBotResponse }]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong." });
    }
};

// GET /api/chat/history/:studentId
const getChatHistoryHandler = async (req, res) => {
    try {
        const rows = await getChatHistory(req.params.studentId);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /api/chat/ai  — proxies Anthropic with COLA model pre-classification
const proxyAI = async (req, res) => {
    const { query, systemPrompt, studentId } = req.body;
    if (!query) return res.status(400).json({ error: "query is required." });

    const UNKNOWN_QUERY_RESPONSE = "I am working on this. Your query has been noted for future improvements.";

    try {
        // ── Run local COLA model first ──────────────────────────────────────
        const localAnswer = colaModel(query);
        const hasLocalAnswer = !localAnswer.startsWith("❓");

        // ── Build enhanced system prompt with local model result ────────────
        const enhancedSystem = `${systemPrompt || ""}

## LOCAL MODEL PRE-ANALYSIS
The local COLA model has already processed this query and produced:
${localAnswer}

Use this pre-analysis to give a more accurate, specific response. 
If the local model found an office/coordinator, confirm and expand on it.
If the local model returned ❓, use your training data to answer.`;

        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "anthropic-version": "2023-06-01",
                "x-api-key": process.env.ANTHROPIC_API_KEY,
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20240620",
                max_tokens: 1000,
                system: enhancedSystem,
                messages: [{ role: "user", content: query }],
            }),
        });

        let finalResponse;
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            // If Anthropic fails:
            if (hasLocalAnswer) {
                // Fallback to local model answer if available
                await saveChatLog(studentId || null, query, localAnswer);
                return res.json({
                    content: [{ type: "text", text: localAnswer }],
                    source: "local_model",
                });
            }
            // If Anthropic fails AND local model has no answer, log as unknown
            await saveChatLog(studentId || null, query, UNKNOWN_QUERY_RESPONSE, true);
            return res.status(200).json({ // Return 200 OK with a friendly message
                content: [{ type: "text", text: UNKNOWN_QUERY_RESPONSE }],
                source: "unknown_query_fallback",
            });
        }

        const data = await response.json();
        
        // Log successful AI response to DB
        const aiText = data.content?.[0]?.text || UNKNOWN_QUERY_RESPONSE;
        // If local model had no answer, and Anthropic also gave a generic/empty response, mark as unknown
        const isUnknown = !hasLocalAnswer && aiText === UNKNOWN_QUERY_RESPONSE;
        await saveChatLog(studentId || null, query, aiText, isUnknown);

        res.json(data);

    } catch (err) {
        console.error("proxyAI error:", err);

        // If Anthropic is unreachable AND local model has no answer, log as unknown
        if (!hasLocalAnswer) {
            await saveChatLog(studentId || null, query, UNKNOWN_QUERY_RESPONSE, true);
            return res.status(200).json({
                content: [{ type: "text", text: UNKNOWN_QUERY_RESPONSE }],
                source: "network_error_unknown_query_fallback",
            });
        }

        // Fallback to local model if Anthropic is unreachable
        const localAnswer = colaModel(query);
        if (!localAnswer.startsWith("❓")) {
            return res.json({
                content: [{ type: "text", text: `${localAnswer}\n\n_(AI offline — showing local database result)_` }],
                source: "local_model_fallback",
            });
        }

        res.status(500).json({ error: "An unexpected server error occurred." });
    }
};

// POST /api/chat/classify  — returns just the office classification
const classifyQuery = (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "query is required." });
    const result = colaModel(query);
    res.json({ classification: result });
};

module.exports = {
    handleChat,
    getChatHistoryHandler,
    proxyAI,
    classifyQuery,
};