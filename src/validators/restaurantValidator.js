import Joi from "joi";

export const restaurantTypeValidationSchema = Joi.object({
  type: Joi.string()
    .trim()
    .messages({
      "string.base": "FIELD_MUST_BE_STRING",
      "string.empty": "FIELD_REQUIRED",
      "any.required": "FIELD_REQUIRED",
    }),
});

export const updateRestaurantTypeValidationSchema = Joi.object({
  type: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "FIELD_MUST_BE_STRING",
      "string.empty": "FIELD_REQUIRED",
      "any.required": "FIELD_REQUIRED",
    }),

  status: Joi.string()
    .valid("active", "inactive")
    .required()
    .messages({
      "any.only": "INVALID_STATUS_VALUE",
      "string.base": "FIELD_MUST_BE_STRING",
      "any.required": "FIELD_REQUIRED",
    }),
});

