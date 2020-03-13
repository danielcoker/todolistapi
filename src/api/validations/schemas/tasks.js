import Joi from '@hapi/joi';

const commonTaskSchema = {
  title: Joi.string()
    .min(3)
    .trim(true),
  description: Joi.string()
    .min(3)
    .trim(true)
};

const createTask = Joi.object({
  title: commonTaskSchema.title.required(),
  description: commonTaskSchema.description
});

export { createTask };
