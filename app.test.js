const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let candy = { name: "candy", price: 2 };
let cookie = { name: "cookie", price: 1.45 };


beforeEach(function () {
  db.items.push(candy);
  db.items.push(cookie);
});

afterEach(function () {
  db.items = [];
});

describe("GET /items/:name", function () {
  test("valid", async function () {
    const resp = await request(app).get("/items/candy");
    expect(resp.body).toEqual(candy);
  });

  test("invalid", async function () {
    const resp = await request(app).get("/items/test");
    expect(resp.statusCode).toEqual(400);
  });
});


describe("POST /items", function () {
  test("adds new shopping item", async function () {
    let newThing = { name: "chocolate", price: 2.50 }
    const resp = await request(app).post("/items").send(newThing);
    expect(resp.body).toEqual({ added: newThing });
  });
});

