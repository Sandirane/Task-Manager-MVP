const prisma = require("../../config/prisma");

const getStats = async () => {
    const totalTasks = await prisma.task.count();

    const todoTasks = await prisma.task.count({
        where: {
            status: "TODO",
        },
    });

    const inProgressTasks = await prisma.task.count({
        where: {
            status: "IN_PROGRESS",
        },
    });

    const doneTasks = await prisma.task.count({
        where: {
            status: "DONE",
        },
    });

    const highPriorityTasks = await prisma.task.count({
        where: {
            priority: "HIGH",
        },
    });

    return {
        totalTasks,
        todoTasks,
        inProgressTasks,
        doneTasks,
        highPriorityTasks,
    };
};

const getAllTasks = async () => {
    return prisma.task.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            createdAt: true,
            updatedAt: true,
            dueDate: true,
            userId: true,
        },
    });
};

const deleteTask = async (id) => {
    return prisma.task.delete({
        where: {
            id,
        },
    });
};

module.exports = {
    getStats,
    getAllTasks,
    deleteTask,
};