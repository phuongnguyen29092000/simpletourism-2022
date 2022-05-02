const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const nodeMailer = require('nodemailer');

const adminEmail = process.env.EMAIL;
const adminPassword = process.env.EMAILPASS;
const mailHost = 'smtp.gmail.com';
const mailPort = 587;

const createUser = async(userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists')
    }
    const user = await User.create(userBody)
    return user
}
const getAllUser = async() => {
    return User.find({
        role: { $ne: 'admin' }
    })
}

const getAllCompany = async() => {
    return User.find({ role: 'owner' });
}

const getAllCustomer = async() => {
    return User.find({ role: 'customer' });
}

const getUserById = async(id) => {
    return User.findById(id)
}

const getUserByEmail = async(email) => {
    return User.findOne({ email });
};

const updateUserById = async(userId, updateBody) => {
    const user = await getUserById(userId)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists')
    }
    Object.assign(user, updateBody)
    await user.save()
    return user
}

const deleteUserById = async(userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    await user.remove()
    return user
}

const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
        user: adminEmail,
        pass: adminPassword
    }
});

module.exports = {
    createUser,
    getAllUser,
    getAllCompany,
    getAllCustomer,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
};