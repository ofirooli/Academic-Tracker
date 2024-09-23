const Task = require('../models/tasksModel');

// Get All
const getAllTasks = (filters) => {
    return Task.find(filters);
};

// Get by id
const getTaskById = (id) => {
    return Task.findById(id);
};

// Create
const addTask = (obj) => {
    const taskObj = new Task(obj);
    return taskObj.save();
};

// Update
const updateTask = (id, obj) => {
    return Task.findByIdAndUpdate(id, obj, { new: true });
};

// Delete
const deleteTask = (id) => {
    return Task.findByIdAndDelete(id);
};

module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask };
