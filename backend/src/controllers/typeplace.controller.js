const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { typePlaceService } = require('../services')

/* create new type place */
const createTypePlace = catchAsync(async(req, res) => {
        const typePlace = await typePlaceService.createTypePlace(req.body)
        res.status(httpStatus.CREATED).json({
            status: 201,
            message: "Tạo loại địa hình thành công!",
            typePlace: typePlace
        })
    })
    /* get all type place */
const getAllTypePlace = catchAsync(async(req, res) => {
    const typePlaces = await typePlaceService.getAllTypePlace()
    if (!typePlaces) {
        res.status(httpStatus.NOT_FOUND).json({
            status: 404,
            message: "Không tìm thấy loại địa hình"
        })
    } else res.status(httpStatus.OK).json({
        status: 200,
        message: "OK",
        typePlaces: typePlaces
    })
})


/* get typePlace detail by params id */
const getTypePlaceById = catchAsync(async(req, res) => {
    const typePlace = await typePlaceService.getTypePlaceById(req.params.id)

    if (!typePlace) {
        res.status(httpStatus.NOT_FOUND).json({
            status: 404,
            message: "Không tìm thấy loại địa hình"
        })
    } else res.status(httpStatus.OK).json({
        status: 200,
        message: "OK",
        typePlace: typePlace
    })
})

/* update type place detail by params id*/
const updateTypePlacesById = catchAsync(async(req, res) => {
    const typePlace = await typePlaceService.updateTypePlaceById(
        req.params.id,
        req.body
    )
    res.status(httpStatus.OK).json({
        status: 200,
        message: "OK",
        typePlace: typePlace
    })
})

/* delete type place by params id */
const deleteTypePlaceById = catchAsync(async(req, res) => {
    await typePlaceService.deleteTypePlaceById(req.params.id)
    res.status(httpStatus.NO_CONTENT).json({
        status: 204,
        message: "Xóa loại địa hình thành công!"
    })
})
module.exports = {
    createTypePlace,
    getAllTypePlace,
    getTypePlaceById,
    updateTypePlacesById,
    deleteTypePlaceById
}