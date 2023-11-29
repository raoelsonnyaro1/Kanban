import Joi from "joi";
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    activity_type: String,
    email: { type: String, required: true },
    phone: String,
    location: String, // address
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const validateClient = (client) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25),
    activity_type: Joi.string().min(3).max(25),
    phone: Joi.string(),
    location: Joi.string(),
    email: Joi.string(),
    deleted: Joi.boolean(),
  });

  return schema.validate(client);
};

export const Client = mongoose.model("Client", clientSchema);
