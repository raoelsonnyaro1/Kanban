import Joi from "joi";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    project: { type: String, ref: "Project" },
    description: String,
    status: {
      type: String,
      enum: [
        "todo",
        "in_progress",
        "finished",
        "payment_pending",
        "payment_done",
      ],
      default: "todo",
      required: true,
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const validateTask = (task) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(25),
    project: Joi.string(),
    description: Joi.string(),
    status: Joi.string(),
    deleted: Joi.boolean(),
  });

  return schema.validate(task);
};

export const Task = mongoose.model("Task", taskSchema);
