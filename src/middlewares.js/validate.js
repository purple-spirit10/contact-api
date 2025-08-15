// Joi-based request body validation
import Joi from "joi";

export function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: "Validation error",
        errors: error.details.map((d) => d.message)
      });
    }
    req.body = value;
    next();
  };
}

export const contactCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(20).required(),
  company: Joi.string().max(120).allow("", null),
  notes: Joi.string().max(1000).allow("", null)
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  phone: Joi.string().min(7).max(20),
  company: Joi.string().max(120).allow("", null),
  notes: Joi.string().max(1000).allow("", null)
}).min(1); // must include at least one field
