const express = require('express');
const classService = require('../services/classService');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const classes = await classService.getAllClasses();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const classData = await classService.getClassById(req.params.id);
    if (!classData) {
      return res.status(404).send('Class not found');
    }
    res.json(classData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching class by ID', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newClass = await classService.addClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Error adding class', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedClass = await classService.updateClass(req.params.id, req.body);
    if (!updatedClass) {
      return res.status(404).send('Class not found');
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Error updating class', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedClass = await classService.deleteClass(req.params.id);
    if (!deletedClass) {
      return res.status(404).send('Class not found');
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting class', error: error.message });
  }
});

module.exports = router;
