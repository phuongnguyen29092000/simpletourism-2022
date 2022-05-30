const httpStatus = require('http-status');
const { News } = require('../models');
const ApiError = require('../utils/ApiError');

const createNews = async(newsBody) => {
    const news = await News.create(newsBody)
    return news
}

const getAllNews = async() => {
    return await News.find()
}

const getNewsPerCompany = async(idCompany) => {
    return await News.find({ owner: idCompany }).populate({path: 'owner'})
}
const getNewsById = async(id) => {
    return await News.findById(id)
}

const updateNewsById = async(id, newsBody) => {
    const news = await getNewsById(id)
    Object.assign(news, newsBody)
    await news.save()
    return news
}

const deleteNewsById = async(id) => {
    const news = await getNewsById(id)
    await news.remove()
    return news
}

module.exports = {
    createNews,
    getAllNews,
    getNewsPerCompany,
    getNewsById,
    updateNewsById,
    deleteNewsById,
}