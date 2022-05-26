const express = require('express');

const { typePlaceController } = require('../controllers')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', typePlaceController.getAllTypePlace)

router.get('/:id', typePlaceController.getTypePlaceById)

router.post('/create', typePlaceController.createTypePlace)

router.put('/:id',  typePlaceController.updateTypePlacesById)

router.delete('/:id', typePlaceController.deleteTypePlaceById)

module.exports = router