const testsRepo = require('../repositories/testsRepo');

const getAllTests = (filters = {}) => {
    return testsRepo.getAllTests(filters);
};

const getTestById = (id) => {
    return testsRepo.getTestById(id);
};

const addTest = (obj) => {
    return testsRepo.addTest(obj);
};

const updateTest = (id, obj) => {
    return testsRepo.updateTest(id, obj);
};

const deleteTest = (id) => {
    return testsRepo.deleteTest(id);
};

module.exports = { getAllTests, getTestById, addTest, updateTest, deleteTest };
