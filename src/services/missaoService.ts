import type { Missao } from "../types/api";
import { requisicaoApi } from "./apiClient";

export async function listarMissoesAtivas(): Promise<Missao[]> {
  return requisicaoApi<Missao[]>("/missoes/ativas");
}

export async function buscarMissaoPorId(
  idMissao: number
): Promise<Missao> {
  return requisicaoApi<Missao>(`/missoes/${idMissao}`);
}