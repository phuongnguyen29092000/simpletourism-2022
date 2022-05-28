const express = require('express');
const { newsController } = require('../controllers')
const upLoadImage = require('../middlewares/imgUpload')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', newsController.getAllNews)
router.get('/company/:id', newsController.getNewsPerCompany)
router.get('/:id', newsController.getNewsById)
router.post('/create', upLoadImage.single('imageUrl'), newsController.createNews)
router.put('/:id', upLoadImage.single('imageUrl'), newsController.updateNewsById)
router.delete('/:id', newsController.deleteNewsById)

module.exports = router