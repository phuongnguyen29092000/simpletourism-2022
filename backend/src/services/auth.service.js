const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')

const tokenTypes = require('../config/tokens')
const tokenService = require('./token.service')
const userService = require('./user.service')
const Token = require('../models/token.model')

const logout = async(accessToken, refreshToken) => {
    const accessTokenInfo = await Token.findOne({ token: accessToken, type: tokenTypes.ACCESS })
    const refreshTokenInfo = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH })
    if (!refreshTokenInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Refresh token not found')
    }
    await accessTokenInfo.remove()
    await refreshTokenInfo.remove()
}

const refreshAuth = async(refreshToken) => {
    try {
        const refreshTokenInfo = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
        const user = await userService.getUserById(refreshTokenInfo.user)
        if (!user) {
            throw new Error();
        }
        await refreshTokenInfo.remove();
        return tokenService.generateAuthTokens(user);
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
    }
}

module.exports = {
    logout,
    refreshAuth
}