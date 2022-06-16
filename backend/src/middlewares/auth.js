const httpStatus = require('http-status')
const { userService, tokenService } = require('../services')
const tokenTypes = require('../config/tokens')
const { Token } = require('../models')

const auth = (...roles) => {
    return async(req, res, next) => {
        console.log(req.headers['authorization']);
        const token = req.headers['authorization'].split(' ')[1]
        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: 401,
                message: "Token not found"
            })
        }
        const accessTokenInfo = await Token.findOne({ token: token, type: tokenTypes.ACCESS })
        if(!accessTokenInfo) return res.status(httpStatus.FORBIDDEN).json({
            status: 403,
            message: "FORBIDDEN"
        })
        try {
            const payload = await tokenService.verifyToken(token, tokenTypes.ACCESS)
            req.userId = payload.user.toString()
            const user = await userService.getUserById(req.userId)
            if (!user) return res.status(httpStatus.FORBIDDEN).json({
                status: 403,
                message: "Invalid Token"
            })

            if (!roles.includes(user.role)) return res.status(httpStatus.UNAUTHORIZED).json({
                status: 401,
                message: "Unauthoried"
            })
            req.role = user.role
            req.userName = user.userName
            req.email = user.email
            req.accessToken = token
            req.body = req.body
            next()
        } catch {
            return res.status(httpStatus.FORBIDDEN).json({
                status: 403,
                message: "FORBIDDEN"
            })
        }

    }
}

module.exports = auth