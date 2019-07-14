const mongoose = require('mongoose');

const taksSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model('Task', taksSchema);

module.exports = Task;
