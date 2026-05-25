const { z } = require("zod");

const taskStatusEnum = z.enum([
    "TODO",
    "IN_PROGRESS",
    "DONE",
]);

const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: taskStatusEnum.optional(),
});

module.exports = {
    createTaskSchema,
};