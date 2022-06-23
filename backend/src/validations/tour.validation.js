let Joi = require("joi-oid");

const tourSchema = Joi.object({
  tourName: Joi.string().min(5).max(100).required(),
  continent: Joi.string().min(3).max(20),
  countryName: Joi.string().min(3).max(100).required(),
  hotelName: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(20).max(1024).required(),
  schedule: Joi.string().min(20).max(1024).required(),
  imageAvatar: Joi.string().max(500),
  imageSlide: Joi.array().items(Joi.string()).max(3),
  price: Joi.number().greater(0).less(500000000).required(),
  amount: Joi.number().greater(0).less(51).required(),
  timeStart: Joi.date().required(),
  timeEnd: Joi.date().greater(Joi.ref("timeStart")).required(),
  discount: Joi.number().less(1),
  owner: Joi.objectId().required(),
  typePlace: Joi.objectId().required(),
});

module.exports = tourSchema;
