const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
    classID: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    classScore: { type: Number, required: true },
  });

  const Score = mongoose.model('Score', scoreSchema);
