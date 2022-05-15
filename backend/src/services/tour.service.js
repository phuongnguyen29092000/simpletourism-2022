const { Tour } = require("../models");
const APIFeatures = require("../utils/apiFeatures");
const upLoadImage = require("../middlewares/imgUpload");

const getAllTour = async (queryString) => {
  let res = [];
  var typePlace;
  if (queryString.typeplace) typePlace = queryString.typeplace;
  const features = new APIFeatures(Tour.find(), queryString);
  features.filter();
  features.sort();
  features.fieldLimit();
  features.discount();
  features.paginate();
  const tours = await features.query;
  if (typePlace !== undefined) {
    res = features.typePlace(typePlace, tours);
    return res;
  }
  return tours;
};

const getDomesticTour = async () => {
  const tours = await Tour.find({ countryName: { $eq: "Việt Nam" } }).populate({
    path: "typePlace",
  });
  return tours;
};

const getInternationalTour = async () => {
  const tours = await Tour.find({ countryName: { $ne: "Việt Nam" } }).populate({
    path: "typePlace",
  });
  return tours;
};

const getTour = async (id) => {
  const tour = await Tour.findById(id).populate({ path: "typePlace" });
  return tour;
};

const getOutstandingTour = async () => {
  const allTours = await Tour.find()
    .populate({ path: "typePlace" })
    .sort({ ratingsAverage: -1 });
  const outstandingTour = allTours.splice(0, 6);
  return outstandingTour;
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
  // const updatedTour = await Tour.findByIdAndUpdate(id, tour, {
  //   new: true,
  // }).populate({ path: "typePlace" });
  // return updatedTour;
  const tours = await Tour.updateMany({ continent: { $eq: "Europe" } }, tour);
  return tours;
};

const getTourByOwner = async (idOwner) => {
  const tours = await Tour.find({
    owner: { $eq: idOwner },
  })
    .populate({
      path: "typePlace",
    })
    .select("-owner -__v");
  return tours;
};

module.exports = {
  getAllTour,
  getDomesticTour,
  getInternationalTour,
  getTour,
  deleteTour,
  createTour,
  updateTour,
  getTourByOwner,
  getOutstandingTour,
};
