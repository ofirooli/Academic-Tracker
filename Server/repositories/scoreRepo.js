const Score = require('../models/scoreModel');

// Get All
const getAllScores = (filters) => {
    return Score.find(filters);
};

// Get by id
const getScoreById = (id) => {
    return Score.findById(id);
};

// Create
const addScore = (obj) => {
    const scoreObj = new Score(obj);
    return scoreObj.save();
};

// Update
const updateScore = (id, obj) => {
    return Score.findByIdAndUpdate(id, obj, { new: true });
};

// Delete
const deleteScore = (id) => {
    return Score.findByIdAndDelete(id);
};

module.exports = { getAllScores, getScoreById, addScore, updateScore, deleteScore };
