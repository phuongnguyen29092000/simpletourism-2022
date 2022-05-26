const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync')
const passport = require("passport")

const { User } = require('../models')
const { userService, tokenService, authService } = require('../services')
const { OAuth2Client } = require('google-auth-library')

// const loginGoogle = passport.authenticate('google', {
//     scope: ['https://www.googleapis.com/auth/userinfo.profile',
//         'https://www.googleapis.com/auth/userinfo.email'
//     ],
//     accessType: 'offline',
//     approvalPrompt: 'force'
// })
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const loginGoogle = catchAsync(async(req, res)=>{
    let user
    const {id_token} = req.body
    if(id_token) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_ID
              })
              const payload = ticket.getPayload()
            if (!await User.isEmailTaken(payload.email)) {
                const userInfo = {
                    givenName: payload.given_name,
                    familyName: payload.family_name,
                    email: payload.email,
                    photoUrl: payload.picture,
                }
                user = await userService.createUser(userInfo)
            } else user = await userService.getUserByEmail(payload.email)
        } catch {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: 401,
                message: "Mã đăng nhập không chính xác. Vui lòng thử lại!"
            })  
        }
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

// const loginSuccess = catchAsync(async(req, res) => {
//     let user
//     if (req.userProfile) {
//         if (!await User.isEmailTaken(req.userProfile.emails[0].value)) {
//             const userInfo = {
//                 googleId: req.userProfile.id,
//                 userName: req.userProfile.displayName,
//                 email: req.userProfile.emails[0].value,
//                 photoUrl: req.userProfile.photos[0].value,
//             }
//             user = await userService.createUser(userInfo)
//         } else user = await userService.getUserByEmail(req.userProfile.emails[0].value)

//         const tokenAuth = await tokenService.generateAccessRefreshToken(user._id.toString())
//         res.status(httpStatus.OK).json({
//             status: 200,
//             message: "Đăng nhập thành công!",
//             profile: user,
//             tokenAuth: tokenAuth
//         })
//     } else res.status(httpStatus.UNAUTHORIZED).json({
//         status: 401,
//         message: "Không tìm thấy thông tin tài khoản"
//     })
// })

const logout = catchAsync(async(req, res) => {
    await authService.logout(req.accessToken, req.body.refreshToken)
    res.status(httpStatus.OK).json({
        status: 200,
        message: "Đăng xuất thành công"
    })
})

const refreshTokens = catchAsync(async(req, res) => {
    const tokenAuth = await authService.refreshAuth(req.body.refreshToken)
    if (!tokenAuth) res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: 500,
        message: "Lỗi server"
    })
    else res.stauts(httpStatus.OK).json({
        status: 200,
        message: "OK",
        tokenAuth: {...tokenAuth }
    })
})

const getRole = catchAsync(async(req, res) => {
    if (!req.role) res.status(httpStatus.FORBIDDEN).json({
        status: 403,
        message: "Không có quyền truy cập"
    })
    res.status(200).json({
        status: 200,
        message: "OK",
        userInfo: {
            userId: req.userId,
            role: req.role,
            userName: req.userName,
            email: req.email
        }
    })

})
module.exports = {
    loginGoogle,
    logout,
    refreshTokens,
    getRole
}