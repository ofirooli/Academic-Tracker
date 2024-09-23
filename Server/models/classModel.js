const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    className: { type: String, required: true },
    classNumber: { type: String, required: true },
    semester: { type: String, required: true },
    schoolYear: { type: String, required: true },
    creditPoints: { type: Number, default: 0 },
    teacherName: { type: String, required: true },
    classStartDate: { type: Date, required: true },
    classEndDate: { type: Date, required: true }
  });
  
  const Class = mongoose.model('Class', classSchema);

module.exports = Class