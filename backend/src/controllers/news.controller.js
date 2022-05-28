const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const {newsService} = require('../services')
const fs = require('fs')

/* create new news */
const createNews = catchAsync(async(req, res) => {
    const newsBody = Object.assign(req.body, { imageUrl: req.file.path })
    const news = await newsService.createNews(newsBody)
    if(news) res.status(httpStatus.CREATED).json({
        message: "OK",
        news: news
    }) 
    else res.status(httpStatus.NOT_FOUND).json({
        message: "Don't create new news"
    })
})

/* get all news */
const getAllNews = catchAsync(async(req, res) => {
    const news = await newsService.getAllNews()
    if (news.length==0) {
        res.status(httpStatus.NOT_FOUND).json({
            message: "Not Found"
        })
    } else res.status(httpStatus.OK).json({
        message: "OK",
        news: news
    })
})

const getNewsPerCompany = catchAsync(async(req, res) => {
    const news = await newsService.getNewsPerCompany(req.params.id)
    if (news.length==0) {
        res.status(httpStatus.NOT_FOUND).json({
            message: "Not Found"
        })
    } else res.status(httpStatus.OK).json({
        message: "OK",
        news: news
    })
})

/* get news detail by params id */
const getNewsById = catchAsync(async(req, res) => {
    const newsSingle = await newsService.getNewsById(req.params.id)

    if (!newsSingle) {
        res.status(httpStatus.NOT_FOUND).json({
            message: "Not Found",
        })
    } else res.status(httpStatus.OK).json({
        message: "OK",
        newsSingle: newsSingle
    })
})

/* update news detail by params id*/
const updateNewsById = catchAsync(async(req, res) => {
    const newsSingle = await newsService.updateNewsById(
        req.params.id,
        Object.assign(req.body,{ imageUrl: req.file.path })
    )
    if(!newsSingle) res.status(httpStatus.NOT_FOUND).json({
        message: "Update failed"
    }) 
    else res.status(httpStatus.OK).json({
        message: "OK",
        newsSingle: newsSingle
    })
})

/* delete news by params id */
const deleteNewsById = catchAsync(async(req, res) => {
    const newsData = await newsService.getNewsById(req.params.id)
    if (!newsData) {
        res.status(httpStatus.NOT_FOUND).json({
            message: "Not found news"
        })
    }
    await newsService.deleteNewsById(req.params.id)
    res.status(httpStatus.NO_CONTENT).json({
        message: "Delete suscessfully"
    })
})

module.exports = {
    createNews,
    getAllNews,
    getNewsPerCompany,
    getNewsById,
    updateNewsById,
    deleteNewsById
}