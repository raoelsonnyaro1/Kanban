import Joi from "joi";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    content: { type: String, required: true },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const validateMessage = (message) => {
  const schema = Joi.object({
    type: Joi.string().min(3).max(25),
    content: Joi.string(),
    channel: Joi.string(),
    from: Joi.string(),
    to: Joi.string(),
  });

  return schema.validate(message);
};

export const Message = mongoose.model("Message", messageSchema);
