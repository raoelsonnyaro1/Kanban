import express from "express";
import _ from "lodash";
import { Client, validateClient } from "../models/client.js";
import validateObjectID from "../middlewares/idValidation.js";
import { notFoundMessage, alreadExistMessage } from "../utils/validation.js";
const router = express.Router();
const { pick } = _;
const model = "Client";
const clientFields = [
  "name",
  "activity_type",
  "email",
  "phone",
  "location",
  "deleted",
];

router.get("/", async (req, res) => {
  const clts = await Client.find().sort("name");
  res.status(200).json(clts);
});

router.get("/:id", validateObjectID, async (req, res) => {
  const clt = await Client.findById(req.params.id);
  if (!clt) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(clt);
});

router.post("/", async (req, res) => {
  const { error } = validateClient(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let clt = await Client.findOne({ name: req.body.name });
  if (clt) return res.status(400).send(alreadExistMessage(model));

  let newClient = new Client(pick(req.body, clientFields));
  await newClient.save();

  res.status(200).json(newClient);
});

router.put("/:id", validateObjectID, async (req, res) => {
  const { error } = validateClient(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   req.body.updated_at = Date.now();
  const clt = await Client.findOneAndUpdate(
    { _id: req.params.id },
    pick(req.body, clientFields),
    { new: true }
  );

  if (!clt) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(clt);
});

router.delete("/:id", validateObjectID, async (req, res) => {
  const clt = await Client.findOneAndUpdate(
    { _id: req.params.id },
    { deleted: true },
    { new: true }
  );
  if (!clt) return res.status(404).send(notFoundMessage(model));
  res.status(200).json(clt);
});

export default router;
