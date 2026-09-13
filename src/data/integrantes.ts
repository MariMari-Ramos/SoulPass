import circleUser from '../assets/icons/circle-user.png'

export interface Integrante {
  id: string
  nome: string
  foto: string
  rm: string
  turma: string
  github: string
  linkedin: string
}

// TODO: substituir pelos dados reais de cada integrante da equipe.
export const integrantes: Integrante[] = [
  {
    id: '1',
    nome: 'Integrante 1',
    foto: circleUser,
    rm: '000000',
    turma: '1TDSPF',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
  },
  {
    id: '2',
    nome: 'Gabriel Antonio Ferreira de Franca',
    foto: circleUser,
    rm: '573159',
    turma: '1TDSPF',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
  },
  {
    id: '3',
    nome: 'Integrante 3',
    foto: circleUser,
    rm: '000000',
    turma: '1TDSPF',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
  },
]
