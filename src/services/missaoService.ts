import type { Missao, ErroApi } from "../types/api";
import { API_URL } from "./apiConfig";

export async function listarMissoesAtivas(): Promise<Missao[]> {
  const resposta = await fetch(`${API_URL}/missoes/ativas`);

  if (!resposta.ok) {
    const erro: ErroApi = await resposta.json();
    throw new Error(erro.mensagem);
  }

  return resposta.json();
}

export async function buscarMissaoPorId(
  idMissao: number
): Promise<Missao> {
  const resposta = await fetch(`${API_URL}/missoes/${idMissao}`);

  if (!resposta.ok) {
    const erro: ErroApi = await resposta.json();
    throw new Error(erro.mensagem);
  }

  return resposta.json();
}