const repository = require("./task.repository");

const getAllTasks = async (user) => {
  return repository.findMany({
    userId: user.sub,
  });
};

const getTaskById = async (id, user) => {
  return repository.findById(id, user.id);
};

const createTask = async (data) => {
  return repository.create(data);
};

const updateTask = async (id, user, data) => {
  return repository.update(id, user.id, data);
};

const deleteTask = async (id, user) => {
  return repository.remove(id, user.id);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};