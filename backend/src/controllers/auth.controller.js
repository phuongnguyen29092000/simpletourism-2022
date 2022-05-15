const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync')
const passport = require("passport");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("532225885079-87pe29jp4nn410gt6ipmmk5nbo8j1g74.apps.googleusercontent.com");

const loginGoogle = passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ],
    accessType: 'offline',
    approvalPrompt: 'force'
})

const loginSuccess = catchAsync(async(req, res) => {
    // const ticket = await client.verifyIdToken({
    //     idToken: req.accessTokenAuth,
    //     audience: "532225885079-87pe29jp4nn410gt6ipmmk5nbo8j1g74.apps.googleusercontent.com"
    // });
    // const payload = ticket.getPayload();
    // console.log(payload);
    if (req.userProfile)
        res.status(httpStatus.OK).json({
            status: 200,
            message: "Đăng nhập thành công!",
            profile: {
                id: req.userProfile.id,
                displayName: req.userProfile.displayName,
                name: req.userProfile.name,
                email: req.userProfile.emails[0].value,
                photoUrl: req.userProfile.photos[0].value,
                accessToken: req.accessTokenAuth,
                refreshToken: req.refreshTokenAuth
            }
        })
    else res.status(httpStatus.UNAUTHORIZED).json({
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