const catchAsync = require("../utils/catchAsync");
const { TourService } = require("../services");
const { TourController } = require(".");

const getAllTour = catchAsync(async(req, res) => {
    const tours = await TourService.getAllTour(req.query);
    if (!tours || tours.length === 0) {
        res.status(404).json({
            status: 404,
            message: "Tour Not Found!",
        });
    } else {
        res.status(200).json({
            status: 200,
            totalResult: tours.length,
            data: tours,
        });
    }
});

const getDomesticTour = catchAsync(async(req, res) => {
    const tours = await TourService.getDomesticTour();
    if (!tours) {
        res.status(404).json({
            status: 404,
            message: "Domestic Tour Not Found!",
        });
    } else {
        res.status(200).json({
            stattus: 200,
            totalResult: tours.length,
            data: tours,
        });
    }
});

const getInternationalTour = catchAsync(async(req, res) => {
    const tours = await TourService.getInternationalTour();
    if (!tours) {
        res.stattus(404).json({
            status: 404,
            message: "International Tours Not Found!",
        });
    } else {
        res
            .status(200)
            .json({ status: 200, totalResult: tours.length, data: tours });
    }
});

const getTour = catchAsync(async(req, res) => {
    const tour = await TourService.getTour(req.params.id);
    if (!tour) {
        res.status(404).json({
            status: 404,
            message: "Tour not found with that id!",
        });
    } else {
        res.status(200).json({
            status: 200,
            data: tour,
        });
    }
});

const getOutStandingTours = catchAsync(async(req, res) => {
    const outstandingTour = await TourService.getOutstandingTour();
    if (!outstandingTour) {
        res.status(404).json({
            status: 404,
            message: "Tour Not Found!",
        });
    } else {
        res.status(200).json({
            status: 200,
            totalResult: outstandingTour.length,
            data: outstandingTour,
        });
    }
});

const deleteTour = catchAsync(async(req, res) => {
    const deletedTour = await TourService.deleteTour(req.params.id);
    if (deletedTour !== 1) {
        res.status(400).send("Can not delete tour with that id!");
    } else {
        res.status(204).send();
    }
});

const createTour = catchAsync(async(req, res) => {
    const imageAvatarPath = req.files.imageAvatar[0].path;
    const imageSlide1 = req.files.imageSlide1[0].path;
    const imageSlide2 = req.files.imageSlide2[0].path;
    const imageSlide3 = req.files.imageSlide3[0].path;
    const imageSlidesPath = [];
    imageSlidesPath.push(imageSlide1);
    imageSlidesPath.push(imageSlide2);
    imageSlidesPath.push(imageSlide3);
    const tour = await TourService.createTour(
        Object.assign(
            req.body, { imageAvatar: imageAvatarPath }, { imageSlide: imageSlidesPath }
        )
    );
    if (!tour) {
        res.status(400).json({
            status: 400,
            message: "Can not create new tour, please try later!",
        });
    } else {
        res.status(201).json({
            status: 201,
            data: tour,
        });
    }
});

const updateTour = catchAsync(async(req, res) => {
    const tour = await TourService.updateTour(req.params.id, req.body);
    if (!tour) {
        res.status(400).json({
            status: 400,
            message: "Can not update tour, please try later!",
        });
    } else {
        res.status(200).json({
            status: 200,
            data: tour,
        });
    }
});

const getTourByOwner = catchAsync(async(req, res) => {
    const tours = await TourService.getTourByOwner(req.params.ownerId);
    if (!tours) {
        res.status(404).json({
            status: 404,
            message: "Tours Not Found!",
        });
    } else {
        res.status(200).json({
            status: 200,
            totalResult: tours.length,
            data: tours,
        });
    }
});

module.exports = {
    getAllTour,
    getDomesticTour,
    getInternationalTour,
    getTour,
    deleteTour,
    createTour,
    updateTour,
    getTourByOwner,
    getOutStandingTours,
};