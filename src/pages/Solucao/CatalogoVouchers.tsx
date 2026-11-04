import { useEffect, useState } from "react";

import type { Voucher } from "../../types/api";
import { listarVouchers } from "../../services/voucherService";
import { resgatarVoucher } from "../../services/resgateService";

const tiposTransporte: Record<Voucher["tipoTransporte"], string> = {
  ONIBUS: "Ônibus",
  METRO: "Metrô",
  TREM: "Trem",
  BICICLETA: "Bicicleta",
  APLICATIVO: "Aplicativo",
};

interface CatalogoVouchersProps {
  idUsuario: number;
  saldoPontos: number;
  onResgateConcluido: () => void;
}

function CatalogoVouchers({ idUsuario, saldoPontos, onResgateConcluido }: CatalogoVouchersProps) {
  const [voucherSelecionado, setVoucherSelecionado] = useState<Voucher | null>(
    null,
  );
  const [comprando, setComprando] = useState(false);
  const [mensagemCompra, setMensagemCompra] = useState("");
  const [erroCompra, setErroCompra] = useState("");
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    async function carregarVouchers() {
      try {
        setCarregando(true);
        setErro("");

        const dados = await listarVouchers();
        setVouchers(dados);
      } catch (erro) {
        setErro(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar os vouchers.",
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarVouchers();
  }, [tentativa]);

  async function confirmarResgate() {
    if (!voucherSelecionado || comprando) return;

    if (saldoPontos < voucherSelecionado.custoPontos) {
      setErroCompra(
        "Você não possui pontos suficientes para resgatar esta recompensa.",
      );
      return;
    }

    try {
      setComprando(true);
      setErroCompra("");
      setMensagemCompra("");

      await resgatarVoucher({
        idUsuario,
        idVoucher: voucherSelecionado.idVoucher,
      });

      setMensagemCompra("Voucher resgatado com sucesso!");
      setVoucherSelecionado(null);

      onResgateConcluido();
    } catch (erro) {
      setErroCompra(
        erro instanceof Error
          ? erro.message
          : "Não foi possível concluir o resgate.",
      );
    } finally {
      setComprando(false);
    }
  }

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  return (
    <section className="w-full text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
          Catálogo de recompensas
        </h1>

        <p className="mt-3 text-sm text-white/80 sm:text-base">
          Troque seus pontos por benefícios e recompensas de mobilidade
          sustentável.
        </p>

        <div className="mt-5 rounded-xl bg-[#2d2d2d] p-4">
          <p className="text-sm text-white/70">Seu saldo disponível</p>
          <p className="mt-1 text-2xl font-bold text-[#6bdcd6]">
            {saldoPontos} pontos
          </p>
        </div>

        {mensagemCompra && (
          <p
            className="mt-4 rounded-lg bg-green-900/30 p-3 text-green-300"
            role="status"
          >
            {mensagemCompra}
          </p>
        )}

        {voucherSelecionado && (
          <div className="mt-6 rounded-xl border border-[#6bdcd6]/30 bg-[#2d2d2d] p-5">
            <h2 className="text-xl font-bold">Confirmar resgate</h2>

            <p className="mt-3 text-white/80">Você deseja resgatar:</p>

            <p className="mt-2 font-semibold">{voucherSelecionado.descricao}</p>

            <p className="mt-3 text-[#6bdcd6]">
              Custo: {voucherSelecionado.custoPontos} pontos
            </p>


{saldoPontos >= voucherSelecionado.custoPontos ? (
  <p className="mt-1 text-sm text-white/70">
    Saldo após o resgate:{" "}
    {saldoPontos - voucherSelecionado.custoPontos} pontos
  </p>
) : (
  <p className="mt-3 text-sm font-medium text-red-300" role="alert">
    Você precisa de mais{" "}
    {voucherSelecionado.custoPontos - saldoPontos} pontos
    para resgatar esta recompensa.
  </p>
)}


            {erroCompra && (
              <p className="mt-3 text-sm text-red-300" role="alert">
                {erroCompra}
              </p>
            )}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={confirmarResgate}
                disabled={
                  comprando || saldoPontos < voucherSelecionado.custoPontos
                }
                className="rounded-lg bg-[#1193a0] px-5 py-3 font-semibold hover:bg-[#2db7ba] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {comprando ? "Processando..." : "Confirmar resgate"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setVoucherSelecionado(null);
                  setErroCompra("");
                }}
                disabled={comprando}
                className="rounded-lg bg-white/10 px-5 py-3 font-semibold hover:bg-white/20 disabled:opacity-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {carregando && (
          <p className="py-12 text-center">
            Carregando catálogo de recompensas...
          </p>
        )}

        {!carregando && erro && (
          <div className="mt-8 rounded-xl bg-[#2d2d2d] p-6 text-center">
            <p className="text-red-300">{erro}</p>

            <button
              type="button"
              onClick={() => setTentativa((valor) => valor + 1)}
              className="mt-4 rounded-lg bg-[#1193a0] px-5 py-2 font-semibold hover:bg-[#2db7ba]"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!carregando && !erro && vouchers.length === 0 && (
          <p className="mt-8 rounded-xl bg-[#2d2d2d] p-6 text-center text-white/80">
            Nenhuma recompensa disponível no momento.
          </p>
        )}

        {!carregando && !erro && vouchers.length > 0 && (
          <section className="mt-8">
            <p className="mb-5 text-sm text-white/70">
              {vouchers.length} recompensas disponíveis
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {vouchers.map((voucher) => (
                <article
                  key={voucher.idVoucher}
                  className="flex flex-col rounded-2xl bg-[#2d2d2d] p-5 shadow-lg"
                >
                  <div className="mb-4">
                    <span className="rounded-full bg-[#1193a0]/20 px-3 py-1 text-sm font-semibold text-[#6bdcd6]">
                      {tiposTransporte[voucher.tipoTransporte]}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold">{voucher.descricao}</h2>

                  <div className="mt-auto pt-6">
                    <p className="text-sm text-white/70">Valor do benefício</p>

                    <p className="mt-1 text-xl font-semibold">
                      {formatarMoeda(voucher.valorMonetario)}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                      <span className="text-sm text-white/70">
                        Custo em pontos
                      </span>

                      <span className="text-lg font-bold text-[#6bdcd6]">
                        {voucher.custoPontos} pts
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setVoucherSelecionado(voucher);
                        setErroCompra("");
                        setMensagemCompra("");
                      }}
                      className="mt-5 w-full rounded-lg bg-[#1193a0] px-4 py-3 font-semibold transition-colors hover:bg-[#2db7ba]"
                    >
                      Resgatar voucher
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
        
      </section>
    </section>
  );
}

export default CatalogoVouchers;
