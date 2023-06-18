const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 60,
    },
    dateCreated: {
        type: String,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Category must have an owner'],
    },
},
{
    versionKey: false,
    timestamps: true,
  },
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;