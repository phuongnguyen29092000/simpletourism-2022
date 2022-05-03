const catchAsync = require('../utils/catchAsync')
const httpStatus = require('http-status')
const validator = require('validator')
const { userService } = require('../services')

/* create new user */
const createUser = catchAsync(async(req, res) => {
    const user = await userService.createUser(req.body)

    res.status(httpStatus.CREATED).send(user)
})

/* get all user */
const getAllUser = catchAsync(async(req, res) => {
    const users = await userService.getAllUser()

    if (!users) res.status(httpStatus.NOT_FOUND).send("User not found")
    else res.status(200).send(users)
})

const getAllCompany = catchAsync(async(req, res) => {
    const companys = await userService.getAllCompany()

    if (!companys) res.status(httpStatus.NOT_FOUND).send("User not found")
    else res.status(200).send(companys)
})

const getAllCustomer = catchAsync(async(req, res) => {
    const customers = await userService.getAllCustomer()

    if (!customers) res.status(httpStatus.NOT_FOUND).send("User not found")
    else res.status(200).send(customers)
})

/* get user detail by id */
const getUserById = catchAsync(async(req, res) => {
    const user = await userService.getUserById(req.params.id)

    if (!user) res.status(httpStatus.NOT_FOUND).send("User not found")
    else res.status(200).send(user)
})


/* update user detail by id */
const updateUserById = catchAsync(async(req, res) => {
    const user = await userService.updateUserById(req.params.id, req.body)

    res.status(200).send(user)
})

/* delete user detail by id */
const deleteUserById = catchAsync(async(req, res) => {
    await userService.deleteUserById(req.params.id)
    res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
    createUser,
    getAllUser,
    getAllCompany,
    getAllCustomer,
    getUserById,
    updateUserById,
    deleteUserById,
}