const { StatisticService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const showStatisticPerYear = catchAsync(async (req, res, next) => {
  const result = await StatisticService.showStatisticPerYear(
    req.params.ownerId,
    req.params.year
  );
  if (!result || result.length == 0) {
    return next(
      new ApiError("Không thể xem thống kê của bạn, hãy thử lại sau!", 400)
    );
  } else {
    res.status(200).json({
      statistic: result,
    });
  }
});

const getStatisticMonthAdmin = catchAsync(async (req, res) => {
  const statisticMonth = await StatisticService.getStatisticMonthAdmin(
    req.params.year,
    req.params.month
  );
  res.status(200).json({
    statisticMonth: statisticMonth,
    message: "OK",
  });
});

const getStatisticYearAdmin = catchAsync(async (req, res) => {
  const statisticYear = await StatisticService.getStatisticYearAdmin(
    req.params.year
  );
  res.status(200).json({
    statisticYear: statisticYear,
    message: "OK",
  });
});

module.exports = {
  showStatisticPerYear,
  getStatisticMonthAdmin,
  getStatisticYearAdmin,
};
