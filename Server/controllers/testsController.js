const express = require("express");
const testService = require("../services/testsService");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const tests = await testService.getAllTests(filters);
    res.send(tests);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const test = await testService.getTestById(id);
    res.send(test);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await testService.addTest(obj);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await testService.updateTest(id, obj);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await testService.deleteTest(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
