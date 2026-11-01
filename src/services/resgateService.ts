import type { Resgate } from "../types/api";
import { requisicaoApi } from "./apiClient";

export async function resgatarVoucher(
  dados: Pick<Resgate, "idUsuario" | "idVoucher">
): Promise<Resgate> {
  return requisicaoApi<Resgate>("/resgates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
}

export async function listarResgatesPorUsuario(
  idUsuario: number
): Promise<Resgate[]> {
  return requisicaoApi<Resgate[]>(
    `/resgates/usuario/${idUsuario}`
  );
}