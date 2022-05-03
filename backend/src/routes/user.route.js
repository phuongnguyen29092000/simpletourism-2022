const express = require('express');
const auth = require('../middlewares/auth')

const { userController } = require('../controllers')

const router = express.Router();

router.get('/', userController.getAllUser)

router.get('/companys', userController.getAllCompany)

router.get('/customers', userController.getAllCustomer)

router.post('/create', userController.createUser)

router.get('/:id', userController.getUserById)

router.put('/:id', userController.updateUserById)

router.delete('/:id', userController.deleteUserById)

module.exports = router;