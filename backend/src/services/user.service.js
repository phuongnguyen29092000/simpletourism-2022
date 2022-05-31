const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const nodeMailer = require("nodemailer");
const { User } = require("../models");

const adminEmail = process.env.EMAIL;
const adminPassword = process.env.EMAILPASS;
const mailHost = "smtp.gmail.com";
const mailPort = 587;

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
  }
  const user = await User.create(userBody);
  console.log(user);
  return user;
};

const getUserByRole = async (role, isAdmin = false) => {
  if (isAdmin)
    return User.find({
      role: { $ne: "admin" },
    });
  else return User.find({ role });
};

const getUserById = async (id) => {
  return User.findById(id);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

const transporter = nodeMailer.createTransport({
  host: mailHost,
  port: mailPort,
  secure: false,
  auth: {
    user: adminEmail,
    pass: adminPassword,
  },
});

const getAllOwner = async () => {
  const owners = await User.find({ role: { $eq: "owner" } });
  return owners;
};

const getAllCustomer = async () => {
  const owners = await User.find({ role: { $eq: "customer" } });
  return owners;
};

const becomeOwner = async (customerId) => {
  const newOwner = await User.findOneAndUpdate(
    { _id: customerId },
    { role: "owner" },
    { new: true }
  );
  return newOwner;
};

module.exports = {
  createUser,
  getUserByRole,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getAllOwner,
  getAllCustomer,
  becomeOwner,
};
