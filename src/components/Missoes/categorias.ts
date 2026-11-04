import type { TipoMissao } from '../../types/api';
export const categorias: Record<TipoMissao, string> = {
  TRANSPORTE_PUBLICO: 'Transporte público', CAMINHADA: 'Caminhada', BICICLETA: 'Bicicleta',
  DESAFIO_SEMANAL: 'Desafio semanal', DESAFIO_COLETIVO: 'Desafio coletivo',
};
