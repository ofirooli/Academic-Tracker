const express = require("express");
const scoreService = require("../services/scoreService");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const scores = await scoreService.getAllScores(filters);
    res.send(scores);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const score = await scoreService.getScoreById(id);
    res.send(score);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await scoreService.addScore(obj);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await scoreService.updateScore(id, obj);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await scoreService.deleteScore(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
