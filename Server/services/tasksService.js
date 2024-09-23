const taskRepo = require('../repositories/tasksRepo');

const getAllTasks = (filters = {}) => {
    return taskRepo.getAllTasks(filters);
};

const getTaskById = (id) => {
    return taskRepo.getTaskById(id);
};

const addTask = (obj) => {
    return taskRepo.addTask(obj);
};

const updateTask = (id, obj) => {
    return taskRepo.updateTask(id, obj);
};

const deleteTask = (id) => {
    return taskRepo.deleteTask(id);
};

module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask };
