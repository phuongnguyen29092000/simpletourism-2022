const { StatisticService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const showStatisticPerMonth = catchAsync(async (req, res, next) => {
  const result = await StatisticService.showStatisticPerMonth(
    req.params.ownerId,
    req.params.year,
    req.params.month
  );
  if (!result) {
    return next(
      new ApiError("Không thể xem thống kê của bạn, hãy thử lại sau!", 400)
    );
  } else {
    res.status(200).json({
      totalPayment: result.totalPayment,
      totalTicket: result.totalTicket,
      totalPeople: result.totalPeople,
      totalDomesticTour: result.totalDomesticTour,
      totalInternationalTour: result.totalInternationalTour,
    });
  }
});

const showStatisticPerYear = catchAsync(async (req, res, next) => {
  const result = await StatisticService.showStatisticPerYear(
    req.params.ownerId,
    req.params.year
  );
  console.log(req.params.ownerId);
  if (!result) {
    return next(
      new ApiError("Không thể xem thống kê của bạn, hãy thử lại sau!", 400)
    );
  } else {
    res.status(200).json({
      totalPayment: result.totalPayment,
      totalTicket: result.totalTicket,
    });
  }
});

const getStatisticMonthAdmin = catchAsync(async(req,res) =>{
  const statisticMonth = await StatisticService.getStatisticMonthAdmin(req.params.year, req.params.month)
  res.status(200).json({
    statisticMonth: statisticMonth,
    message: 'OK'
  })
})

const getStatisticYearAdmin = catchAsync(async(req,res) =>{
  const statisticYear = await StatisticService.getStatisticYearAdmin(req.params.year)
  res.status(200).json({
    statisticYear: statisticYear,
    message: 'OK'
  })
})

module.exports = {
  showStatisticPerMonth,
  showStatisticPerYear,
  getStatisticMonthAdmin,
  getStatisticYearAdmin
};
