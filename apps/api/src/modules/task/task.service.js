const repository = require("./task.repository");

const getAllTasks = async () => {
  return repository.findMany();
};

const getTaskById = async (id) => {
  return repository.findById(id);
};

const createTask = async (data) => {
  return repository.create(data);
};

const updateTask = async (id, data) => {
  return repository.update(id, data);
};

const deleteTask = async (id) => {
  return repository.remove(id);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};