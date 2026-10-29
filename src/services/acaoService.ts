import type { AcaoRealizada, ErroApi } from "../types/api";
import { API_URL } from "./apiConfig";

export async function registrarAcao(
  dados: Pick<
    AcaoRealizada,
    "idUsuario" | "idMissao" | "metodoValidacao"
  >
): Promise<AcaoRealizada> {
  const resposta = await fetch(`${API_URL}/acoes`, {
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

export async function aprovarAcao(
  idAcao: number,
  codigo: string
): Promise<AcaoRealizada> {
  const resposta = await fetch(`${API_URL}/acoes/${idAcao}/aprovar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ codigo }),
  });

  if (!resposta.ok) {
    const erro: ErroApi = await resposta.json();
    throw new Error(erro.mensagem);
  }

  return resposta.json();
}