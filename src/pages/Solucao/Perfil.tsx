import { useEffect, useState } from "react";

import type { Usuario, AcaoRealizada } from "../../types/api";
import { buscarUsuarioPorId } from "../../services/usuarioService";
import { listarAcoesPorUsuario } from "../../services/acaoService";
import CatalogoVouchers from "./CatalogoVouchers";
import MeusResgates from "./MeusResgates";
import { useAuth } from "../../contexts/AuthContext";
interface PerfilProps {
  onFechar: () => void;
}

type SecaoPerfil = "perfil" | "recompensas" | "resgates";

function Perfil({ onFechar }: PerfilProps) {
  const [secaoAtiva, setSecaoAtiva] = useState<SecaoPerfil>("perfil");
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [acoes, setAcoes] = useState<AcaoRealizada[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const { usuario: usuarioAutenticado } = useAuth();
  const idUsuario = usuarioAutenticado?.idUsuario;

  useEffect(() => {
    async function carregarPerfil() {
      if (!idUsuario) {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro("");

        const [dadosUsuario, historico] = await Promise.all([
          buscarUsuarioPorId(idUsuario),
          listarAcoesPorUsuario(idUsuario),
        ]);

        setUsuario(dadosUsuario);
        setAcoes(historico);
      } catch (erro) {
        setErro(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar o perfil.",
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, [idUsuario]);

  const secoes = [
    { id: "perfil", nome: "Meu perfil" },
    { id: "recompensas", nome: "Recompensas" },
    { id: "resgates", nome: "Resgates" },
  ] as const;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5"
      onClick={onFechar}
    >
      <section
        className="flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#2d2d2d] text-white shadow-xl"
        onClick={(evento) => evento.stopPropagation()}
      >

        <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
          <h1 className="pr-3 text-xl font-bold sm:text-2xl">Minha conta</h1>

          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar modal"
            className="shrink-0 rounded-lg px-3 py-1 text-2xl hover:bg-white/10 hover:text-[#6bdcd6]"
          >
            ×
          </button>
        </header>

        <nav
          aria-label="Seções da conta"
          className="grid grid-cols-3 gap-1 border-b border-white/10 p-2 sm:gap-2 sm:p-3"
        >
          {secoes.map((secao) => (
            <button
              key={secao.id}
              type="button"
              onClick={() => setSecaoAtiva(secao.id)}
              aria-pressed={secaoAtiva === secao.id}
              className={`rounded-lg px-1 py-3 text-xs font-semibold transition-colors sm:px-3 sm:text-sm ${
                secaoAtiva === secao.id
                  ? "bg-[#1193a0] text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {secao.nome}
            </button>
          ))}
        </nav>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          {carregando && secaoAtiva === "perfil" && (
            <>
              <h2 className="mb-5 text-xl font-bold">Meu perfil</h2>
              <p className="py-8 text-center">
                Carregando informações do perfil...
              </p>
            </>
          )}

          {!carregando && erro && (
            <div className="rounded-lg bg-red-900/30 p-4 text-red-200">
              <p>{erro}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-3 underline"
              >
                Recarregar página
              </button>
            </div>
          )}

          {!carregando && !erro && usuario && secaoAtiva === "perfil" && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-[#4d4d4d] p-4">
                  <p className="text-sm text-gray-300">Nome</p>
                  <p className="mt-1 wrap-break-word text-lg font-semibold">
                    {usuario.nome}
                  </p>
                </div>

                <div className="rounded-xl bg-[#4d4d4d] p-4">
                  <p className="text-sm text-gray-300">E-mail</p>
                  <p className="mt-1 break-all font-semibold">
                    {usuario.email}
                  </p>
                </div>

                <div className="rounded-xl bg-[#4d4d4d] p-4">
                  <p className="text-sm text-gray-300">Saldo de pontos</p>
                  <p className="mt-1 text-2xl font-bold text-[#6bdcd6]">
                    {usuario.saldoPontos}
                  </p>
                </div>

                <div className="rounded-xl bg-[#4d4d4d] p-4">
                  <p className="text-sm text-gray-300">Experiência (XP)</p>
                  <p className="mt-1 text-2xl font-bold text-[#6bdcd6]">
                    {usuario.pontosXp}
                  </p>
                </div>

                <div className="rounded-xl bg-[#4d4d4d] p-4 sm:col-span-2">
                  <p className="text-sm text-gray-300">Nível atual</p>
                  <p className="mt-1 text-xl font-semibold">
                    {usuario.nivel.nomeNivel}
                  </p>
                </div>
              </div>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-bold">
                  Histórico de atividades
                </h2>

                {acoes.length === 0 ? (
                  <p className="rounded-lg bg-[#4d4d4d] p-4 text-gray-300">
                    Você ainda não possui atividades registradas.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {acoes.map((acao) => (
                      <article
                        key={acao.idAcao}
                        className="rounded-xl bg-[#4d4d4d] p-4"
                      >
                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
                          <div>
                            <p className="font-semibold">
                              Atividade #{acao.idAcao}
                            </p>
                            <p className="text-sm text-gray-300">
                              Missão #{acao.idMissao}
                            </p>
                          </div>

                          <span className="text-sm font-semibold">
                            {acao.statusAprovacao}
                          </span>
                        </div>

                        <p className="mt-2 text-sm text-gray-300">
                          Data:{" "}
                          {new Date(
                            `${acao.dataConclusao}T00:00:00`,
                          ).toLocaleDateString("pt-BR")}
                        </p>

                        {acao.statusAprovacao === "APROVADO" && (
                          <p className="mt-1 text-sm text-[#6bdcd6]">
                            +{acao.pontosConquistados} pontos
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          {secaoAtiva === "recompensas" && idUsuario &&(
            <CatalogoVouchers
              idUsuario={idUsuario}
              saldoPontos={usuario?.saldoPontos ?? 0}
              onResgateConcluido={() => {
                buscarUsuarioPorId(idUsuario)
                  .then(setUsuario)
                  .catch(console.error);
              }}
            />
          )}

          {secaoAtiva === "resgates" && idUsuario &&(
            <MeusResgates
              idUsuario={idUsuario}
              onResgateCancelado={async () => {
                const dadosUsuario = await buscarUsuarioPorId(idUsuario);
                setUsuario(dadosUsuario);
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default Perfil;
