import Joi from "joi";
import mongoose from "mongoose";

const enterpriseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    tel: { type: String, required: true },
    email: { type: String, required: true },
    nifStat: {
      type: String,
      required: true,
    },
    activities: [String],
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const validateEnterprise = (enterprise) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25),
    address: Joi.string(),
    tel: Joi.string().required(),
    email: Joi.string().required(),
    nifStat: Joi.string().required(),
    activities: Joi.array(Joi.string()),
    deleted: Joi.boolean(),
  });

  return schema.validate(enterprise);
};

export const Enterprise = mongoose.model("Enterprise", enterpriseSchema);
