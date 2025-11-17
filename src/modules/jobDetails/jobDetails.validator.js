const Joi = require("joi");

const JobDetailsCreateDTO = Joi.object({

  jobTitle: Joi.string()
    .min(3)
    .max(100)
    .messages({
      "string.empty": "Job title cannot be empty.",
      "string.min": "Job title must be at least 3 characters long.",
      "string.max": "Job title must be less than 100 characters.",
    }),

    jobDesrciption: Joi.string()
    .min(10)
    .max(1000)
    .messages({
      "string.empty": "Job description cannot be empty.",
      "string.min": "Job description must be at least 10 characters long.",
      "string.max": "Job description cannot exceed 1000 characters.",
    }),

  jobLocation: Joi.string()
    .min(2)
    .max(100)
    .messages({
      "string.empty": "Job location cannot be empty.",
      "string.min": "Job location must be at least 2 characters long.",
    }),

  jobType: Joi.string()
    .valid("Full-time", "Part-time", "Contract", "Internship", "Remote")
    .messages({
      "any.only": "Job type must be one of: Full-time, Part-time, Contract, Internship, or Remote.",
      "string.empty": "Job type cannot be empty.",
    }),

  jobCategory: Joi.string()
    .min(3)
    .max(50)
    .messages({
      "string.empty": "Job category cannot be empty.",
      "string.min": "Job category must be at least 3 characters long.",
      "string.max": "Job category must be less than 50 characters.",
    }),

  jobSalary: Joi.number()
    .positive()
    .precision(2)
    .messages({
      "number.base": "Job salary must be a valid number.",
      "number.positive": "Job salary must be a positive value.",
    }),

  jobRequirements: Joi.string()
    .min(10)
    .max(1000)
    .messages({
      "string.empty": "Job requirements cannot be empty.",
      "string.min": "Job requirements must be at least 10 characters long.",
    }),
  jobResponsibilities: Joi.string()
    .min(10)
    .max(1000)
    .messages({
      "string.empty": "Job responsibilities cannot be empty.",
      "string.min": "Job responsibilities must be at least 10 characters long.",
    }),
    jobBenefits: Joi.string()
    .min(10)
    .max(1000)
    .messages({
      "string.empty": "Job responsibilities cannot be empty.",
      "string.min": "Job responsibilities must be at least 10 characters long.",
    })
})
const JobDetailsUpdateDTO = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  url: Joi.string().uri().allow(null, '').default(null).optional(),
  status: Joi.string().regex(/^(active|inactive)$/).default('inactive'),
  image: Joi.string().allow(null, '').default(null).optional()
})

module.exports = {
  JobDetailsCreateDTO,
  JobDetailsUpdateDTO,
};