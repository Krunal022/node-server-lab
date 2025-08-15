const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function aiService(prompt) {
    // Add formatting instructions for code responses

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            systemInstruction: `IMPORTANT FORMATTING RULES FOR CODE RESPONSES:
- When providing code, always use proper Markdown code blocks with triple backticks
- Always specify the language after the backticks (e.g., \`\`\`javascript, \`\`\`html, \`\`\`css)
- Keep code well-formatted with proper indentation
- Do not mix explanations inside code blocks - explanations must be outside
- For multiple files, separate into different code blocks with filename comments
- Keep explanations short and simple in text form
- Ensure responses fit well in chat windows without unnecessary scrollbars
- Never produce raw, messy, unstructured code dumps`,
        },
    });
    return response.text;
}

module.exports = aiService;