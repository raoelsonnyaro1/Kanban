import express from "express";
import _ from "lodash";
import bcrypt from "bcrypt";
import { User, validateUser } from "../models/user.js";
import validateObjectID from "../middlewares/idValidation.js";
import { notFoundMessage, alreadExistMessage } from "../utils/validation.js";
const router = express.Router();
const { pick } = _;
const model = "User";

const userFields = [
  "lastname",
  "firstname",
  "sexe",
  "email",
  "password",
  "matricule",
  "position",
  "role",
  "departement",
  "client",
  "deleted",
];

router.get("/", async (req, res) => {
  const users = await User.find()
    .sort("lastname")
    .select("-password")
    .populate("client")
    .populate("departement");
  res.status(200).json(users);
});

router.get("/:id", validateObjectID, async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("client")
    .populate("departement");
  if (!user) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const person = await User.findOne({ email: req.body.email });
  if (person) return res.status(400).send(alreadExistMessage("Email"));

  const newUser = new User(pick(req.body, userFields));
  await newUser.save();

  res.status(200).json(newUser);
});

router.put("/:id", validateObjectID, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    pick(req.body, userFields),
    { new: true }
  );

  if (!user) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(user);
});

router.delete("/:id", validateObjectID, async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { deleted: true },
    { new: true }
  );
  if (!user) return res.status(404).send(notFoundMessage(model));
  res.status(200).json(user);
});

async function userExists(username) {
  const user = await User.findOne({ username: username });
  if (user) return true;

  return false;
}

export default router;
