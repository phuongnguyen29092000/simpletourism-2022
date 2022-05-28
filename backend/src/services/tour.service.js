const { Tour, Ticket } = require("../models");
const APIFeatures = require("../utils/apiFeatures");

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
  if (!tours) console.log(tours);
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
  if (tour) {
    const similarTour = (
      await Tour.find({ typePlace: { $eq: tour.typePlace } }).populate({
        path: "typePlace",
      })
    )
      .filter((ele) => {
        return ele._id != id;
      })
      .slice(0, 6);
    const remainingAmount = await caculateRemainingAmount(id);
    return {
      tour,
      similarTour,
      remainingAmount,
    };
  }
  return { tour };
};

const getOutstandingTour = async () => {
  const allTours = await Tour.find()
    .populate({ path: "typePlace" })
    .sort({ ratingsAverage: -1 });
  const outstandingTour = allTours.splice(0, 6);
  return outstandingTour;
};

const caculateRemainingAmount = async (id) => {
  const tour = await Tour.findById(id);
  let remainingAmount = tour.amount;
  const ticket = await Ticket.find().populate({ path: "tour" });
  ticket.forEach((element) => {
    if (element.tour._id == id) {
      remainingAmount -= element.numberPeople;
    }
  });
  return remainingAmount;
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
  const updatedTour = await Tour.findOneAndUpdate({ _id: id }, tour, {
    new: true,
  }).populate({ path: "typePlace" });
  return updatedTour;
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

const searchByText = async (text) => {
  text = text.trim();
  var textSlug = text.replace(" ", "-");
  const searchByName = await Tour.find({
    tourName: { $regex: text, $options: "i" },
  });
  const searchByDescription = await Tour.find({
    description: { $regex: text, $options: "i" },
  });
  const searchBySlug = await Tour.find({
    slug: { $regex: textSlug, $options: "i" },
  });
  let arr = [...searchByName, ...searchByDescription, ...searchBySlug];
  let tours = [...new Set(arr)];
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
  caculateRemainingAmount,
  searchByText,
};
