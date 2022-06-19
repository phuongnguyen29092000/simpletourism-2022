const { StatisticService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const showStatisticPerMonth = catchAsync(async (req, res, next) => {
  const result = await StatisticService.showStatisticPerMonth(
    req.body.ownerId,
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
    req.body.ownerId,
    req.params.year
  );
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

module.exports = {
  showStatisticPerMonth,
  showStatisticPerYear,
};