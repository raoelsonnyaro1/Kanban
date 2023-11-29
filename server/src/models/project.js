import Joi from "joi";
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["main", "child"],
      default: "main"
    },
    parent: { type: String, ref: "Project" },
    duration: String,
    description: String,
    status: {
      type: String,
      enum: ["started", "wip", "finished", "pending", "validated", "canceled"],
      default: "started",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    responsibles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const validateProject = (proj) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25),
    type: Joi.string(),
    parent: Joi.string(),
    duration: Joi.string(),
    description: Joi.string(),
    status: Joi.string(),
    client: Joi.string(),
    responsibles: Joi.array().items(Joi.string()),
    deleted: Joi.boolean(),
  });

  return schema.validate(proj);
};

export const Project = mongoose.model("Project", projectSchema);
