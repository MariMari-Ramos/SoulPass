import fotoCaio from '../assets/fotos-integrantes/caio.jpeg'
import fotoGabriel from '../assets/fotos-integrantes/gabriel.jpeg'
import fotoMariana from '../assets/fotos-integrantes/mariana.jpeg'
import fotoRodrigo from '../assets/fotos-integrantes/rodrigo.jpeg'

export interface Integrante {
  id: string
  nome: string
  foto: string
  rm: string
  turma: string
  github: string
  linkedin: string
}

export const integrantes: Integrante[] = [
  {
    id: '1',
    nome: 'Caio Marques da Silva',
    foto: fotoCaio,
    rm: '572760',
    turma: '1TDSPF',
    github: 'https://github.com/Caiomarqx',
    linkedin: 'https://www.linkedin.com/in/caio-marques-739926396',
  },
  {
    id: '2',
    nome: 'Gabriel Antonio Ferreira de Franca',
    foto: fotoGabriel,
    rm: '573159',
    turma: '1TDSPF',
    github: 'https://github.com/AntonioGabrielFranca',
    linkedin: 'https://www.linkedin.com/in/gabriel-antonio-ferreira-91b3123bb',
  },
  {
    id: '3',
    nome: 'Mariana Ramos dos Santos',
    foto: fotoMariana,
    rm: '573686',
    turma: '1TDSPF',
    github: 'https://github.com/MariMari-Ramos',
    linkedin: 'https://www.linkedin.com/in/mariana-ramos-dos-santos861b582ba',
  },
  {
    id: '4',
    nome: 'Rodrigo Terra Costa',
    foto: fotoRodrigo,
    rm: '571840',
    turma: '1TDSPF',
    github: 'https://github.com/rodrigo15511',
    linkedin: 'https://www.linkedin.com/in/rodrigoterracosta',
  },
]
