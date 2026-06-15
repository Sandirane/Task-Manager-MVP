const { z } = require("zod");

const taskStatusEnum = z.enum([
    "TODO",
    "IN_PROGRESS",
    "DONE",
]);

const priorityEnum = z.enum([
    'LOW',
    'MEDIUM',
    'HIGH',
]);

const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: taskStatusEnum.default("TODO"),
    priority: priorityEnum.default("LOW"),
    dueDate: z.string().datetime().optional(),
});

module.exports = {
    createTaskSchema,
};