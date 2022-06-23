const catchAsync = require("../utils/catchAsync");
const { TourService } = require("../services");
const ApiError = require("../utils/ApiError");
const { tourValidation } = require("../validations");

const getAllTour = catchAsync(async (req, res, next) => {
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
  if (
    !req.files.imageAvatar ||
    !req.files.imageSlide1 ||
    !req.files.imageSlide2 ||
    !req.files.imageSlide3
  ) {
    return next(new ApiError("Vui lòng chọn ảnh cho tour!", 400));
  }
  const imageAvatarPath = req.files.imageAvatar[0].path;
  const imageSlide1 = req.files.imageSlide1[0].path;
  const imageSlide2 = req.files.imageSlide2[0].path;
  const imageSlide3 = req.files.imageSlide3[0].path;
  const imageSlidesPath = [];
  imageSlidesPath.push(imageSlide1);
  imageSlidesPath.push(imageSlide2);
  imageSlidesPath.push(imageSlide3);
  const createBody = Object.assign(
    req.body,
    { imageAvatar: imageAvatarPath },
    { imageSlide: imageSlidesPath }
  );
  const validation = tourValidation.validate(createBody);
  if (validation.error) {
    return next(
      new ApiError(
        "Thông tin nhập vào không hợp lệ, vui lòng kiểm tra lại!",
        400
      )
    );
  }
  const tour = await TourService.createTour(createBody);
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
  const tourDetail = await TourService.tourDetail(req.params.id);
  let imageAvatarPath,
    imageSlide1,
    imageSlide2,
    imageSlide3,
    imageSlidesPath = [];
  if (req.files) {
    imageAvatarPath = req.files.imageAvatar
      ? req.files.imageAvatar[0].path
      : tourDetail.imageAvatar;
    imageSlide1 = req.files.imageSlide1
      ? req.files.imageSlide1[0].path
      : tourDetail.imageSlide[0];
    imageSlide2 = req.files.imageSlide2
      ? req.files.imageSlide2[0].path
      : tourDetail.imageSlide[1];
    imageSlide3 = req.files.imageSlide3
      ? req.files.imageSlide3[0].path
      : tourDetail.imageSlide[2];
    imageSlidesPath.push(imageSlide1);
    imageSlidesPath.push(imageSlide2);
    imageSlidesPath.push(imageSlide3);
  } else {
    imageAvatarPath = tourDetail.imageAvatar;
    imageSlide1 = tourDetail.imageSlide[0];
    imageSlide2 = tourDetail.imageSlide[1];
    imageSlide3 = tourDetail.imageSlide[2];
    imageSlidesPath.push(imageSlide1);
    imageSlidesPath.push(imageSlide2);
    imageSlidesPath.push(imageSlide3);
  }
  const updateBody = Object.assign(
    req.body,
    { imageAvatar: imageAvatarPath },
    { imageSlide: imageSlidesPath }
  );
  const validation = tourValidation.validate(updateBody);
  if (validation.error) {
    return next(
      new ApiError(
        "Thông tin nhập vào không hợp lệ, vui lòng kiểm tra lại!",
        400
      )
    );
  }
  const tour = await TourService.updateTour(req.params.id, updateBody);
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

const updateMany = catchAsync(async (req, res) => {
  const updateTours = await TourService.updateMany(req.body);
  if (updateTours.length == 0)
    res.status(400).json({
      message: "nhu c",
    });
  else res.status(200).json(updateTours);
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
