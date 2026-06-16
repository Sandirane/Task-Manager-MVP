const adminService = require("./admin.service");

const getStats = async (req, res, next) => {
  try {
    const stats = await adminService.getStats();

    res.json(stats);
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await adminService.getAllTasks();

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await adminService.deleteTask(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  getAllTasks,
  deleteTask,
};