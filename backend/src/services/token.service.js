const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const userService = require('./user.service')
const { Token } = require('../models')
const tokenTypes = require('../config/tokens')

const generateToken = (userId, expires, type, secret = process.env.JWT_SECRET) => {
    const payload = {
        id: userId,
        exp: expires.unix(),
        type,
    }
    return jwt.sign(payload, secret)
};

const saveToken = async(token, userId, expires, type) => {
    const tokenInfo = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
    })
    return tokenInfo
};

const verifyToken = async(token, type) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const tokenInfo = await Token.findOne({ token, type, user: payload.id })
    if (!tokenInfo) {
        throw new Error('Không tìm thấy token')
    }
    return tokenInfo
}

const generateAccessRefreshToken = async(id) => {
    const accessTokenExpires = moment().add(parseInt(process.env.JWT_ACCESS_EXPIRATION_MINUTES), 'minutes')
    const accessToken = generateToken(id, accessTokenExpires, tokenTypes.ACCESS, process.env.JWT_SECRET)

    const refreshTokenExpires = moment().add(parseInt(process.env.JWT_REFRESH_EXPIRATION_DAYS), 'days')
    const refreshToken = generateToken(id, refreshTokenExpires, tokenTypes.REFRESH, process.env.JWT_SECRET)

    await saveToken(accessToken, id, accessTokenExpires, tokenTypes.ACCESS)
    await saveToken(refreshToken, id, refreshTokenExpires, tokenTypes.REFRESH)
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate()
        }
    }
}

module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAccessRefreshToken,
}