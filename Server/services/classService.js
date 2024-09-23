const classRepo = require('../repositories/classRepo');

const getAllClasses = async () => {
  try {
    const classes = await classRepo.getAllClasses();
    console.log('Fetched all classes');
    return classes;
  } catch (error) {
    console.error('Error fetching classes:', error.message);
    throw new Error('Error fetching classes');
  }
};

const getClassById = async (id) => {
  try {
    const classData = await classRepo.getClassById(id);
    console.log(`Fetched class with ID: ${id}`);
    return classData;
  } catch (error) {
    console.error(`Error fetching class by ID ${id}:`, error.message);
    throw new Error('Error fetching class by ID');
  }
};

const addClass = async (classData) => {
  try {
    const newClass = await classRepo.addClass(classData);
    console.log('Added new class');
    return newClass;
  } catch (error) {
    console.error('Error adding class:', error.message);
    throw new Error('Error adding class');
  }
};

const updateClass = async (id, classData) => {
  try {
    const updatedClass = await classRepo.updateClass(id, classData);
    console.log(`Updated class with ID: ${id}`);
    return updatedClass;
  } catch (error) {
    console.error(`Error updating class with ID ${id}:`, error.message);
    throw new Error('Error updating class');
  }
};

const deleteClass = async (id) => {
  try {
    const deletedClass = await classRepo.deleteClass(id);
    console.log(`Deleted class with ID: ${id}`);
    return deletedClass;
  } catch (error) {
    console.error(`Error deleting class with ID ${id}:`, error.message);
    throw new Error('Error deleting class');
  }
};

module.exports = { getAllClasses, getClassById, addClass, updateClass, deleteClass };
