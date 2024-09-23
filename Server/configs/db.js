const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb+srv://ofir2508:ofir2508@cluster0.ewgbfik.mongodb.net/BA?retryWrites=true&w=majority', {
      writeConcern: { w: 'majority' }
    })
    .then(() => console.log('Connected to the BA Database'))
    .catch((error) => console.log('Connection error:', error.message));
};

module.exports = connectDB;
