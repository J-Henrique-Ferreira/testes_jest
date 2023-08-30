import { describe, expect } from "@jest/globals";
import app from "../../app";
import request from "supertest";

let server;

beforeEach(() => {
  const port = 8888;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

let resPostEditoras;

describe("GET em /editoras", () => {
  it("Deve retornar uma lista de editoras", async () => {
    const response = await request(app)
      .get("/editoras")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    expect(response.body[0].email).toEqual("m@m.com");
  });
});

describe("POST em /editoras", () => {
  it("Deve criar uma nova editora", async () => {
    const response = await request(app)
      .post("/editoras")
      .send({
        nome: "abacate",
        cidade: "taquara",
        email: "taquar@email.com",
      })
      .expect(201);

    resPostEditoras = JSON.parse(response.res.text);
  });
  it("Deve tratar requisicao mal formada", async () => {
    const response = await request(app).post("/editoras").send({}).expect(401);
  });
});
describe("PUT em /editoras", () => {
  it("Deve editar uma editora", async () => {
    const response = await request(app)
      .put("/editoras/3")
      .send({
        nome: "abacate123",
      })
      .expect(204);
  });
});

describe("DELETE em /editoras", () => {
  it("Deve deletar uma editora pelo id", async () => {
    await request(app)
      .delete(`/editoras/${resPostEditoras.content.id}`)
      .expect(200);
  });
});
