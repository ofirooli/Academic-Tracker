const Test = require('../models/testsModel');

// Get All
const getAllTests = (filters) => {
    return Test.find(filters);
};

// Get by id
const getTestById = (id) => {
    return Test.findById(id);
};

// Create
const addTest = (obj) => {
    const testObj = new Test(obj);
    return testObj.save();
};

// Update
const updateTest = (id, obj) => {
    return Test.findByIdAndUpdate(id, obj, { new: true });
};

// Delete
const deleteTest = (id) => {
    return Test.findByIdAndDelete(id);
};

module.exports = { getAllTests, getTestById, addTest, updateTest, deleteTest };
