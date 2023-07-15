const {Router} = require('express');
const {usersCtrl} = require('../controllers');
const {
    checkUserId,
    checkCreateUserData,
    checkUpdateUserData,
} = require('../middlewares/userMiddleware');
const { protect, allowFor } = require('../middlewares/authMiddleware');
const userRolesEnum = require('../constants/userRolesEnum');

const router = Router();

router.use(protect);

router.use(allowFor(userRolesEnum.ADMIN));

router.post('/', checkCreateUserData, usersCtrl.createUser);
router.get('/', usersCtrl.getUserList);
router.get('/:id', checkUserId, usersCtrl.getUserById);
router.patch('/:id', checkUserId, checkUpdateUserData, usersCtrl.updateUserById);
router.delete('/:id', checkUserId, usersCtrl.deleteUserById);

module.exports = router;