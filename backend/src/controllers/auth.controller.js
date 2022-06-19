const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync')
const passport = require("passport")

const { User } = require('../models')
const { userService, tokenService, authService } = require('../services')
const { OAuth2Client } = require('google-auth-library')

const loginGoogle = catchAsync(async(req, res)=>{
    let user, clientID
    const {id_token, email, givenName, familyName, photoUrl, type} = req.body
    
    if(type=='mobile') clientID = process.env.GOOGLE_CLIENT_ID_MOBILE
    else clientID = process.env.GOOGLE_CLIENT_ID_WEB

    const client = new OAuth2Client(clientID)
    if(id_token) {
        try {
            // const ticket = await client.verifyIdToken({
            //     idToken: id_token,
            //     audience: clientID
            // })
            //   const payload = ticket.getPayload()
            if (!await User.isEmailTaken(email)) {
                const userInfo = {
                    givenName: givenName,
                    familyName: familyName,
                    email: email,
                    photoUrl: photoUrl,
                }
                user = await userService.createUser(userInfo)
            } else user = await userService.getUserByEmail(email)
        } catch {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: 401,
                message: "Mã đăng nhập không chính xác. Vui lòng thử lại!"
            })  
        }
        const tokenAuth = await tokenService.generateAccessRefreshToken(user._id.toString())
        console.log(tokenAuth.access.token);
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

const logout = catchAsync(async(req, res) => {
    if(!req.body.refreshToken) return res.status(httpStatus.FORBIDDEN).json({
        status: 403,
        message: "FORBIDDEN"
    })
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
    else res.status(httpStatus.OK).json({
        status: 200,
        message: "OK",
        accessInfo: tokenAuth.access
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