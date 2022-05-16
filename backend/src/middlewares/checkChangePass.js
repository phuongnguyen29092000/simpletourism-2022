const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const checkChangePass = catchAsync(async(req, res, next) => {
    const user = await userService.getUserByEmail(req.body.email)
    if (!user || !(await user.isPasswordMatch(req.body.oldpass))) {
        res.status(httpStatus.UNAUTHORIZED)
            .json({
                status: 401,
                message: "Mật khẩu cũ không đúng. Vui lòng thử lại!"
            })
    }
    next()
})

module.exports = checkChangePass