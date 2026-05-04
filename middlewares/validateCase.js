const Joi = require("joi");

const caseSchema = Joi.object({
  comp_ref_no: Joi.string()
    .pattern(/^REF-[0-9]+$/)
    .required()
    .messages({
      "string.empty": "Complaint reference number is required",
      "any.required": "Complaint reference number is required",
      "string.pattern.base": "Format must be REF-123"
    }),

  check_status: Joi.string()
    .valid("PENDING", "IN_PROGRESS", "COMPLETED")
    .optional()
});

const validateCase = (req, res, next) => {
  const { error } = caseSchema.validate(req.body);

  if (error) {
    error.statusCode = 400;
    return next(error);
  }

  next();
};

module.exports = validateCase;