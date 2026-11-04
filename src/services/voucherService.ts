import type { Voucher } from "../types/api";
import { requisicaoApi } from "./apiClient";

export async function listarVouchers(): Promise<Voucher[]> {
  return requisicaoApi<Voucher[]>("/vouchers");
}

export async function buscarVoucherPorId(
  idVoucher: number
): Promise<Voucher> {
  return requisicaoApi<Voucher>(`/vouchers/${idVoucher}`);
}