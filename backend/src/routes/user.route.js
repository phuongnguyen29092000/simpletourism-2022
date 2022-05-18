const express = require('express');

const { userController } = require('../controllers')
const auth = require('../middlewares/auth')

const router = express.Router();

router.get('/', auth('admin'), userController.getUserByRole)

router.post('/create', auth('admin', 'owner', 'customer'), userController.createUser)

router.get('/:id', auth('admin', 'owner', 'customer'), userController.getUserById)

router.put('/:id', auth('admin'), userController.updateUserById)

router.delete('/:id', auth('admin'), userController.deleteUserById)

module.exports = router;