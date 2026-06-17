const { GoogleGenerativeAI } = require("@google/generative-ai");
const { buildPrompt } = require("./gemini.prompts");
const taskRepository = require("../task/task.repository");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL,
});

const analyze = async (question, user) => {

    const tasks = await taskRepository.findMany({
        userId: user.id,
    });

    try {

        const prompt = buildPrompt(question, tasks);
        const result = await model.generateContent(prompt);
        return result.response.text();

    } catch (error) {

        console.error("Erreur Gemini :", error);
        throw new Error("Erreur lors de l'appel à Gemini");

    }
};

module.exports = {
    analyze,
};