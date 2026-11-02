
import { useEffect, useState } from "react";

import type { Usuario, AcaoRealizada } from "../../types/api";
import { buscarUsuarioPorId } from "../../services/usuarioService";
import { listarAcoesPorUsuario } from "../../services/acaoService";

interface PerfilProps {
  onFechar: () => void;
}

function Perfil({ onFechar }: PerfilProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [acoes, setAcoes] = useState<AcaoRealizada[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // ID temporário para os testes da API
  const idUsuario = 2;

  useEffect(() => {
    async function carregarPerfil() {
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
            : "Não foi possível carregar o perfil."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5"
      onClick={onFechar}
    >
      <section
        className="relative max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#2d2d2d] p-4 text-white shadow-xl sm:p-6"
        onClick={(evento) => evento.stopPropagation()}
      >
        <button
          type="button"
          onClick={onFechar}
          aria-label="Fechar perfil"
          className="absolute right-4 top-3 text-2xl text-white hover:text-[#6bdcd6]"
        >
          ×
        </button>

        <h1 className="mb-6 pr-8 text-2xl font-bold">
          Meu perfil
        </h1>

        {carregando && (
          <p className="py-8 text-center">
            Carregando informações do perfil...
          </p>
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

        {!carregando && !erro && usuario && (
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
                          `${acao.dataConclusao}T00:00:00`
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
      </section>
    </div>
  );
}

export default Perfil;
