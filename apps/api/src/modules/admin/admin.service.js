const repository = require("./admin.repository");

const getStats = async () => {
  return repository.getStats();
};

const getAllTasks = async () => {
  return repository.getAllTasks();
};

const deleteTask = async (id) => {
  const task = await repository.deleteTask(id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

module.exports = {
  getStats,
  getAllTasks,
  deleteTask,
};