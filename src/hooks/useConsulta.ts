import { useEffect, useState } from 'react';
import { mensagemErro } from '../components/Missoes/EstadoConsulta';

// A função deve ser estável (service importado ou useCallback).
export function useConsulta<T>(consultar: () => Promise<T>) {
  const [tentativa, setTentativa] = useState(0);
  const [estado, setEstado] = useState<{ consulta: typeof consultar; tentativa: number; dados?: T; erro: string }>({ consulta: consultar, tentativa: -1, erro: '' });
  useEffect(() => {
    let atual = true;
    consultar().then(
      dados => { if (atual) setEstado({ consulta: consultar, tentativa, dados, erro: '' }); },
      erro => { if (atual) setEstado({ consulta: consultar, tentativa, erro: mensagemErro(erro) }); },
    );
    return () => { atual = false; };
  }, [consultar, tentativa]);
  const carregando = estado.consulta !== consultar || estado.tentativa !== tentativa;
  return { dados: carregando ? undefined : estado.dados, erro: carregando ? '' : estado.erro, carregando, recarregar: () => setTentativa(valor => valor + 1) };
}
