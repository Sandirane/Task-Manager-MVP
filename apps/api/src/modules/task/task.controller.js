const { createTaskSchema } = require("./task.validation");
const taskService = require("./task.service");

const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks(req.user);

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(
      req.params.id,
      req.user
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const validatedData = createTaskSchema.parse(req.body);

    const task = await taskService.createTask({
      ...validatedData,
      userId: req.user.id,
      //userId: req.user.sub,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const validatedData =
      createTaskSchema.partial().parse(req.body);

    const task = await taskService.updateTask(
      req.params.id,
      req.user,
      validatedData
    );

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(
      req.params.id,
      req.user
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};