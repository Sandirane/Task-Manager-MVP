const express = require("express");
const cors = require("cors");

const taskRoutes = require("./modules/task/task.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use("/tasks", taskRoutes);
app.use(errorMiddleware);

module.exports = app;