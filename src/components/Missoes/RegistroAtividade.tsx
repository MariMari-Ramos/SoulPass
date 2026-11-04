
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import HistoricoMissao from './HistoricoMissao';
import type {
  AcaoRealizada,
  MetodoValidacao,
  Missao,
} from '../../types/api';
import { useAuth } from '../../contexts/AuthContext';
import { registrarAcao } from '../../services/acaoService';
import {
  botaoMissao,
  campoMissao,
  mensagemErro,
} from './consultaUtils';

export default function RegistroAtividade({
  missao,
}: {
  missao: Missao;
}) {
  const { usuario, carregando } = useAuth();
  const [acao, setAcao] = useState<AcaoRealizada | null>(null);
  const [erro, setErro] = useState('');
  const bloqueio = useRef(false);

  const registro = useForm<{
    metodoValidacao: MetodoValidacao;
  }>({
    defaultValues: { metodoValidacao: 'CHECKIN' },
  });

  const acaoAtual =
    acao?.idUsuario === usuario?.idUsuario &&
    acao?.idMissao === missao.idMissao
      ? acao
      : null;

  async function registrar({
    metodoValidacao,
  }: {
    metodoValidacao: MetodoValidacao;
  }) {
    if (
      !usuario ||
      !usuario.ativo ||
      bloqueio.current ||
      !missao.ativa
    ) {
      return;
    }

    bloqueio.current = true;
    setErro('');

    try {
      const novaAcao = await registrarAcao({
        idUsuario: usuario.idUsuario,
        idMissao: missao.idMissao,
        metodoValidacao,
      });

      setAcao(novaAcao);
    } catch (erro) {
      setErro(mensagemErro(erro));
    } finally {
      bloqueio.current = false;
    }
  }

  return (
    <section
      className="space-y-5 rounded-2xl bg-[#2d2d2d] p-6 md:p-8"
      aria-labelledby="registro-titulo"
    >
      <h2 id="registro-titulo" className="text-2xl font-bold">
        Registrar atividade
      </h2>

      {carregando ? (
        <p role="status">Verificando sua sessão...</p>
      ) : !usuario ? (
        <div className="space-y-3">
          <p className="text-white/80">
            Entre na sua conta para registrar atividades
            e conquistar pontos.
          </p>
          <Link className={botaoMissao} to="/solucao/login">
            Fazer login
          </Link>
        </div>
      ) : !usuario.ativo ? (
        <p role="alert" className="text-red-300">
          Sua conta está inativa e não pode registrar atividades.
        </p>
      ) : (
        <>
          <p role="status" className="text-white/80">
            Usuário conectado: <strong>{usuario.nome}</strong>
          </p>

          {missao.ativa && !acaoAtual && (
            <form
              onSubmit={(evento) => {
                void registro.handleSubmit(registrar)(evento);
              }}
              className="space-y-4"
            >
              <label htmlFor="metodo" className="block font-semibold">
                Método de validação
              </label>

              <select
                id="metodo"
                className={campoMissao}
                {...registro.register('metodoValidacao', {
                  required: true,
                })}
              >
                <option value="CHECKIN">Check-in</option>
                <option value="QRCODE">QR Code</option>
                <option value="CODIGO">Código</option>
              </select>

              <p className="text-sm text-white/80">
                Os pontos serão concedidos somente após
                a aprovação da atividade pela API.
              </p>

              <button
                className={botaoMissao}
                disabled={registro.formState.isSubmitting}
              >
                {registro.formState.isSubmitting
                  ? 'Registrando…'
                  : 'Registrar atividade'}
              </button>
            </form>
          )}

          {acaoAtual && (
            <button
              type="button"
              className={botaoMissao}
              onClick={() => setAcao(null)}
            >
              Registrar outra atividade
            </button>
          )}

          <HistoricoMissao
            key={usuario.idUsuario}
            idUsuario={usuario.idUsuario}
            idMissao={missao.idMissao}
            novaAcao={acaoAtual}
          />
        </>
      )}

      {erro && (
        <p role="alert" className="text-red-300">
          {erro}
        </p>
      )}
    </section>
  );
}
