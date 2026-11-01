import type { Usuario } from "../types/api";
import { requisicaoApi } from "./apiClient";

export async function buscarUsuarioPorId(
  idUsuario: number
): Promise<Usuario> {
  return requisicaoApi<Usuario>(`/usuarios/${idUsuario}`);
}

export async function cadastrarUsuario(
  dados: Pick<Usuario, "nome" | "cpf" | "email">
): Promise<Usuario> {
  return requisicaoApi<Usuario>("/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
}