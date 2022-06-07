const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const validator = require("validator");
const { userService } = require("../services");
const ApiError = require("../utils/ApiError");

/* create new user */
const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  res.status(httpStatus.CREATED).json({
    status: 201,
    message: "Tạo người dùng thành công",
  });
});

const getUserByRole = catchAsync(async (req, res) => {
  let users;
  if (req.body.role == "admin")
    users = await userService.getUserByRole(req.body.role, true);
  else users = await userService.getUserByRole(req.body.role);

  if (!users)
    res.status(httpStatus.NOT_FOUND).json({
      status: 404,
      message: "Không tìm thấy công ty",
    });
  else
    res.status(200).json({
      status: 200,
      message: "OK",
      users: users,
    });
});

/* get user detail by id */
const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user)
    res.status(httpStatus.NOT_FOUND).json({
      status: 404,
      message: "Không tìm thấy khách hàng",
    });
  else
    res.status(200).json({
      status: 200,
      message: "OK",
      user: user,
    });
});

/* update user detail by id */
const updateUserById = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);

  res.status(httpStatus.OK).json({
    status: 200,
    message: "Cập nhật người dùng thành công!",
    user: user,
  });
});

/* delete user detail by id */
const deleteUserById = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.id);
  res.status(httpStatus.NO_CONTENT).json({
    status: 204,
    message: "Xóa người dùng thành công!",
  });
});

// get list owner
const getAllOwner = catchAsync(async (req, res, next) => {
  const owners = await userService.getAllOwner();
  if (!owners || owners.length == 0) {
    return next(new ApiError("Không tìm thấy Owner!", 404));
  } else {
    res.status(200).json({
      totalResults: owners.length,
      data: owners,
    });
  }
});

const getAllCustomer = catchAsync(async (req, res, next) => {
  const customers = await userService.getAllCustomer();
  if (!customers || customers.length == 0) {
    return next(new ApiError("Không tìm thấy Customer!", 404));
  } else {
    res.status(200).json({
      totalResults: customers.length,
      data: customers,
    });
  }
});

const becomeOwner = catchAsync(async (req, res, next) => {
  const newOwner = await userService.becomeOwner(req.params.customerId);
  if (!newOwner) {
    return next(
      new ApiError(
        "Không tìm thấy Id của khách hàng hoặc không thể cấp quyền Owner cho khách hàng. Vui lòng thử lại sau.",
        400
      )
    );
  } else {
    res.status(200).json({
      message: "Cấp quyền Owner thành công!",
      data: newOwner,
    });
  }
});

const getAllCustomerBookedTour = catchAsync(async(req, res)=> {
  const allCustomerBookedTour = await userService.getAllCustomerBookedTour(req.params.id)
  if(allCustomerBookedTour.length == 0 ) res.status(httpStatus.NOT_FOUND).json({
    message: "Not Found list customer"
  })
  res.status(200).json({
    message: 'OK',
    allCustomerBookedTour: allCustomerBookedTour
  })
})

module.exports = {
  createUser,
  getUserByRole,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllOwner,
  getAllCustomer,
  becomeOwner,
  getAllCustomerBookedTour
};
