const repository = require("./task.repository");

const getAllTasks = async (user) => {
  return repository.findMany({
    userId: user.id,
  });
};

const getTaskById = async (id, user) => {
  const task = await repository.findById(id, user.id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

const createTask = async (data) => {
  return repository.create(data);
};

const updateTask = async (id, user, data) => {
  const task = await repository.update(id, user.id, data);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

const deleteTask = async (id, user) => {
  const task = await repository.remove(id, user.id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};