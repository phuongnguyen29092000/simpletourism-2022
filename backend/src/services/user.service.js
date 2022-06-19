const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const nodeMailer = require("nodemailer");
const { Tour, User, Ticket } = require("../models");
const mongoose = require("mongoose");

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

const becomeOwner = async (req) => {
  const newOwner = await User.findOneAndUpdate(
    { _id: req.params.customerId },
    { role: "owner", companyName: req.body.companyName},
    { new: true }
  );
  return newOwner;
};

const getAllCustomerBookedTour = async (idOwner) => {
	const tourPerOwner = await Tour.find({owner: idOwner})
	let tourListId = tourPerOwner.map((tour)=> new mongoose.Types.ObjectId(tour._id))
  const users = await Ticket.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
   
		{ $unwind: '$customer' },
		{ $match: {
			tour: {
				"$in": tourListId
			}
		}},
		{
      $lookup: {
        from: "tours",
        localField: "tour",
        foreignField: "_id",
        as: "tour",
      },
    },
		{ $unwind: '$tour' },
		{
			"$addFields": {
					"idTour": "$tour._id",
					"customerId": "$customer._id",
					"customerName": "$customer.givenName",
					"customerFamilyName": "$customer.familyName",
					"tourName": "$tour.tourName",
					"email": '$customer.email',
          "photoUrl": "$customer.photoUrl",
					"totalPrice": { "$multiply": ["$numberPeople", "$paymentPrice"] }
			}
		},
		{
			$group: {
				_id: "$customerId",
				photoUrl: { $first: "$photoUrl" },
				givenName: { $first: "$customerName" },
				familyName: { $first: "$customerFamilyName" },
				email: { $first: "$email" },
				phone: { $addToSet: "$phone" },
				totalTickets: { $sum: "$numberPeople" },
				totalTours: { $push: "$tourName"},
				totalPrice: { $sum: "$totalPrice"}
			},
		},
		{
			$sort: {
				"totalPrice": -1
			}
		}

  ]); 	
	return users
};

const setActiveUser = async(id) =>{
  const user = await getUserById(id)
  const userUpdated = await User.findOneAndUpdate(
    { _id: id },
    { active: !user.active},
    { new: true }
  );
  return userUpdated;
}

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
	getAllCustomerBookedTour,
  setActiveUser
};
