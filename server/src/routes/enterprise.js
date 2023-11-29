import express from "express";
import _ from "lodash";
import { Enterprise, validateEnterprise } from "../models/enterprise.js";
import validateObjectID from "../middlewares/idValidation.js";
import { notFoundMessage, alreadExistMessage } from "../utils/validation.js";
const router = express.Router();
const { pick } = _;
const model = "Enterprise";
const enterpriseFields = [
  "name",
  "address",
  "tel",
  "email",
  "nifStat",
  "activities",
  "deleted",
];

router.get("/", async (req, res) => {
  const entrs = await Enterprise.find().sort("name");
  res.status(200).json(entrs);
});

router.get("/:id", validateObjectID, async (req, res) => {
  const entr = await Enterprise.findById(req.params.id);
  if (!entr) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(entr);
});

router.post("/", async (req, res) => {
  const { error } = validateEnterprise(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let entr = await Enterprise.findOne({ name: req.body.name });
  if (entr) return res.status(400).send(alreadExistMessage(model));

  let newEnterprise = new Enterprise(pick(req.body, enterpriseFields));
  await newEnterprisesave();

  res.status(200).json(newEnterprise);
});

router.put("/:id", validateObjectID, async (req, res) => {
  const { error } = validateEnterprise(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const entr = await Enterprise.findOneAndUpdate(
    { _id: req.params.id },
    pick(req.body, enterpriseFields),
    { new: true }
  );

  if (!entr) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(entr);
});

router.delete("/:id", validateObjectID, async (req, res) => {
  const entr = await Enterprise.findOneAndUpdate(
    { _id: req.params.id },
    { deleted: true },
    { new: true }
  );
  if (!entr) return res.status(404).send(notFoundMessage(model));
  res.status(200).json(entr);
});

export default router;
