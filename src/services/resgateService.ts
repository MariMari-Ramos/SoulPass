import type { Resgate, ErroApi } from "../types/api";
import { API_URL } from "./apiConfig";

export async function resgatarVoucher(
  dados: Pick<Resgate, "idUsuario" | "idVoucher">
): Promise<Resgate> {
  const resposta = await fetch(`${API_URL}/resgates`, {
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

export async function listarResgatesPorUsuario(
  idUsuario: number
): Promise<Resgate[]> {
  const resposta = await fetch(
    `${API_URL}/resgates/usuario/${idUsuario}`
  );

  if (!resposta.ok) {
    const erro: ErroApi = await resposta.json();
    throw new Error(erro.mensagem);
  }

  return resposta.json();
}