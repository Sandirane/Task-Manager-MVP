const geminiService = require("./gemini.service");
const { analyzeSchema } = require("./gemini.validation");

const analyze = async (req, res, next) => {
    try {

        const { question } =
            analyzeSchema.parse(req.body);

        const answer =
            await geminiService.analyze(question);

        res.json({
            answer,
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    analyze,
};