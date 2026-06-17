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

  //console.log(data);
  return prisma.task.create({
    data,
  });
};

const update = async (id, userId, data) => {
  const task = await prisma.task.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!task) {
    return null;
  }

  return prisma.task.update({
    where: {
      id,
    },
    data,
  });
};

const remove = async (id, userId) => {
  const task = await prisma.task.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!task) {
    return null;
  }

  return prisma.task.delete({
    where: {
      id,
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