const { GoogleGenAI } = require("@google/genai");
require('dotenv').config()


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateCaption(base64ImageFile) {
    // Generate a caption for the image using Gemini AI
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image in 30 words using a mix of Hinglish and English with a chill, stylish Instagram vibe. Use trendy slang, emojis, and include 3–4 cool hashtags." },
    ];

    // Call the Gemini AI model to generate the caption
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
    });

    // Return the generated caption
    return response.text;
}

module.exports = generateCaption;