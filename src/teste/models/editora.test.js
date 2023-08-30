import { describe, expect, jest } from "@jest/globals";
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

  it.skip("Deve salvar editora no DB", async () => {
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

  it("Deve simular salvar no banco de dados", () => {
    const editora = new Editora(objEditora);

    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: "editora developper",
      cidade: "dos_programmers",
      email: "olamundo@gmail.com",
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });

    const retornado = editora.salvar();

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
