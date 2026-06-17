const { GoogleGenerativeAI } = require("@google/generative-ai");
const { buildPrompt } = require("./gemini.prompts");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL,
});

const analyze = async (question) => {
    const prompt = buildPrompt(question);
    const result = await model.generateContent(prompt);
    return result.response.text();
};

module.exports = {
    analyze,
};