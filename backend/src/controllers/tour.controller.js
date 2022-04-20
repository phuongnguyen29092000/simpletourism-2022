const catchAsync = require("../utils/catchAsync");
const { TourService } = require("../services");

const getAllTour = catchAsync(async (req, res) => {
  const tours = await TourService.getAllTour();
  if (!tours) {
    res.status(404).send("Tours Not Found!");
  } else {
    res.status(200).json({
      totalResult: tours.length,
      data: tours,
    });
  }
});

const getTour = catchAsync(async (req, res) => {
  const tour = await TourService.getTour(req.params.id);
  if (!tour) {
    res.status(404).send("Tour not found with that id!");
  } else {
    res.status(200).json({
      data: tour,
    });
  }
});

const deleteTour = catchAsync(async (req, res) => {
  const deletedTour = await TourService.deleteTour(req.params.id);
  if (deletedTour !== 1) {
    res.status(400).send("Can not delete tour with that id!");
  } else {
    res.status(204).send();
  }
});

const createTour = catchAsync(async (req, res) => {
  const tour = await TourService.createTour(req.body);
  if (!tour) {
    res.status(400).send("Can not create new tour, please try later!");
  } else {
    res.status(200).json({
      data: tour,
    });
  }
});

const updateTour = catchAsync(async (req, res) => {
  const tour = await TourService.updateTour(req.params.id, req.body);
  if (!tour) {
    res.status(400).send("Can not update tour, please try later!");
  } else {
    res.status(200).json({
      data: tour,
    });
  }
});

module.exports = {
  getAllTour,
  getTour,
  deleteTour,
  createTour,
  updateTour,
};
