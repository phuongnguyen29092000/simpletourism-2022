const { Ticket, Tour, User } = require("../models");
const { TourService } = require("./index");
const userService =  require('./user.service')

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
    { $match: { month: parseInt(month), year: parseInt(year), status: 1 } },
  ]);
  ticketInMonth.forEach((ticket) => {
    if (tourOfOwnerId.includes(String(ticket.tour)))
      ticketInMonthOfOwner.push(ticket);
  });
  for (let ticket of ticketInMonthOfOwner) {
    let countryName = (await Tour.findById(ticket.tour)).countryName;
    if (countryName === "Vietnam") totalDomesticTour++;
    else totalInternationalTour++;
    totalPayment += ticket.paymentPrice * ticket.numberPeople;
    totalPeople += ticket.numberPeople;
  }
  totalTicket = ticketInMonthOfOwner.length;
  return {
    totalPayment,
    totalPeople,
    totalTicket,
    totalInternationalTour,
    totalDomesticTour,
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
    { $match: { year: parseInt(year), status: 1 } },
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

const getStatisticMonthAdmin = async(year, month) => {
  let statisticTour = []

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
    { $unwind: '$customer' },
		{ $unwind: '$tour' },
    {
      $addFields: {
        "month": { $month: "$createdAt"},
        "year": { $year: "$createdAt"},
        "customerId": "$customer._id",
        "tourName": "$tour.tourName",
        "ownerId": "$tour.owner",
        "totalPrice": { "$multiply": ["$numberPeople", "$paymentPrice"] },
      }  
    },
    {
      $match: {
        status: 1, 
        month: Number(month),
        year: Number(year)
      },
    },
    {
			$group: {
				_id: "$ownerId",
				totalTickets: { $sum: "$numberPeople" },
				totalTours: { $push: "$tourName"},
				totalPrice: { $sum: "$totalPrice"}
			},
		},
  ])
  
  for (let i = 0; i < tour.length; i++) {
    statisticTour.push({
      ...tour[i],
      infoCompany: await userService.getUserById(tour[i]._id)
    })
  }

  const customers = await User.aggregate([
    {
      $addFields: {
        "month": { $month: "$createdAt"},
        "year": { $year: "$createdAt"},
      }  
    },
    {
      $match: { 
        role: 'customer',
        month: Number(month),
        year: Number(year)
      },
    },
  ])

  const owners = await User.aggregate([
    {
      $addFields: {
        "month": { $month: "$updatedAt"},
        "year": { $year: "$updatedAt"},
      }  
    },
    {
      $match: { 
        role: 'owner',
        month: Number(month),
        year: Number(year)
      },
    },
  ])

  return {
    tour: statisticTour, customers: customers.length, owners: owners.length
  }
}

const getStatisticYearAdmin = async(year) => {
  let statisticTour = []

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
    { $unwind: '$customer' },
		{ $unwind: '$tour' },
    {
      $addFields: {
        "month": { $month: "$createdAt"},
        "year": { $year: "$createdAt"},
        "customerId": "$customer._id",
        "tourName": "$tour.tourName",
        "ownerId": "$tour.owner",
        "totalPrice": { "$multiply": ["$numberPeople", "$paymentPrice"] },
      }  
    },
    {
      $match: {
        status: 1, 
        year: Number(year)
      },
    },
    {
			$group: {
				_id: "$ownerId",
				totalTickets: { $sum: "$numberPeople" },
				totalTours: { $push: "$tourName"},
				totalPrice: { $sum: "$totalPrice"}
			},
		},
  ])
  
  for (let i = 0; i < tour.length; i++) {
    statisticTour.push({
      ...tour[i],
      infoCompany: await userService.getUserById(tour[i]._id)
    })
  }

  const customers = await User.aggregate([
    {
      $addFields: {
        "year": { $year: "$createdAt"},
      }  
    },
    {
      $match: { 
        role: 'customer',
        year: Number(year)
      },
    },
  ])

  const owners = await User.aggregate([
    {
      $addFields: {
        "year": { $year: "$updatedAt"},
      }  
    },
    {
      $match: { 
        role: 'owner',
        year: Number(year)
      },
    },
  ])

  return {
    tour: statisticTour, customers: customers.length, owners: owners.length
  }
}

module.exports = {
  showStatisticPerMonth,
  showStatisticPerYear,
  getStatisticMonthAdmin,
  getStatisticYearAdmin
};
