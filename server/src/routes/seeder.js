import { faker } from "@faker-js/faker";
import { Departement } from "../models/departement.js";
import { Client } from "../models/client.js";
import { Project } from "../models/project.js";
import { Task } from "../models/task.js";
import { User } from "../models/user.js";
import _ from "lodash";
import express from "express";
const router = express.Router();
const { pick } = _;

const createDepartements = async (nb) => {
  await Departement.deleteMany({});
  const depts = "d"
    .repeat(nb)
    .split("")
    .map((e) => {
      return {
        name: faker.company.bsNoun(),
        description: faker.company.catchPhrase(),
      };
    });
  await Departement.insertMany(depts);
};

export const generateUsers = (
  nbUsers,
  role = "user",
  refID = null, // departementID or clientID
  sexe = "female"
) => {
  return "u"
    .repeat(nbUsers)
    .split("")
    .map((u) => {
      const firstname = faker.name.firstName(sexe);
      const lastname = faker.name.lastName(sexe);
      return {
        _id: faker.database.mongodbObjectId(),
        departement: role == "user" ? refID : undefined,
        client: role == "customer" ? refID : undefined,
        firstname,
        lastname,
        sexe,
        role,
        birthDate: faker.date.birthdate(),
        email: faker.internet.email(lastname, firstname, "crm.dev"),
        password: faker.internet.password(20),
        clearPassword: faker.internet.password(20),
        matricule: `M-${faker.random.numeric(5)}`,
        position: faker.name.jobTitle(),
      };
    });
};

const createUsers = async (nb) => {
  await User.deleteMany({});
  const depts = await Departement.find().select("_id");
  const clients = await Client.find().select("_id");

  if (depts.length) {
    const users = depts.map((d, i) => {
      const sexe = i % 2 == 0 ? "male" : "female";
      return generateUsers(faker.datatype.number(nb), "user", d._id, sexe);
    });
    await User.insertMany(_.flattenDepth(users, 1));

    const clientUsers = clients.map((c, i) => {
      const sexe = i % 2 == 0 ? "male" : "female";
      // 1 user per client
      return generateUsers(1, "user", c._id, sexe);
    });
    await User.insertMany(_.flattenDepth(clientUsers, 1));
  }
};

const createClients = async (nb) => {
  await Client.deleteMany({});
  const clients = "c"
    .repeat(nb)
    .split("")
    .map((c) => {
      return {
        name: faker.company.name(),
        activity_type: faker.internet.domainWord(),
        email: faker.internet.email(),
        phone: faker.phone.number("+261 ## ## ### ##"),
        location: faker.address.streetAddress(),
      };
    });
  await Client.insertMany(clients);
};

const createProjects = async () => {
  await Project.deleteMany({});
  const clients = await Client.find().select("_id");
  if (clients.length) {
    const projects = clients.map((c) => {
      return {
        name: faker.internet.domainName(),
        type: "main",
        duration: "undetermined",
        description: faker.lorem.sentences(2),
        status: "started",
        client: c._id,
        responsibles: [],
      };
    });

    await Project.insertMany(projects);
  }
};

const createTasks = async () => {
  await Task.deleteMany({});
  const projects = await Project.find().select("_id");
  if (projects.length) {
    ["todo", "in_progress", "finished"].map(async (s) => {
      const tasks = projects.map((p) => {
        return {
          project: p._id,
          title: faker.lorem.sentence(5),
          description: faker.lorem.sentences(3),
          status: s,
        };
      });

      await Task.insertMany(tasks);
    });
  }
};

router.get("/", async (req, res) => {
  await createDepartements(5);
  await createClients(50);
  await createProjects();
  await createUsers(10);
  await createTasks();

  res.status(200).send("OK");
});

export default router;
