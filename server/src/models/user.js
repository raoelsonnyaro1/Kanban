import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import Historique from "./historique.js";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthDate: Date,
    sexe: { type: String, enum: ["female", "male"] },
    email: { type: String, required: true },
    password: { type: String, required: true },
    clearPassword: String, // only for dev purpose
    matricule: { type: String, required: true },
    position: { type: String },
    role: {
      type: String,
      enum: ["user", "customer"],
      default: "user",
      required: true,
    },
    departement: {
      // only if user.role is not "customer"
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departement",
    },
    client: {
      // only if user.role is "customer"
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    isActive: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      sexe: user.sexe,
      departement: user.departement,
      matricule: user.matricule,
    },
    process.env.PRIVATE_KEY
  );
  return token;
};

userSchema.methods.generateHistorique = async function (
  desc,
  type,
  data = null
) {
  const histo = new Historique({
    description: desc,
    type: type,
    user: this._id,
    content: data,
  });

  await histo.save();

  return histo;
};

userSchema.pre("save", function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (!user.password) {
    next();
  }

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      throw new Error(error);
    } else {
      bcrypt.hash(user.password, salt, (err, hashed) => {
        if (err) {
          return next(err);
        }
        user.password = hashed;
        next();
      });
    }
  });
});

export const validateUser = (user) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(25),
    lastname: Joi.string().min(3).max(25),
    password: Joi.string().alphanum().min(8).max(50),
    clearPassword: Joi.string(),
    sexe: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    position: Joi.string(),
    // image: Joi.array().items(Joi.string()),
    role: Joi.string(),
    departement: Joi.string(),
    matricule: Joi.string(),
    deleted: Joi.boolean(),
  });

  return schema.validate(user);
};

export const User = mongoose.model("User", userSchema);
