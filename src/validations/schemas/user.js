import Joi from '@hapi/joi';

const commonUserSchema = {
  name: Joi.string()
    .min(3)
    .trim(true),
  phone: Joi.string(),
  password: Joi.string()
    .min(6)
    .trim(true)
    .pattern(/\d/)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .prefs({ abortEarly: true })
    .message({
      'string.min': 'Password must be at least 6 characters long.',
      'string.pattern.base': 'Password must be at least 6 characters long.'
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .messages({
      'any.only': 'Confirm password must match password value.'
    })
};

const createUser = Joi.object({
  name: commonUserSchema.name.required(),
  phone: commonUserSchema.phone.required(),
  password: commonUserSchema.password.required(),
  confirmPassword: commonUserSchema.confirmPassword.required()
});

export { createUser };
