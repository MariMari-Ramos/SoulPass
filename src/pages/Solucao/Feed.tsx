import { Link } from 'react-router-dom';
import { listarMissoesAtivas } from '../../services/missaoService';
import { useConsulta } from '../../hooks/useConsulta';
import EstadoConsulta, { botaoMissao } from '../../components/Missoes/EstadoConsulta';
import { categorias } from '../../components/Missoes/categorias';

export default function Feed() {
  const { dados: missoes, carregando, erro, recarregar } = useConsulta(listarMissoesAtivas);
  return <section className="mx-auto max-w-5xl px-6 py-10 text-white">
    <h1 className="text-3xl font-bold md:text-4xl">Missões sustentáveis</h1>
    <p className="mb-8 mt-3 text-white/80">Escolha uma missão, registre sua atividade e valide para conquistar pontos.</p>
    <EstadoConsulta carregando={carregando} erro={erro} vazio={missoes?.length === 0} tentarNovamente={recarregar} />
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {missoes?.map(missao => <article key={missao.idMissao} className="flex min-w-0 flex-col rounded-2xl bg-[#2d2d2d] p-6">
        <p className="text-sm text-[#6bdcd6]">{categorias[missao.tipoMissao] ?? missao.tipoMissao}</p>
        <h2 className="mt-3 break-words text-xl font-bold">{missao.tituloMissao}</h2>
        <p className="mt-3 flex-1 break-words text-white/80">{missao.descricao}</p>
        <p className="my-5 font-semibold">{missao.pontoBase} pontos após aprovação</p>
        <Link className={botaoMissao} to={`/solucao/missoes/${missao.idMissao}`} aria-label={`Ver missão: ${missao.tituloMissao}`}>Ver missão</Link>
      </article>)}
    </div>
  </section>;
}
