const Class = require('../models/classModel');

const getAllClasses = async (filters) => {
  try {
    return await Class.find(filters);
  } catch (error) {
    throw new Error('Error fetching classes from database');
  }
};

const getClassById = async (id) => {
  try {
    return await Class.findById(id);
  } catch (error) {
    throw new Error('Error fetching class by ID from database');
  }
};

const addClass = async (classData) => {
  const newClass = new Class(classData);
  try {
    return await newClass.save();
  } catch (error) {
    throw new Error('Error saving class to database');
  }
};

const updateClass = async (id, classData) => {
  try {
    return await Class.findByIdAndUpdate(id, classData, { new: true });
  } catch (error) {
    throw new Error('Error updating class in database');
  }
};

const deleteClass = async (id) => {
  try {
    return await Class.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting class from database');
  }
};

module.exports = { getAllClasses, getClassById, addClass, updateClass, deleteClass };
