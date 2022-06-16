const express = require('express');
const { newsController } = require('../controllers')
const upLoadImage = require('../middlewares/imgUpload')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', newsController.getAllNews)
router.get('/company/:id', auth('owner'),newsController.getNewsPerCompany)
router.get('/:id', newsController.getNewsById)
router.put('/viewer/:id', newsController.updateViewerNews)
router.post('/create', upLoadImage.single('imageUrl'), auth('owner'), newsController.createNews)
router.put('/:id', upLoadImage.single('imageUrl'), auth('owner'), newsController.updateNewsById)
router.delete('/:id', auth('owner'), newsController.deleteNewsById)

module.exports = router