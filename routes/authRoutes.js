const { Router } = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const authCtrl = require('../controllers/authCtrl');

const router = Router();

router.post('/signup', authMiddleware.checkSignupUserData, authCtrl.authController.signup);
router.post('/login', authCtrl.authController.login);

module.exports = router;