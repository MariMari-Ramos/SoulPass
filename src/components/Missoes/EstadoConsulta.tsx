import { botaoMissao } from './consultaUtils';

export default function EstadoConsulta({ carregando, erro, vazio, tentarNovamente }: {
  carregando: boolean; erro: string; vazio?: boolean; tentarNovamente: () => void;
}) {
  if (carregando) return <p role="status" className="py-8 text-white/80">Carregando… O servidor pode levar cerca de 50 segundos para iniciar.</p>;
  if (erro) return <div role="alert" className="space-y-4 rounded-xl border border-red-300 p-5"><p>{erro}</p><button type="button" className={botaoMissao} onClick={tentarNovamente}>Tentar novamente</button></div>;
  if (vazio) return <p role="status" className="py-8 text-white/80">Nenhuma missão disponível no momento.</p>;
  return null;
}
