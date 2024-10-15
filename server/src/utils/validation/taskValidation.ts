import Joi from "joi";
import mongoose from "mongoose";

// Define a validation pattern for MongoDB ObjectId
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const taskValidationSchema = Joi.object({
  _id: Joi.string().optional().pattern(objectIdPattern).messages({
    "string.pattern.base": "_id must be a valid MongoDB ObjectId",
  }),
  title: Joi.string().min(3).max(30).optional().pattern(/^\S*$/).messages({
    "string.min": "title must be at least 3 characters",
    "string.max": "title must not exceed 30 characters",
    "any.required": "title is required",
    "string.pattern.base": "title must not contain spaces",
  }),
  task: Joi.string().min(3).max(100).optional().messages({
    "string.min": "Task must be at least 3 characters",
    "string.max": "Task must not exceed 100 characters",
    "any.required": "Task is required",
  }),
  status: Joi.alternatives()
    .try(
      Joi.boolean(),
      Joi.string().valid("completed", "in progress").messages({
        "string.valid": "Status must be either 'completed' or 'in progress'",
      })
    )
    .optional()
    .messages({
      "alternatives.match":
        "Status must be a boolean or one of the allowed string values",
    }),
});

export default taskValidationSchema;
