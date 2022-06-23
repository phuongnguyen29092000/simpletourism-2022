let Joi = require("joi-oid");

const ticketSchema = Joi.object({
  tour: Joi.objectId(),
  customer: Joi.objectId(),
  paymentPrice: Joi.number().max(100000000),
  phone: Joi.string().min(10).max(10).required(),
  numberPeople: Joi.number().max(5),
});
module.exports = ticketSchema;