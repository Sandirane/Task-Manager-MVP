const prisma = require("../../config/prisma");

const findMany = async (filters = {}) => {
  return prisma.task.findMany({
    where: filters,
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findById = async (id, userId) => {
  return prisma.task.findFirst({
    where: {
      id,
      userId,
    },
  });
};

const create = async (data) => {
  return prisma.task.create({
    data,
  });
};

const update = async (id, userId, data) => {
  return prisma.task.updateMany({
    where: {
      id,
      userId,
    },
    data,
  });
};

const remove = async (id, userId) => {
  return prisma.task.deleteMany({
    where: {
      id,
      userId,
    },
  });
};

module.exports = {
  findMany,
  findById,
  create,
  update,
  remove,
};