import Joi from "joi";

export const validateUserSchema = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
};

export const validateLoginSchema = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
};
export const validatePostSchema = (post) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
  });
  return schema.validate(post);
};
export const validateComment = (comment) => {
  const schema = Joi.object({
    body: Joi.string().required(),
  });
  return schema.validate(comment);
};
