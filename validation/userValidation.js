const joi = require("joi");

const userSchema = joi.object({
  name: joi.string().required(),
  age: joi.number().required(),
});

function userValidation(req, res, next) {
  const { name, age } = req.body;
  const { error } = userSchema.validate({ name, age });
  if (error) {
    return res.status(422).json(error);
  }
  next();
}

module.exports = userValidation;
