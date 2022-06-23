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

module.exports = {
  showStatisticPerYear,
};
