const httpStatus = require('http-status')
const { userService, tokenService } = require('../services')
const tokenTypes = require('../config/tokens')

const auth = (...roles) => {
    return async(req, res, next) => {
        const token = req.headers['Authorization'].split(' ')[1]
        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: 401,
                message: "Không tìm thấy token"
            })
        }

        try {
            const payload = await tokenService.verifyToken(token, tokenTypes.ACCESS)
            req.userId = payload.id
            const user = await userService.getUserById(req.userId)
            if (!user) return res.status(httpStatus.FORBIDDEN).json({
                status: 403,
                message: "Invalid Token"
            })

            if (!roles.includes(user.role)) return res.status(httpStatus.UNAUTHORIZED).json({
                status: 401,
                message: "Không có quyền truy cập"
            })
            req.role = user.role
            req.userName = user.userName
            req.email = user.email
            next();
        } catch {
            return res.status(httpStatus.FORBIDDEN).send("Forbidden")
        }

    }
}

module.exports = auth