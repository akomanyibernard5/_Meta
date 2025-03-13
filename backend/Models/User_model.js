const Joi = require("joi");

const formSchema = Joi.object({
  birthDate: Joi.string().required(),
  socialSecurityNo: Joi.string().length(9).pattern(/^[0-9]+$/).required(),
  referringAgency: Joi.string().allow(""),
  treatmentCenter: Joi.string().allow(""),
  lastResidence: Joi.string().required(),
  maritalStatus: Joi.string().valid("Single", "Married", "Divorced").required(),
  numberOfChildren: Joi.number().integer().required(),
  nextOfKin: Joi.string().required(),
  nextOfKinAddress: Joi.string().required(),
  nextOfKinPhone: Joi.string().required(),
  medicalProblems: Joi.string().required(),
  medicalMedication: Joi.string().required(),
  psychiatricDisorder: Joi.string().required(),
  psychiatricMedication: Joi.string().required(),
  alcoholDrugHistory: Joi.string().allow(""),
  primaryDrugsUsed: Joi.string().allow(""),
  treatmentAttendance: Joi.string().allow(""),
  education: Joi.string().allow(""),
  militaryService: Joi.string().allow(""),
  employmentHistory: Joi.string().allow(""),
  incarcerationHistory: Joi.string().allow(""),
});

module.exports = formSchema;
