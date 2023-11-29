import mongoose from "mongoose";
import request from "supertest";
import { User } from "../../models/user.js";
import server from "../../index";
import { generateUsers } from "../../routes/seeder.js";

const apiVersion = process.env.API_VERSION || "v1";
const url = `/api/${apiVersion}/users`;
let nbUsers = 10, userID

describe(url, () => {
  beforeEach(async () => {
    const users = generateUsers(nbUsers);
    const res = await User.insertMany(users);
    userID = res[0]._id
  });
  afterEach(async () => {
    await User.deleteMany({});
    server.close();
  });

  describe("GET /", () => {
    let token = new User().generateAuthToken();
    it("should return all users", async () => {
      const res = await request(server).get(url); //.set("x-auth-token", token);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(nbUsers);
      //   expect(res.body.some((u) => u.prenom === "ando")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    let token = new User().generateAuthToken();
    it("should return 400 if given _id is invalid", async () => {
      const res = await request(server).get(`${url}/1`);
      // .set("x-auth-token", token);
      expect(res.status).toBe(400);
    });

    it("should return 404 if given _id cannot be found", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(url + id);
      // .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });

    it("should return a user with if given _id is valid", async () => {
      const res = await request(server).get(`${url}/${userID}`);
      // .set("x-auth-token", token);
      expect(res.status).toBe(200);
    });
  });
});
