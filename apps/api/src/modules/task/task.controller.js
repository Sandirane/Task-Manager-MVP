const { createTaskSchema } = require("./task.validation");
const taskService = require("./task.service");

const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

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

const fakeUser = {
  id: "dev-user",
  role: "admin",
};

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask({
      title: req.body.title,
      description: req.body.description,
      userId: fakeUser.id,
    });
    /*
    const validatedData = createTaskSchema.parse(req.body);

    const task = await taskService.createTask(validatedData);
    */
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const validatedData = createTaskSchema.partial().parse(req.body);

    const task = await taskService.updateTask(
      req.params.id,
      validatedData
    );

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);

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