const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync')
const passport = require("passport");

const { User } = require('../models')
const { userService, tokenService } = require('../services')

const loginGoogle = passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ],
    accessType: 'offline',
    approvalPrompt: 'force'
})

const loginSuccess = catchAsync(async(req, res) => {
    // console.log(await tokenService.generateAccessRefreshToken('sdfdsfdsfdsfd'))
    let user
    if (req.userProfile) {
        if (!await User.isEmailTaken(req.userProfile.emails[0].value)) {
            const userInfo = {
                googleId: req.userProfile.id,
                userName: req.userProfile.displayName,
                email: req.userProfile.emails[0].value,
                photoUrl: req.userProfile.photos[0].value,
            }
            user = await userService.createUser(userInfo)
        } else user = await userService.getUserByEmail(req.userProfile.emails[0].value)
        const tokenAuth = await tokenService.generateAccessRefreshToken(user._id.toString())
        res.status(httpStatus.OK).json({
            status: 200,
            message: "Đăng nhập thành công!",
            profile: user,
            tokenAuth: tokenAuth
        })
    } else res.status(httpStatus.UNAUTHORIZED).json({
        status: 401,
        message: "Không tìm thấy thông tin tài khoản"
    })
})

const loginFail = catchAsync(async(req, res) => {
    res.status(httpStatus.FORBIDDEN).json({
        status: 403,
        message: "Không có quyền truy cập"
    })
})

const logout = catchAsync(async(req, res) => {
    req.session = null
    req.logout()
    res.status(httpStatus.OK).json({
        status: 200,
        message: "Đăng xuất thành công",
    })
})

module.exports = {
    loginGoogle,
    loginSuccess,
    loginFail,
    logout
}