const httpStatus = require('http-status');
const { TypePlace, Tour } = require('../models');
const ApiError = require('../utils/ApiError');

const createTypePlace = async(typePlaceBody) => {
    const typePlace = await TypePlace.create(typePlaceBody)
    return typePlace
}

const getAllTypePlace = async() => {
    return await TypePlace.find()
}

const getTypePlaceById = async(id) => {
    return await TypePlace.findById(id)
}

const updateTypePlaceById = async(id, typeBody) => {
    const typePlace = await getTypePlaceById(id)
    Object.assign(typePlace, typeBody);
    await typePlace.save();
    return typePlace;
}

const deleteTypePlaceById = async(id) => {
    const typePlace = await getTypePlaceById(id)
    await typePlace.remove()
    return typePlace
}

const checkExistTypePlaceInTour = async(id) =>{
    const tours = await Tour.find({typePlace: id})
    return tours.length
}

module.exports = {
    createTypePlace,
    getAllTypePlace,
    getTypePlaceById,
    updateTypePlaceById,
    deleteTypePlaceById,
    checkExistTypePlaceInTour
}