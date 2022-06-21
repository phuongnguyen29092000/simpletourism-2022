let Joi = require("joi-oid");

const feedbackSchema = Joi.object({
  tour: Joi.objectId(),
  customer: Joi.objectId(),
  rating: Joi.number().max(5),
  comment: Joi.string().min(5).max(1024).required(),
});
module.exports = feedbackSchema;