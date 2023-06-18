const { Router } = require('express');
const { protect } = require('../middlewares/authMiddleware');
const tasksCtrl = require('../controllers/tasksCtrl');
const {
    checkTaskId, 
    checkTaskData,
} = require('../middlewares/taskMiddleware');

const router = Router();

router.use(protect);

router.post('/', checkTaskData, tasksCtrl.createTask);
router.get('/', tasksCtrl.getTasksList);
router.get('/:taskId', checkTaskId, tasksCtrl.getTaskById);
router.patch('/:taskId', checkTaskId, checkTaskData, tasksCtrl.editTask);
router.delete('/:taskId', checkTaskId, tasksCtrl.deleteTask);

module.exports = router; 