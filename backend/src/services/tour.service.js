const { Tour } = require("../models");
const APIFeatures = require("../utils/apiFeatures");
const upLoadImage = require("../middlewares/imgUpload");

const getAllTour = async (queryString) => {
  let res = [];
  var typePlace;
  if (queryString.typePlace) typePlace = queryString.typePlace;
  const features = new APIFeatures(Tour.find(), queryString);
  features.filter();
  features.sort();
  features.fieldLimit();
  features.paginate();
  features.discount();
  const tours = await features.query;
  if (typePlace !== undefined) {
    res = features.typePlace(typePlace, tours);
    return res;
  }
  return tours;
};

const getTour = async (id) => {
  const tour = await Tour.findById(id);
  return tour;
};

const deleteTour = async (id) => {
  const rs = await Tour.deleteOne({ _id: id });
  return rs.deletedCount;
};

const createTour = async (tour) => {
  const newTour = await Tour.create({
    tourName: tour.tourName,
    countryName: tour.countryName,
    continent: tour.continent,
    description: tour.description,
    imageAvatar: tour.imageAvatar,
    imageSlide: tour.imageSlide,
    price: tour.price,
    timeStart: tour.timeStart,
    timeEnd: tour.timeEnd,
    amount: tour.amount,
    hotelName: tour.hotelName,
    typePlace: tour.typePlace,
    discount: tour.discount,
    owner: tour.owner,
    schedule: tour.schedule,
  });
  return newTour;
};

const updateTour = async (id, tour) => {
  const updatedTour = await Tour.findByIdAndUpdate(id, tour, { new: true });
  return updatedTour;
};

module.exports = {
  getAllTour,
  getTour,
  deleteTour,
  createTour,
  updateTour,
};
