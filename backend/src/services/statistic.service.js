const { Ticket, Tour } = require("../models");
const { TourService } = require("./index");

const showStatisticPerMonth = async (ownerId, year, month) => {
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
  const ticketInMonth = await Ticket.aggregate([
    { $addFields: { month: { $month: "$createdAt" } } },
    { $addFields: { year: { $year: "$createdAt" } } },
    { $match: { month: parseInt(month), year: parseInt(year) } },
  ]);
  ticketInMonth.forEach((ticket) => {
    if (tourOfOwnerId.includes(String(ticket.tour)))
      ticketInMonthOfOwner.push(ticket);
  });
  for (let ticket of ticketInMonthOfOwner) {
    let countryName = (await Tour.findById(ticket.tour)).countryName;
    if (countryName === "Việt Nam") totalDomesticTour++;
    else totalInternationalTour++;
    totalPayment += ticket.paymentPrice * ticket.numberPeople;
    totalPeople += ticket.numberPeople;
  }
  totalTicket = ticketInMonthOfOwner.length;
  return {
    totalPayment,
    totalPeople,
    totalTicket,
    totalDomesticTour,
    totalInternationalTour,
  };
};

const showStatisticPerYear = async (ownerId, year) => {
  let ticketInYearOfOwner = [];
  let totalPayment = 0,
    totalTicket = 0;
  const tourOfOwnerId = (await TourService.getTourByOwner(ownerId)).map(
    (item) => {
      return String(item._id);
    }
  );
  const ticketInYear = await Ticket.aggregate([
    { $addFields: { year: { $year: "$createdAt" } } },
    { $match: { year: parseInt(year) } },
  ]);
  ticketInYear.forEach((ticket) => {
    if (tourOfOwnerId.includes(String(ticket.tour)))
      ticketInYearOfOwner.push(ticket);
  });
  for (let ticket of ticketInYearOfOwner) {
    totalPayment += ticket.paymentPrice * ticket.numberPeople;
  }
  totalTicket = ticketInYearOfOwner.length;
  return {
    totalPayment,
    totalTicket,
  };
};

module.exports = {
  showStatisticPerMonth,
  showStatisticPerYear,
};
