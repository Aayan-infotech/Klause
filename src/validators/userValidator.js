import Joi from "joi";

const userValidationSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .pattern(/^[^\W_][\w.-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.base": "FIELD_MUST_BE_STRING",
      "string.empty": "FIELD_REQUIRED",
      "string.email": "EMAIL_MUST_BE_VALID",
      "string.pattern.base":
        "EMAIL_FORMAT_IS_INVALID_IT_SHOULD_NOT_START_WITH_SPECIAL_CHARACTERS",
      "any.required": "FIELD_REQUIRED",
    }),
});

const createCredentialsValidationSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "FIELD_MUST_BE_STRING",
    "string.empty": "FIELD_REQUIRED",
    "string.min": "FIELD_MIN_LENGTH",
    "string.max": "FIELD_MAX_LENGTH",
    "any.required": "FIELD_REQUIRED",
  }),
  password: Joi.string()
    .min(8)
    .max(15)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,15}$"
      )
    )
    .required()
    .messages({
      "string.base": "PASSWORD_MUST_BE_STRING",
      "string.empty": "PASSWORD_IS_REQUIRED",
      "string.min":
        "PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS_LONG_AND_INCLUDE_AT_LEAST_ONE_LOWERCASE_LETTER_ONE_UPPERCASE_LETTER_ONE_NUMBER_AND_ONE_SPECIAL_CHARACTER",
      "string.max":
        "PASSWORD_CANNOT_EXCEED_15_CHARACTERS_LONG_AND_INCLUDE_AT_LEAST_ONE_LOWERCASE_LETTER_ONE_UPPERCASE_LETTER_ONE_NUMBER_AND_ONE_SPECIAL_CHARACTER",
      "string.pattern.base":
        "PASSWORD_MUST_INCLUDE_AT_LEAST_ONE_LOWERCASE_LETTER_ONE_UPPERCASE_LETTER_ONE_NUMBER_AND_ONE_SPECIAL_CHARACTER",
      "any.required": "PASSWORD_IS_REQUIRED",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.base": "CONFIRM_PASSWORD_MUST_BE_STRING",
    "string.empty": "CONFIRM_PASSWORD_IS_REQUIRED",
    "any.only": "PASSWORD_AND_CONFIRM_PASSWORD_MUST_MATCH",
    "any.required": "CONFIRM_PASSWORD_IS_REQUIRED",
  }),
});

const ownerDetailsSchema = Joi.object({
  companyName: Joi.string().min(1).max(150).required().messages({
    "string.base": "FIELD_MUST_BE_STRING",
    "string.empty": "Company Name is required.",
    "string.min": "Company Name must be at least 1 characters.",
    "string.max": "Company Name cannot exceed 150 characters.",
    "any.required": "Company Name is required.",
  }),
});

export { userValidationSchema, createCredentialsValidationSchema };
