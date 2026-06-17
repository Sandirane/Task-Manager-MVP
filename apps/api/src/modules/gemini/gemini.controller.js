const geminiService = require("./gemini.service");
const { analyzeSchema } = require("./gemini.validation");

const analyze = async (req, res, next) => {
    try {
        const { question } = analyzeSchema.parse(req.body);

        const answer = await geminiService.analyze(
            req.body.question,
            req.user
        );

        return res.status(200).json({
            answer,
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    analyze,
};