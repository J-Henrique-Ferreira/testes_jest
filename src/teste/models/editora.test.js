import { describe, expect } from "@jest/globals";
import Editora from "../../models/editora.js";

describe("Testes do model de editora", () => {
  const objEditora = {
    nome: "editora developper",
    cidade: "dos_programmers",
    email: "olamundo@gmail.com",
  };
  it("Deve instanciar uma nova editora", () => {
    const editora = new Editora(objEditora);

    expect(editora).toEqual(expect.objectContaining(objEditora));
  });

  it("Deve salvar editora no DB", async () => {
    const editora = new Editora(objEditora);

    const dados = await editora.salvar();
    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );
  });
});
