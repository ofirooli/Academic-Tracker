const scoreRepo = require('../repositories/scoreRepo');

const getAllScores = (filters = {}) => {
    return scoreRepo.getAllScores(filters);
};

const getScoreById = (id) => {
    return scoreRepo.getScoreById(id);
};

const addScore = (obj) => {
    return scoreRepo.addScore(obj);
};

const updateScore = (id, obj) => {
    return scoreRepo.updateScore(id, obj);
};

const deleteScore = (id) => {
    return scoreRepo.deleteScore(id);
};

module.exports = { getAllScores, getScoreById, addScore, updateScore, deleteScore };
