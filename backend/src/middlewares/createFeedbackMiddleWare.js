const httpStatus = require('http-status')
const { FeedbackService} = require('../services') 

const createFeedbackMiddleWare = () => {
    return async(req, res, next) => {
        const { customer, tour } = req.body
        const isAuthoz = await FeedbackService.checkAuthozFeeback(customer, tour)
        req.body = req.body
        if(isAuthoz) return next()
        else res.status(httpStatus.UNAUTHORIZED).json({
            status: 401,
            message: "UNAUTHORIZED"
        })
    }
}

module.exports = createFeedbackMiddleWare