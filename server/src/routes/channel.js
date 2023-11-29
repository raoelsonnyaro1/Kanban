import express from "express";
import { Channel } from "../models/channel.js";
import validateObjectID from "../middlewares/idValidation.js";
import { notFoundMessage } from "../utils/validation.js";
const router = express.Router();
const model = "Channel";

// here, id is the channel's projectID
router.get("/:id", validateObjectID, async (req, res) => {
  const channel = await Channel.findOne({ project: req.params.id }).populate(
    "project"
  );
  if (!channel) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(channel);
});

// here, id is the channel's projectID
router.delete("/:id", validateObjectID, async (req, res) => {
  const channel = await Channel.findOneAndUpdate(
    { _id: req.params.id },
    { deleted: true },
    { new: true }
  );
  if (!channel) return res.status(404).send(notFoundMessage(model));
  res.status(200).json(channel);
});

export default router;
