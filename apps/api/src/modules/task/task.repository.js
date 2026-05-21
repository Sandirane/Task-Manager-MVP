const prisma = require("../../prisma/prisma");

const findMany = async (filters = {}) => {
  return prisma.task.findMany({
    where: filters,
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findById = async (id) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

const create = async (data) => {
  return prisma.task.create({
    data,
  });
};

const update = async (id, data) => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

const remove = async (id) => {
  return prisma.task.delete({
    where: { id },
  });
};

module.exports = {
  findMany,
  findById,
  create,
  update,
  remove,
};