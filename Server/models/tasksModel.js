const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    classID: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    task: { type: String, required: true },
    taskDueDate: { type: Date, required: true },
    taskStatus: { type: String, enum: ['pending', 'completed', 'overdue'], default: 'pending' },
  });
  
  const Task = mongoose.model('Task', taskSchema);