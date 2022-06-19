const { min } = require("moment");
const { Tour, Ticket } = require("../models");
const APIFeatures = require("../utils/apiFeatures");

const getAllTour = async (queryString) => {
  let res = [];
  const queryObj = { ...queryString };
  var typePlace, minPrice, maxPrice;
  if (queryObj.price) {
    minPrice = queryObj.price.gte;
    maxPrice = queryObj.price.lte;
  }
  if (!minPrice) minPrice = 0;
  if (!maxPrice) maxPrice = 50000000;

  if (queryString.typeplace) typePlace = queryString.typeplace;
  const features = new APIFeatures(Tour.find(), queryString);
  features.filter();
  features.sort();
  features.fieldLimit();
  features.discount();
  features.paginate();
  const tours = await features.query;
  if (typePlace !== undefined) {
    res = features.typePlace(typePlace, tours).filter((item) => {
      return item.actualPrice <= maxPrice && item.actualPrice >= minPrice;
    });
    return res;
  }
  res = tours.filter((item) => {
    return item.actualPrice <= maxPrice && item.actualPrice >= minPrice;
  });
  return res;
};

const getDomesticTour = async () => {
  const tours = await Tour.find({ countryName: { $eq: "Việt Nam" } }).populate("typePlace owner")
  return tours;
};

const getInternationalTour = async () => {
  const tours = await Tour.find({ countryName: { $ne: "Việt Nam" } }).populate("typePlace owner")
  // .populate([{
  //   path: "typePlace"}, {path: "owner"}])
  return tours;
};

const getTour = async (id) => {
  const tour = await Tour.findById(id).populate("typePlace owner")
  if (tour) {
    let similarTour = (
      await Tour.find({ typePlace: { $eq: tour.typePlace } }).populate("typePlace owner")
    ).filter((ele) => {
      return ele._id != id;
    });
    if (similarTour.length > 3) {
      similarTour = similarTour.slice(0, 6);
    } else {
      let temp1SimilarTour = await Tour.find({
        countryName: { $eq: tour.countryName },
      }).populate("typePlace owner")

      let temp2SimilarTour = [...similarTour, ...temp1SimilarTour];
      similarTour = temp2SimilarTour
        .filter((ele) => {
          return ele._id != id;
        })
        .slice(0, 6);
    }
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
    .populate("typePlace owner")
    .sort({ ratingsAverage: -1 });
  const outstandingTour = allTours.splice(0, 6);
  return outstandingTour;
};

const caculateRemainingAmount = async (id) => {
  const tour = await Tour.findById(id);
  let remainingAmount = tour.amount;
  const ticket = await Ticket.find({ status: 1 }).populate({ path: "tour" });
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

const tourDetail = async(id) =>{
  return await Tour.findById(id.toString())
}

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
  }).populate.populate("typePlace owner")
  return updatedTour;
};

const getTourByOwner = async (idOwner) => {
  const tours = await Tour.find({
    owner: { $eq: idOwner },
  })
    .populate("typePlace owner")
    .select("-owner -__v");
  return tours;
};

const searchByText = async (text) => {
  text = text.trim();
  let tours = [];
  var textSlug = text.replace(" ", "-");
  text = text.replace("+", " ");
  const searchByName = await Tour.find({
    tourName: { $regex: text, $options: "i" },
  }).populate("typePlace owner")

  const searchByDescription = await Tour.find({
    description: { $regex: text, $options: "i" },
  }).populate("typePlace owner")

  const searchBySlug = await Tour.find({
    slug: { $regex: textSlug, $options: "i" },
  }).populate("typePlace owner")

  let arr = [...searchByName, ...searchByDescription, ...searchBySlug];
  let jsonObject = arr.map(JSON.stringify);
  let uniqueSet = new Set(jsonObject);
  tours = Array.from(uniqueSet).map(JSON.parse);
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
  tourDetail
};
