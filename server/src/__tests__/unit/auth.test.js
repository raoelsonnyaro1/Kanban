import { Types } from "mongoose";
import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
import Auth from "../../middlewares/auth.js";
import { User } from "../../models/user.js";

describe("auth middleware", () => {
  it("should populate res.user with the payload of a valid JWT", () => {
    const user = {
      _id: Types.ObjectId().toHexString(),
      departement: Types.ObjectId().toHexString(),
      firstname: faker.name.firstName("male"),
      lastname: faker.name.lastName("male"),
      sexe: "feminin",
      role: "admin",
      email: faker.internet.email(),
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    Auth(req, res, next);
    expect(req.user).toMatchObject(user);
  });
});
