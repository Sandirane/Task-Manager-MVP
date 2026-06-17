const { z } = require("zod");

const analyzeSchema = z.object({
  question: z
    .string()
    .min(3)
    .max(1000),
});

module.exports = {
  analyzeSchema,
};