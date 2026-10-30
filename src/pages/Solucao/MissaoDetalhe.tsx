import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { buscarMissaoPorId } from '../../services/missaoService';
import { useConsulta } from '../../hooks/useConsulta';
import EstadoConsulta from '../../components/Missoes/EstadoConsulta';
import RegistroAtividade from '../../components/Missoes/RegistroAtividade';
import { categorias } from '../../components/Missoes/categorias';

export default function MissaoDetalhe() {
  const { id } = useParams();
  // Remonta o conteúdo ao trocar de missão para descartar formulários antigos.
  return <ConteudoMissao key={id} id={id ?? ''} />;
}

function ConteudoMissao({ id }: { id: string }) {
  const consultar = useCallback(() => {
    const numero = Number(id);
    if (!/^\d+$/.test(id) || !Number.isSafeInteger(numero) || numero <= 0) {
      return Promise.reject(new Error('Identificador de missão inválido. Volte ao Feed e escolha uma missão.'));
    }
    return buscarMissaoPorId(numero);
  }, [id]);
  const { dados: missao, carregando, erro, recarregar } = useConsulta(consultar);
  return <section className="mx-auto max-w-4xl space-y-6 px-6 py-10 text-white">
    <Link className="inline-block py-2 text-[#6bdcd6] underline focus-visible:outline-2" to="/solucao/feed">Voltar às missões</Link>
    <EstadoConsulta carregando={carregando} erro={erro} tentarNovamente={recarregar} />
    {missao && <>
      <article className="space-y-4 rounded-2xl bg-[#2d2d2d] p-6 md:p-8">
        <p className="text-[#6bdcd6]">{categorias[missao.tipoMissao] ?? missao.tipoMissao}</p>
        <h1 className="break-words text-3xl font-bold">{missao.tituloMissao}</h1>
        <p className="whitespace-pre-wrap break-words text-white/80">{missao.descricao}</p>
        <p className="font-bold">{missao.pontoBase} pontos após aprovação</p>
        {!missao.ativa && <p role="status">Esta missão não está ativa para novos registros.</p>}
      </article>
      <RegistroAtividade missao={missao} />
    </>}
  </section>;
}
