import request from "supertest";

import server from "../../app";
import { describe, expect, test } from "@jest/globals";
import Ticket from "../../models/Ticket";

const testData = {
  name: "Hamachi Catperson",
  email: "ham@cat.net",
  description: "Hi,\n\n It doesn't work.",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let newTicket: any;

beforeEach(async () => {
  newTicket = new Ticket(testData);
  await newTicket.save();
});

afterEach(async () => {
  await Ticket.deleteMany({});
});

afterAll(() => {
  server.close();
});

describe("GET /api/tickets", () => {
  test("returns 200 when the request is valid", async () => {
    const res = await request(server).get("/api/tickets");

    expect(res.status).toEqual(200);
  });

  test("returns an array of tickets", async () => {
    const res = await request(server).get("/api/tickets");

    const { body } = res;

    expect(body).toHaveLength(1);
    expect(body).toMatchObject([testData]);
    expect(body[0].id).toBeDefined();
    expect(body[0].status).toEqual("new");
    expect(body[0].createdAt).toBeDefined();
    expect(body[0].updatedAt).toBeDefined();
  });
});

test("Ticket status can be updated only with valid options", async () => {
  const statuses = ["new", "in progress", "resolved"];
  for (let index = 0; index < statuses.length; index++) {
    const status = statuses[index];
    const res = await request(server)
      .put("/api/tickets/" + newTicket.id)
      .send({ status });

    const { body } = res;

    expect(body.status).toEqual(status);
  }

  const res = await request(server)
    .put("/api/tickets/" + newTicket.id)
    .send({ status: "foo" });

  expect(res.status).toEqual(400);
});

test("Ticket responses can be created", async () => {
  const message = "Hi,\n\nWe can help.";
  const res = await request(server)
    .put("/api/tickets/" + newTicket.id)
    .send({
      message,
    });
  expect(res.statusCode).toEqual(200);
  const { body } = res;
  expect(body.responses).toHaveLength(1);
  expect(body.responses[0].message).toEqual(message);
});
