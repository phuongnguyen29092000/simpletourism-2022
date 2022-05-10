const catchAsync = require('../utils/catchAsync')
const httpStatus = require('http-status')
const validator = require('validator')
const { userService } = require('../services')

/* create new user */
const createUser = catchAsync(async(req, res) => {
    const user = await userService.createUser(req.body)

    res.status(httpStatus.CREATED).json({
        status: 201,
        message: "Tạo người dùng thành công"
    })
})

/* get all user */
const getAllUser = catchAsync(async(req, res) => {
    const users = await userService.getAllUser()

    if (!users) res.status(httpStatus.NOT_FOUND).json({
        status: 404,
        message: "Không tìm thấy người dùng",
    })
    else res.status(200).json({
        status: 200,
        message: "OK",
        users: users
    })
})

const getAllCompany = catchAsync(async(req, res) => {
    const companys = await userService.getAllCompany()

    if (!companys) res.status(httpStatus.NOT_FOUND).json({
        status: 404,
        message: "Không tìm thấy công ty",
    })
    else res.status(200).json({
        status: 200,
        message: "OK",
        companys: companys
    })
})

const getAllCustomer = catchAsync(async(req, res) => {
    const customers = await userService.getAllCustomer()

    if (!customers) res.status(httpStatus.NOT_FOUND).json({
        status: 404,
        message: "Không tìm thấy khách hàng",
    })
    else res.status(200).json({
        status: 200,
        message: "OK",
        customers: customers
    })
})

/* get user detail by id */
const getUserById = catchAsync(async(req, res) => {
    const user = await userService.getUserById(req.params.id)

    if (!user) res.status(httpStatus.NOT_FOUND).json({
        status: 404,
        message: "Không tìm thấy khách hàng",
    })
    else res.status(200).json({
        status: 200,
        message: "OK",
        user: user
    })
})

/* update user detail by id */
const updateUserById = catchAsync(async(req, res) => {
    const user = await userService.updateUserById(req.params.id, req.body)

    res.status(httpStatus.OK).json({
        status: 200,
        message: "Cập nhật người dùng thành công!",
        user: user
    })
})

/* delete user detail by id */
const deleteUserById = catchAsync(async(req, res) => {
    await userService.deleteUserById(req.params.id)
    res.status(httpStatus.NO_CONTENT).json({
        status: 204,
        message: "Xóa người dùng thành công!"
    })
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