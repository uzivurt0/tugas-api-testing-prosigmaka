const request = require("supertest")("https://dummyjson.com");
const chai = require("chai");
const chaiJsonSchema = require("chai-json-schema-ajv");

chai.use(chaiJsonSchema);
const { expect } = chai;
const todoSchemaMain = {
  type: "object",
  properties: {
    id: { type: "number" },
    todo: { type: "string" },
    userId: { type: "number" },
    completed: { type: "boolean" },
  },
};
const todosSchema = {
  type: "object",
  properties: {
    todos: {
      type: "array",
      items: {
        ...todoSchemaMain,
        required: ["id", "userId"],
      },
    },
  },
};

it("Test API Get All Products", async function () {
  const res = await request.get("/todos");
  expect(res._body).to.be.jsonSchema(todosSchema);
});

it("Test API Get All Products By User ID", async function () {
  const res = await request.get("/todos/user/2");
  expect(res._body).to.be.jsonSchema(todosSchema);
});

it("Test API Get All Products By ID", async function () {
  const res = await request.get("/todos/2");
  expect(res._body).to.be.jsonSchema(todoSchemaMain);
});

it("Test API Limit & Skip", async function () {
  const res = await request.get("/todos?limit=3&skip=10");
  expect(res._body).to.be.jsonSchema(todoSchemaMain);
});

it("Test API Add Products", async function () {
  const res = await request.post("/todos/add").send({
    todo: "Test API Add",
    completed: false,
    userId: 1,
  });
  expect(res._body).to.be.jsonSchema(todoSchemaMain);
  expect(res._body.userId).equal(1);
  expect(res._body.todo).equal("Test API Add");
  expect(res.body.completed).to.be.false;
});

it("Test API Edit Products", async function () {
  const res = await request.put("/todos/1").send({
    todo: "Test API Edited",
    completed: true,
    userId: 1,
  });
  expect(res._body).to.be.jsonSchema(todoSchemaMain);
  expect(res._body.userId).equal(1);
  expect(res._body.userId).equal(1);
  expect(res._body.todo).equal("Test API Edited");
  expect(res.body.completed).to.be.true;
});

it("Test API Delete Products", async function () {
  const res = await request.delete("/todos/1");
  expect(res._body).to.be.jsonSchema(todoSchemaMain);
});
