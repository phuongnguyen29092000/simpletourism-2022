let Joi = require("joi-oid");

const newsSchema = Joi.object({
  owner: Joi.objectId(),
  title: Joi.string().min(0).max(100).required(),
  description: Joi.string().min(20).max(4096).required(),
  imageUrl: Joi.string().max(500)
});
module.exports = newsSchema;