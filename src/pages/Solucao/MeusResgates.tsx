import { useEffect, useState } from "react";

import type { Resgate, Voucher } from "../../types/api";
import {
  listarResgatesPorUsuario,
  cancelarResgate,
} from "../../services/resgateService";
import { listarVouchers } from "../../services/voucherService";

interface MeusResgatesProps {
  idUsuario: number;
  onResgateCancelado: () => Promise<void>;
}

function MeusResgates({ idUsuario, onResgateCancelado }: MeusResgatesProps) {
  const [resgates, setResgates] = useState<Resgate[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);
  const [mensagemCopiado, setMensagemCopiado] = useState("");
  const [erroCopia, setErroCopia] = useState("");
  const [resgateSelecionado, setResgateSelecionado] = useState<Resgate | null>(
    null,
  );
  const [cancelando, setCancelando] = useState(false);
  const [erroCancelamento, setErroCancelamento] = useState("");
  const [mensagemCancelamento, setMensagemCancelamento] = useState("");

  useEffect(() => {
    async function carregarResgates() {
      try {
        setCarregando(true);
        setErro("");

        const [dadosResgates, dadosVouchers] = await Promise.all([
          listarResgatesPorUsuario(idUsuario),
          listarVouchers(),
        ]);

        setResgates(dadosResgates);
        setVouchers(dadosVouchers);
      } catch (erro) {
        setErro(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar seus resgates.",
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarResgates();
  }, [idUsuario, tentativa]);

  async function copiarCodigo(codigo: string) {
    try {
      setErroCopia("");
      setMensagemCopiado("");

      await navigator.clipboard.writeText(codigo);
      setMensagemCopiado(codigo);
    } catch {
      setMensagemCopiado("");
      setErroCopia("Não foi possível copiar o código.");
    }
  }

  async function confirmarCancelamento() {
    if (!resgateSelecionado) return;

    try {
      setCancelando(true);
      setErroCancelamento("");
      setMensagemCancelamento("");

      await cancelarResgate(resgateSelecionado.idResgate);

      setResgateSelecionado(null);
      setMensagemCancelamento("Resgate cancelado com sucesso!");

      // Atualiza a lista de resgates
      setTentativa((valor) => valor + 1);

      // Atualiza os dados do usuário e o saldo de pontos
      await onResgateCancelado();
    } catch (erro) {
      setErroCancelamento(
        erro instanceof Error
          ? erro.message
          : "Não foi possível cancelar o resgate.",
      );
    } finally {
      setCancelando(false);
    }
  }

  const formatarMoeda = (valor: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);

  const formatarData = (data: string) =>
    new Date(data.includes("T") ? data : `${data}T00:00:00`).toLocaleDateString(
      "pt-BR",
    );

  const statusLegivel: Record<Resgate["statusVoucher"], string> = {
    DISPONIVEL: "Disponível",
    UTILIZADO: "Utilizado",
    EXPIRADO: "Expirado",
  };

  return (
    <section className="w-full">
      <h2 className="mb-2 text-xl font-bold">Meus resgates</h2>

      <p className="mb-6 text-sm text-white/70">
        Consulte seus benefícios adquiridos e os respectivos códigos.
      </p>

      {mensagemCancelamento && (
        <p className="mb-4 rounded-lg bg-green-900/30 p-3 text-sm text-green-300">
          {mensagemCancelamento}
        </p>
      )}

      {resgateSelecionado && (
        <div className="mb-6 rounded-xl border border-white/20 bg-[#2d2d2d] p-4">
          <h3 className="font-bold">Confirmar cancelamento</h3>

          <p className="mt-2 text-sm text-white/70">
            Tem certeza de que deseja cancelar este resgate? Os pontos
            utilizados serão devolvidos ao seu saldo.
          </p>

          {erroCancelamento && (
            <p className="mt-3 text-sm text-red-300" role="alert">
              {erroCancelamento}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={confirmarCancelamento}
              disabled={cancelando}
              className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold hover:bg-red-600 disabled:opacity-50"
            >
              {cancelando ? "Cancelando..." : "Sim, cancelar"}
            </button>

            <button
              type="button"
              onClick={() => {
                setResgateSelecionado(null);
                setErroCancelamento("");
              }}
              disabled={cancelando}
              className="rounded-lg bg-[#4d4d4d] px-4 py-2 text-sm font-semibold hover:bg-[#5d5d5d] disabled:opacity-50"
            >
              Voltar
            </button>
          </div>
        </div>
      )}

      {carregando && (
        <p className="py-8 text-center">Carregando seus resgates...</p>
      )}

      {!carregando && erro && (
        <div className="rounded-xl bg-red-900/30 p-4 text-red-200">
          <p>{erro}</p>

          <button
            type="button"
            onClick={() => setTentativa((valor) => valor + 1)}
            className="mt-3 underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erro && resgates.length === 0 && (
        <p className="rounded-xl bg-[#4d4d4d] p-5 text-center text-white/80">
          Você ainda não realizou nenhum resgate.
        </p>
      )}

      {!carregando && !erro && resgates.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {resgates.map((resgate) => {
            const voucher = vouchers.find(
              (item) => item.idVoucher === resgate.idVoucher,
            );

            return (
              <article
                key={resgate.idResgate}
                className="rounded-xl bg-[#4d4d4d] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold">
                    {voucher?.descricao ?? `Voucher #${resgate.idVoucher}`}
                  </h3>

                  <span className="rounded-full bg-[#2d2d2d] px-3 py-1 text-xs font-semibold">
                    {statusLegivel[resgate.statusVoucher]}
                  </span>
                </div>

                {voucher && (
                  <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm">
                    <span>
                      Benefício: {formatarMoeda(voucher.valorMonetario)}
                    </span>

                    <span className="font-semibold text-[#6bdcd6]">
                      {voucher.custoPontos} pontos
                    </span>
                  </div>
                )}

                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <span className="text-white/60">Código:</span>{" "}
                    <strong className="break-all">
                      {resgate.codigoGerado}
                    </strong>
                  </p>

                  <button
                    type="button"
                    onClick={() => copiarCodigo(resgate.codigoGerado)}
                    className="mt-2 rounded-lg bg-[#1193a0] px-4 py-2 text-sm font-semibold hover:bg-[#2db7ba]"
                  >
                    Copiar código
                  </button>

                  {mensagemCopiado === resgate.codigoGerado && (
                    <p className="text-sm text-green-300" role="status">
                      Código copiado!
                    </p>
                  )}

                  {erroCopia && (
                    <p className="text-sm text-red-300" role="alert">
                      {erroCopia}
                    </p>
                  )}

                  <p>
                    <span className="text-white/60">Data do resgate:</span>{" "}
                    {formatarData(resgate.dataResgate)}
                  </p>

                  <p>
                    <span className="text-white/60">Validade:</span>{" "}
                    {formatarData(resgate.dataValidade)}
                  </p>
                  {resgate.statusVoucher === "DISPONIVEL" && (
                    <button
                      type="button"
                      onClick={() => {
                        setResgateSelecionado(resgate);
                        setErroCancelamento("");
                        setMensagemCancelamento("");
                      }}
                      className="mt-3 rounded-lg border border-red-400 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-900/30"
                    >
                      Cancelar resgate
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default MeusResgates;
