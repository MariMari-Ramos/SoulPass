export interface Nivel {
  idNivel: number;
  nomeNivel: string;
  nivelOrdem: number;
  pontosXpNecessarios: number;
  descricao: string;
}

export interface Usuario {
  idUsuario: number;
  nome: string;
  cpf: string;
  email: string;
  saldoPontos: number;
  pontosXp: number;
  nivel: Nivel;
  dataCadastro: string;
  ativo: boolean;
}


export type TipoMissao =
  | "TRANSPORTE_PUBLICO"
  | "CAMINHADA"
  | "BICICLETA"
  | "DESAFIO_SEMANAL"
  | "DESAFIO_COLETIVO";

export interface Missao {
  idMissao: number;
  tituloMissao: string;
  tipoMissao: TipoMissao;
  descricao: string;
  pontoBase: number;
  ativa: boolean;
}

export type MetodoValidacao =
  | "CHECKIN"
  | "QRCODE"
  | "CODIGO";

export type StatusAcao =
  | "PENDENTE"
  | "APROVADO"
  | "REJEITADO";

export interface AcaoRealizada {
  idAcao: number;
  idUsuario: number;
  idMissao: number;
  metodoValidacao: MetodoValidacao;
  codigoValidacao: string;
  dataConclusao: string;
  statusAprovacao: StatusAcao;
  pontosConquistados: number;
}


export type TipoTransporte =
  | "ONIBUS"
  | "METRO"
  | "TREM"
  | "BICICLETA"
  | "APLICATIVO";

export interface Voucher {
  idVoucher: number;
  tipoTransporte: TipoTransporte;
  custoPontos: number;
  valorMonetario: number;
  descricao: string;
}

export type StatusVoucher =
  | "DISPONIVEL"
  | "UTILIZADO"
  | "EXPIRADO";

export interface Resgate {
  idResgate: number;
  idUsuario: number;
  idVoucher: number;
  idAcao: number;
  codigoGerado: string;
  dataResgate: string;
  dataValidade: string;
  statusVoucher: StatusVoucher;
}

export interface ErroApi {
  mensagem: string;
}
