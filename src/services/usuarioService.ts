import type { Usuario, ErroApi } from "../types/api";
import { API_URL } from "./apiConfig";

export async function buscarUsuarioPorId(
  idUsuario: number
): Promise<Usuario> {
  const resposta = await fetch(`${API_URL}/usuarios/${idUsuario}`);

  if (!resposta.ok) {
    const erro: ErroApi = await resposta.json();
    throw new Error(erro.mensagem);
  }

  return resposta.json();
}

export async function cadastrarUsuario(
  dados: Pick<Usuario, "nome" | "cpf" | "email">
): Promise<Usuario> {
  const resposta = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro: ErroApi = await resposta.json();
    throw new Error(erro.mensagem);
  }

  return resposta.json();
}