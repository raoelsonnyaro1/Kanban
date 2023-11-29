import express from "express";
import Historique from "../models/historique.js";
import validateObjectId from "../middlewares/idValidation.js";
import { notFoundMessage } from "../utils/validation.js";
const model = "Historique";

const router = express.Router();

router.get("/user/:id", validateObjectId, async (req, res) => {
  const historiques = await Historique.findOne({ user: req.params.id });
  if (!historiques) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(historiques);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const history = await Historique.findOne({ _id: req.params.id });
  if (!history) return res.status(404).send(notFoundMessage(model));

  res.status(200).json(history);
});

// router.delete("/:id", validateObjectId, async (req, res) => {
//   const historique = await Historique.findOneAndDelete({
//     _id: req.params.id,
//   });
//   if (!historique) res.status(404).send(notFoundMessage(model));

//   res.status(200).send(historique);
// });

export default router;
