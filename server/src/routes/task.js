import express from "express";
import _ from "lodash";
import { Task, validateTask } from "../models/task.js";
import validateObjectID from "../middlewares/idValidation.js";
import { notFoundMessage } from "../utils/validation.js";
const router = express.Router();
const { pick } = _;
const model = "Task";
const taskFields = ["title", "project", "description", "status", "deleted"];

router.get("/", async (req, res) => {
  const tasks = await Task.find().sort("title").populate("project");
  res.status(200).json(tasks);
});

router.get("/:id", validateObjectID, async (req, res) => {
  const task = await Task.findById(req.params.id).populate("project");
  if (!task) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(task);
});

// params id: projectID
router.get("/project/:id", validateObjectID, async (req, res) => {
  const task = await Task.find({ project: req.params.id }); // .populate("project");
  if (!task) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(task);
});

router.post("/", async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let newTask = new Task(pick(req.body, taskFields));
  await newTask.save();

  res.status(200).json(newTask);
});

router.put("/:id", validateObjectID, async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id },
    pick(req.body, taskFields),
    { new: true }
  );

  if (!task) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(task);
});

router.delete("/:id", validateObjectID, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id },
    { deleted: true },
    { new: true }
  );
  if (!task) return res.status(404).send(notFoundMessage(model));
  res.status(200).json(task);
});

export default router;
