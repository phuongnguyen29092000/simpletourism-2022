const { Ticket, Tour, User } = require("../models");
const { TourService } = require("./index");
const userService = require("./user.service");
const mongoose = require("mongoose");

const showStatisticPerYear = async (ownerId, year) => {
  let ticketInMonthOfOwner = [];
  let totalTicket = 0,
    totalPayment = 0,
    totalPeople = 0,
    totalDomesticTour = 0,
    totalInternationalTour = 0;
  const tourOfOwnerId = (await TourService.getTourByOwner(ownerId)).map(
    (item) => {
      return new mongoose.Types.ObjectId(item._id);
    }
  );
  console.log(tourOfOwnerId);
  const ticketInYear = await Ticket.aggregate([
    { $addFields: { month: { $month: "$createdAt" } } },
    { $addFields: { year: { $year: "$createdAt" } } },
    {
      $addFields: {
        paymentPricePerTicket: {
          $multiply: ["$numberPeople", "$paymentPrice"],
        },
      },
    },
    {
      $match: {
        year: parseInt(year),
        status: 1,
        visit: true,
        tour: {
          "$in": tourOfOwnerId
        }
      },
    },
    {
      $group: {
        _id: { month: "$month" },
        numberTicket: { $sum: 1 },
        numberPeople: { $sum: "$numberPeople" },
        paymentPrice: { $sum: "$paymentPricePerTicket" },
      },
    },
    { $sort: { month: 1 } },
  ]);
  let month = [];
  let result = ticketInYear.map((item) => {
    month.push(item._id.month);
    return {
      month: item._id.month,
      numberTicket: item.numberTicket,
      numberPeople: item.numberPeople,
      totalPayment: item.paymentPrice,
    };
  });
  for (let i = 1; i <= 12; i++) {
    if (!month.includes(i)) {
      result.push({
        month: i,
        numberPeople: 0,
        numberTicket: 0,
        totalPayment: 0,
      });
    }
  }
  return result.sort(function (a, b) {
    return a.month - b.month;
  });
};

const getStatisticMonthAdmin = async (year, month) => {
  let statisticTour = [];

  const tour = await Ticket.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $lookup: {
        from: "tours",
        localField: "tour",
        foreignField: "_id",
        as: "tour",
      },
    },
    { $unwind: "$customer" },
    { $unwind: "$tour" },
    {
      $addFields: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
        customerId: "$customer._id",
        tourName: "$tour.tourName",
        ownerId: "$tour.owner",
        totalPrice: { $multiply: ["$numberPeople", "$paymentPrice"] },
      },
    },
    {
      $match: {
        status: 1,
        month: Number(month),
        year: Number(year),
      },
    },
    {
      $group: {
        _id: "$ownerId",
        totalTickets: { $sum: "$numberPeople" },
        totalTours: { $push: "$tourName" },
        totalPrice: { $sum: "$totalPrice" },
      },
    },
  ]);

  for (let i = 0; i < tour.length; i++) {
    statisticTour.push({
      ...tour[i],
      infoCompany: await userService.getUserById(tour[i]._id),
    });
  }

  const customers = await User.aggregate([
    {
      $addFields: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
      },
    },
    {
      $match: {
        role: "customer",
        month: Number(month),
        year: Number(year),
      },
    },
  ]);

  const owners = await User.aggregate([
    {
      $addFields: {
        month: { $month: "$updatedAt" },
        year: { $year: "$updatedAt" },
      },
    },
    {
      $match: {
        role: "owner",
        month: Number(month),
        year: Number(year),
      },
    },
  ]);

  return {
    tour: statisticTour,
    customers: customers.length,
    owners: owners.length,
  };
};

const getStatisticYearAdmin = async (year) => {
  let statisticTour = [];

  const tour = await Ticket.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $lookup: {
        from: "tours",
        localField: "tour",
        foreignField: "_id",
        as: "tour",
      },
    },
    { $unwind: "$customer" },
    { $unwind: "$tour" },
    {
      $addFields: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
        customerId: "$customer._id",
        tourName: "$tour.tourName",
        ownerId: "$tour.owner",
        totalPrice: { $multiply: ["$numberPeople", "$paymentPrice"] },
      },
    },
    {
      $match: {
        status: 1,
        year: Number(year),
      },
    },
    {
      $group: {
        _id: "$ownerId",
        totalTickets: { $sum: "$numberPeople" },
        totalTours: { $push: "$tourName" },
        totalPrice: { $sum: "$totalPrice" },
      },
    },
  ]);

  for (let i = 0; i < tour.length; i++) {
    statisticTour.push({
      ...tour[i],
      infoCompany: await userService.getUserById(tour[i]._id),
    });
  }

  const customers = await User.aggregate([
    {
      $addFields: {
        year: { $year: "$createdAt" },
      },
    },
    {
      $match: {
        role: "customer",
        year: Number(year),
      },
    },
  ]);

  const owners = await User.aggregate([
    {
      $addFields: {
        year: { $year: "$updatedAt" },
      },
    },
    {
      $match: {
        role: "owner",
        year: Number(year),
      },
    },
  ]);

  return {
    tour: statisticTour,
    customers: customers.length,
    owners: owners.length,
  };
};

module.exports = {
  showStatisticPerYear,
  getStatisticMonthAdmin,
  getStatisticYearAdmin,
};
