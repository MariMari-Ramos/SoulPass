
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useConsulta } from '../../hooks/useConsulta';
import { buscarUsuarioPorId } from '../../services/usuarioService';
import CatalogoVouchers from './CatalogoVouchers';

export default function PaginaVouchers() {
  const { usuario, carregando: carregandoSessao } = useAuth();
  const idUsuario = usuario?.idUsuario ?? null;
  const [resgateConcluido, setResgateConcluido] = useState(false);

  const consultarUsuario = useCallback(() => {
    if (idUsuario === null) {
      return Promise.resolve(null);
    }

    return buscarUsuarioPorId(idUsuario);
  }, [idUsuario]);

  const {
    dados: usuarioAtualizado,
    carregando: carregandoDados,
    erro,
    recarregar,
  } = useConsulta(consultarUsuario);

  return (
    <main className="min-h-[70vh] bg-[#202020] px-6 py-10 text-white">
      {carregandoSessao || carregandoDados ? (
        <p role="status">Carregando suas informações...</p>
      ) : !idUsuario ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">
            Recompensas SoulPass
          </h1>
          <p>Entre na sua conta para resgatar recompensas.</p>
          <Link
            to="/solucao/login"
            className="inline-block rounded-lg bg-[#1193a0] px-5 py-3 font-semibold"
          >
            Fazer login
          </Link>
        </div>
      ) : erro ? (
        <div className="space-y-4">
          <p role="alert" className="text-red-300">
            {erro}
          </p>
          <button
            type="button"
            onClick={recarregar}
            className="rounded-lg bg-[#1193a0] px-5 py-3"
          >
            Tentar novamente
          </button>
        </div>
      ) : !usuarioAtualizado || !usuarioAtualizado.ativo ? (
        <p role="alert">
          Não foi possível acessar as recompensas desta conta.
        </p>
      ) : (
        <div className="mx-auto max-w-6xl">
          {resgateConcluido && (
            <p
              role="status"
              className="mb-5 rounded-lg bg-green-900/30 p-4 text-green-300"
            >
              Resgate concluído! Seu saldo foi atualizado.
            </p>
          )}

          <CatalogoVouchers
            idUsuario={usuarioAtualizado.idUsuario}
            saldoPontos={usuarioAtualizado.saldoPontos}
            onResgateConcluido={() => {
              setResgateConcluido(true);
              recarregar();
            }}
          />
        </div>
      )}
    </main>
  );
}
