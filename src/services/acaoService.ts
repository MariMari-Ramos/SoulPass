import type { AcaoRealizada } from "../types/api";
import { requisicaoApi } from "./apiClient";

export async function registrarAcao(
  dados: Pick<
    AcaoRealizada,
    "idUsuario" | "idMissao" | "metodoValidacao"
  >
): Promise<AcaoRealizada> {
  return requisicaoApi<AcaoRealizada>("/acoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
}

export async function aprovarAcao(
  idAcao: number,
  codigo: string
): Promise<AcaoRealizada> {
  return requisicaoApi<AcaoRealizada>(
    `/acoes/${idAcao}/aprovar`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codigo }),
    }
  );
}

export async function listarAcoesPorUsuario(
  idUsuario: number
): Promise<AcaoRealizada[]> {
  return requisicaoApi<AcaoRealizada[]>(
    `/acoes/usuario/${idUsuario}`
  );
}