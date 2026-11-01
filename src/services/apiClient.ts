import { API_URL } from "./apiConfig";

export async function requisicaoApi<T>(
  caminho: string,
  opcoes?: RequestInit
): Promise<T> {
  let resposta: Response;

  try {
    resposta = await fetch(`${API_URL}${caminho}`, opcoes);
  } catch {
    throw new Error(
      "Não foi possível conectar à API. Verifique se o servidor está funcionando."
    );
  }

  if (!resposta.ok) {
    let mensagem =
      resposta.status >= 500
        ? "Erro no servidor. Tente novamente mais tarde."
        : `Erro HTTP ${resposta.status}.`;

    const erro: unknown = await resposta.json().catch(() => null);

    if (
      typeof erro === "object" &&
      erro !== null &&
      "mensagem" in erro &&
      typeof erro.mensagem === "string"
    ) {
      mensagem = erro.mensagem;
    }

    throw new Error(mensagem);
  }

  if (resposta.status === 204) {
    return undefined as T;
  }

  return (await resposta.json()) as T;
}