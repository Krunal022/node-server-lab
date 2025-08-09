const { GoogleGenerativeAI } = require("@google/generative-ai");

// Check if API key is available
if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables");
    throw new Error("GEMINI_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateResponse(chatHistory) {
    try {
        if (!chatHistory || chatHistory.length === 0) {
            throw new Error("Chat history is required");
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Convert chat history to the format expected by the API
        const history = chatHistory.slice(0, -1).map(msg => ({
            role: msg.role,
            parts: msg.parts
        }));

        const chat = model.startChat({
            history: history
        });

        // Get the last message (current user message)
        const lastMessage = chatHistory[chatHistory.length - 1];
        const userMessage = lastMessage.parts[0].text;

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();
        
        if (!text) {
            throw new Error("No text response from AI");
        }

        return text;
    } catch (error) {
        console.error("Error in generateResponse:", error);
        throw error;
    }
}

module.exports = generateResponse;