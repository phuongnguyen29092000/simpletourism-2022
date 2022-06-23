const { Ticket, Tour } = require("../models");
const { TourService } = require("./index");

const showStatisticPerYear = async (ownerId, year) => {
  let ticketInMonthOfOwner = [];
  let totalTicket = 0,
    totalPayment = 0,
    totalPeople = 0,
    totalDomesticTour = 0,
    totalInternationalTour = 0;
  const tourOfOwnerId = (await TourService.getTourByOwner(ownerId)).map(
    (item) => {
      return String(item._id);
    }
  );
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

module.exports = {
  showStatisticPerYear,
};
