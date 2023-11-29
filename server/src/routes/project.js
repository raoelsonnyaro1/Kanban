import express from "express";
import _ from "lodash";
import { Project, validateProject } from "../models/project.js";
import validateObjectID from "../middlewares/idValidation.js";
import { notFoundMessage, alreadExistMessage } from "../utils/validation.js";
const router = express.Router();
const { pick } = _;
const model = "Project";
const projectFields = [
  "name",
  "type",
  "parent",
  "duration",
  "description",
  "status",
  "client",
  "responsibles",
  "deleted",
];

router.get("/", async (req, res) => {
  const projects = await Project.find()
    .sort("name")
    .populate("client")
    .populate("responsibles");
  res.status(200).json(projects);
});

router.get("/:id", validateObjectID, async (req, res) => {
  const proj = await Project.findById(req.params.id)
    .populate("client")
    .populate("responsibles");
  if (!proj) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(proj);
});

router.post("/", async (req, res) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let person = await Project.findOne({ name: req.body.name });
  if (person) return res.status(400).send(alreadExistMessage("Project name"));

  let newProj = new Project(pick(req.body, projectFields));
  await newProj.save();

  res.status(200).json(newProj);
});

router.put("/:id", validateObjectID, async (req, res) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   req.body.updated_at = Date.now();
  const proj = await Project.findOneAndUpdate(
    { _id: req.params.id },
    pick(req.body, projectFields),
    { new: true }
  );

  if (!proj) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(proj);
});

router.delete("/:id", validateObjectID, async (req, res) => {
  const proj = await Project.findOneAndUpdate(
    { _id: req.params.id },
    { deleted: true },
    { new: true }
  );
  if (!proj) return res.status(404).send(notFoundMessage(model));
  res.status(200).json(proj);
});

export default router;
