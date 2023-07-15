const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
    dateStart: {
        type: String,
    },
    dateEnd: {
        type: String,
  },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Task must have an category'],
        trim: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Task must have an owner'],
  },
    statusTask: {
        type: String,
        enum: ['to_do', 'in_progress', 'review','done'],
        default: 'to_do',
        trim: true,
    },
},
{
    versionKey: false,
    timestamps: true,
  },
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;