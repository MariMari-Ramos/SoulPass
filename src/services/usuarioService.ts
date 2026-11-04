import type { Usuario } from "../types/api";
import { requisicaoApi } from "./apiClient";

interface DadosCadastro {
  nome: string;
  email: string;
  senha: string;
  cpf?: string;
}

interface DadosLogin {
  email: string;
  senha: string;
}

export async function buscarUsuarioPorId(
  idUsuario: number
): Promise<Usuario> {
  return requisicaoApi<Usuario>(`/usuarios/${idUsuario}`);
}

export async function cadastrarUsuario(
  dados: DadosCadastro
): Promise<Usuario> {
  return requisicaoApi<Usuario>("/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
}

export async function fazerLogin(
  dados: DadosLogin
): Promise<Usuario> {
  return requisicaoApi<Usuario>("/usuarios/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
}