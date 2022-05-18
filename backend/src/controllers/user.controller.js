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

const getUserByRole = catchAsync(async(req, res) => {
    let users
    if (req.body.role == 'admin') users = await userService.getUserByRole(req.body.role, true)
    else users = await userService.getUserByRole(req.body.role)

    if (!users) res.status(httpStatus.NOT_FOUND).json({
        status: 404,
        message: "Không tìm thấy công ty",
    })
    else res.status(200).json({
        status: 200,
        message: "OK",
        users: users
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
    getUserByRole,
    getUserById,
    updateUserById,
    deleteUserById,
}