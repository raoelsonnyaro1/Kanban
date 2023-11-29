import express from "express";
import _ from "lodash";
import { Departement, validateDepartement } from "../models/departement.js";
import validateObjectID from "../middlewares/idValidation.js";
import { notFoundMessage, alreadExistMessage } from "../utils/validation.js";
const router = express.Router();
const { pick } = _;
const model = "Departement";
const departementFields = ["name", "description", "deleted"];

router.get("/", async (req, res) => {
  const dpts = await Departement.find().sort("name");
  res.status(200).json(dpts);
});

router.get("/:id", validateObjectID, async (req, res) => {
  const dpt = await Departement.findById(req.params.id);
  if (!dpt) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(dpt);
});

router.post("/", async (req, res) => {
  const { error } = validateDepartement(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let dpt = await Departement.findOne({ name: req.body.name });
  if (dpt) return res.status(400).send(alreadExistMessage(model));

  let newDepartement = new Departement(pick(req.body, departementFields));

  await newDepartement.save();

  res.status(200).json(newDepartement);
});

router.put("/:id", validateObjectID, async (req, res) => {
  const { error } = validateDepartement(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const dpt = await Departement.findOneAndUpdate(
    { _id: req.params.id },
    pick(req.body, departementFields),
    { new: true }
  );

  if (!dpt) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(dpt);
});

router.delete("/:id", validateObjectID, async (req, res) => {
  const dpt = await Departement.findOneAndUpdate(
    { _id: req.params.id },
    { deleted: true },
    { new: true }
  );
  if (!dpt) return res.status(404).send(notFoundMessage(model));
  res.status(200).json(dpt);
});

export default router;
