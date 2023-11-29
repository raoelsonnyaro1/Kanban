import mongoose from "mongoose";
import Joi from "joi";

const departementSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const validateDepartement = (departement) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25),
    description: Joi.string().min(3).max(25),
    deleted: Joi.boolean(),
  });

  return schema.validate(departement);
};

export const Departement = mongoose.model("Departement", departementSchema);
