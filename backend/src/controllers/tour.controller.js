const catchAsync = require("../utils/catchAsync");
const { TourService } = require("../services");
const ApiError = require("../utils/ApiError");

const getAllTour = catchAsync(async (req, res, next) => {
  //console.log(req.query);
  const tours = await TourService.getAllTour(req.query);
  if (!tours || tours.length === 0) {
    return next(new ApiError("Tour Not Found!", 404));
  } else {
    res.status(200).json({
      status: 200,
      totalResult: tours.length,
      data: tours,
    });
  }
});

const getDomesticTour = catchAsync(async (req, res, next) => {
  const tours = await TourService.getDomesticTour();
  if (!tours || tours.length === 0) {
    return next(new ApiError("Tour Not Found!", 404));
  } else {
    res.status(200).json({
      stattus: 200,
      totalResult: tours.length,
      data: tours,
    });
  }
});

const getInternationalTour = catchAsync(async (req, res, next) => {
  const tours = await TourService.getInternationalTour();
  if (!tours || tours.length === 0) {
    return next(new ApiError("Tour Not Found!", 404));
  } else {
    res
      .status(200)
      .json({ status: 200, totalResult: tours.length, data: tours });
  }
});

const getTour = catchAsync(async (req, res, next) => {
  const { tour, similarTour, remainingAmount } = await TourService.getTour(
    req.params.id
  );
  if (!tour) {
    return next(new ApiError(`Tour Not Found With Id ${req.params.id} !`, 404));
  } else {
    let result = {};
    result = { ...tour };
    result._doc["remainingAmount"] = remainingAmount;
    console.log(result);
    res.status(200).json({
      status: 200,
      tour: result._doc,
      similarTour: similarTour,
    });
  }
});

const getOutStandingTours = catchAsync(async (req, res, next) => {
  const outstandingTour = await TourService.getOutstandingTour();
  if (!outstandingTour || outstandingTour.length === 0) {
    return next(new ApiError("Tour Not Found!", 404));
  } else {
    res.status(200).json({
      status: 200,
      totalResult: outstandingTour.length,
      data: outstandingTour,
    });
  }
});

const deleteTour = catchAsync(async (req, res, next) => {
  const deletedTour = await TourService.deleteTour(req.params.id);
  if (deletedTour !== 1) {
    return next(
      new ApiError(`Can Not Delete Tour With Id ${req.params.id}`, 400)
    );
  } else {
    res.status(204).send();
  }
});

const createTour = catchAsync(async (req, res, next) => {
  console.log(req.files);
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
      req.body,
      { imageAvatar: imageAvatarPath },
      { imageSlide: imageSlidesPath }
    )
  );
  if (!tour) {
    return next(new ApiError("Can Not Create New Tour, Try Again!", 400));
  } else {
    res.status(201).json({
      status: 201,
      data: tour,
    });
  }
});

const updateTour = catchAsync(async (req, res, next) => {
  const tour = await TourService.updateTour(req.params.id, req.body);
  if (!tour) {
    return next(
      new ApiError(
        `Can Not Update Tour With Id ${req.params.id}, Try Again!`,
        400
      )
    );
  } else {
    res.status(200).json({
      status: 200,
      data: tour,
    });
  }
});

const getTourByOwner = catchAsync(async (req, res, next) => {
  const tours = await TourService.getTourByOwner(req.params.ownerId);
  if (!tours || tours.length === 0) {
    return next(
      new ApiError(`Tour Not Found With Owner Id ${req.params.ownerId}!`, 404)
    );
  } else {
    res.status(200).json({
      status: 200,
      totalResult: tours.length,
      data: tours,
    });
  }
});

const searchByText = catchAsync(async (req, res, next) => {
  const tours = await TourService.searchByText(req.query.q);
  if (!tours || tours.length === 0) {
    return next(new ApiError("Tour Not Found!", 404));
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
  searchByText,
};
