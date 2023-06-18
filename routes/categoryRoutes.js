const { Router } = require('express');
const { protect } = require('../middlewares/authMiddleware');
const categoriesCtrl = require('../controllers/categoriesCtrl');
const {
    checkCategoryId, 
    checkCategoryData,
} = require('../middlewares/categoryMiddleware');

const router = Router();

router.use(protect);

router.post('/', checkCategoryData, categoriesCtrl.createCategory);
router.get('/', categoriesCtrl.getCategoriesList);
router.get('/:userId', checkCategoryId, categoriesCtrl.getCategoryById);
router.patch('/:userId', checkCategoryId, checkCategoryData, categoriesCtrl.editCategory);
router.delete('/:userId', checkCategoryId, categoriesCtrl.deleteCategory);

module.exports = router; 