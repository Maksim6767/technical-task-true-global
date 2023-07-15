const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userRolesEnum = require ('../constants/userRolesEnum');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false, 
    },
    role: {
        type: String,
        enam: Object.values(userRolesEnum), 
        default: userRolesEnum.USER,
    },
    chatId: {
        type: Number,
        default: 0,
  },
},
{versionKey: false},
);

userSchema.pre('save', async function (next) { 
    if (!this.isModified('password')) return next(); 

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
 
    next();
});

userSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);

const User = mongoose.model('User', userSchema);

module.exports = User;
