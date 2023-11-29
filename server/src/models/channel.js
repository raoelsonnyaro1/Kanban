import Joi from "joi";
import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    project: { type: String, ref: "Project", required: true },
    description: String,
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    deleted: Boolean
  },
  { timestamps: true }
);

export const validateChannel = (channel) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25),
    project: Joi.string(),
    description: Joi.string(),
    members: Joi.array().items(Joi.string()),
    deleted: Joi.boolean()
  });

  return schema.validate(channel);
};

export const Channel = mongoose.model("Channel", channelSchema);
