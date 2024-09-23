const express = require("express");
const taskService = require("../services/tasksService");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const tasks = await taskService.getAllTasks(filters);
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await taskService.addTask(obj);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await taskService.updateTask(id, obj);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskService.deleteTask(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
