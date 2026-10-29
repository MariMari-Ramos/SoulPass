import type { Voucher, ErroApi } from "../types/api";
import { API_URL } from "./apiConfig";

export async function listarVouchers(): Promise<Voucher[]> {
  const resposta = await fetch(`${API_URL}/vouchers`);

  if (!resposta.ok) {
    const erro: ErroApi = await resposta.json();
    throw new Error(erro.mensagem);
  }

  return resposta.json();
}

export async function buscarVoucherPorId(
  idVoucher: number
): Promise<Voucher> {
  const resposta = await fetch(`${API_URL}/vouchers/${idVoucher}`);

  if (!resposta.ok) {
    const erro: ErroApi = await resposta.json();
    throw new Error(erro.mensagem);
  }

  return resposta.json();
}