import { useEffect, useState } from 'react';
import { mensagemErro } from '../components/Missoes/consultaUtils';

// A função deve ser estável (service importado ou useCallback).
export function useConsulta<T>(consultar: () => Promise<T>, revisao: unknown = null) {
  const [tentativa, setTentativa] = useState(0);
  const [estado, setEstado] = useState<{ consulta: typeof consultar; tentativa: number; revisao: unknown; dados?: T; erro: string }>({ consulta: consultar, tentativa: -1, revisao, erro: '' });
  useEffect(() => {
    let atual = true;
    consultar().then(
      dados => { if (atual) setEstado({ consulta: consultar, tentativa, revisao, dados, erro: '' }); },
      erro => { if (atual) setEstado({ consulta: consultar, tentativa, revisao, erro: mensagemErro(erro) }); },
    );
    return () => { atual = false; };
  }, [consultar, tentativa, revisao]);
  const carregando = estado.consulta !== consultar || estado.tentativa !== tentativa || estado.revisao !== revisao;
  return { dados: carregando ? undefined : estado.dados, erro: carregando ? '' : estado.erro, carregando, recarregar: () => setTentativa(valor => valor + 1) };
}
