const authMiddleware = require('./authMiddleware');
const userMiddleware = require('./userMiddleware');
const categoryMiddleware = require('./categoryMiddleware');
const taskMiddleware = require('./taskMiddleware');

module.exports = {
    authMiddleware,
    userMiddleware,
    categoryMiddleware,
    taskMiddleware,
};