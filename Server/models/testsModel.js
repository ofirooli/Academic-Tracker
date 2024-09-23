const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  testDate: { type: Date, required: true },
  semester: { type: String, required: true },
  year: { type: Number, required: true },
  teacherName: { type: String, required: true },
  classID: { type: mongoose.Schema.Types.ObjectId, ref: 'Classes', required: true }, // This is a reference
});

module.exports = mongoose.model('Tests', testSchema);
