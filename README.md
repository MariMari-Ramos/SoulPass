# SoulUp

## Descrição

O **SoulUp** é uma plataforma digital desenvolvida para incentivar a mobilidade urbana sustentável por meio da tecnologia.

A proposta busca estimular o uso de meios de transporte mais sustentáveis, como o transporte público, por meio de uma experiência digital simples, acessível e intuitiva.

O projeto foi desenvolvido como parte do **Challenge da FIAP**, pela turma **1TDSPF**, utilizando tecnologias modernas de desenvolvimento web.

---

## Tecnologias Utilizadas

### Front-End

- React
- TypeScript
- HTML5
- CSS3

### Bibliotecas e Ferramentas

- React Router DOM
- React Hook Form
- Tailwind CSS
- Vite
- ESLint

### Versionamento e Desenvolvimento

- Git
- GitHub
- Visual Studio Code

### Conceitos Aplicados

- Componentização
- Organização modular de arquivos
- Roteamento de páginas
- Manipulação do DOM por meio do React
- Formulários e validação
- Responsividade
- Reutilização de componentes
- Separação entre páginas, componentes, dados e layouts

---

## Funcionalidades

### Página Inicial

- Apresentação da plataforma SoulUp
- Introdução à proposta do projeto
- Navegação para as principais áreas do sistema

### Sobre

- Apresentação do projeto
- Explicação da proposta e finalidade da plataforma

### FAQ

- Perguntas frequentes sobre a plataforma
- Sistema de perguntas e respostas interativo

### Contato

- Formulário para contato
- Campos para preenchimento das informações do usuário

### Integrantes

- Apresentação dos integrantes da equipe
- Fotos dos integrantes
- Informações acadêmicas
- Acesso aos perfis de GitHub e LinkedIn
- Página individual de cada integrante

### Solução

A área de solução apresenta o fluxo principal da plataforma, contendo:

- Página de apresentação da solução
- Login
- Cadastro
- Feed
- Perfil do usuário

### Interface Responsiva

O projeto foi desenvolvido buscando uma boa experiência de navegação em diferentes tamanhos de tela:

- Desktop
- Tablet
- Mobile

---

## Estrutura de Pastas do Projeto

A estrutura do projeto foi organizada de forma modular, separando páginas, componentes reutilizáveis, layouts, rotas, dados e arquivos de recursos.

```text
SoulUp/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── assets/
│   │   ├── fotos-integrantes/
│   │   │   ├── caio.jpeg
│   │   │   ├── gabriel.jpeg
│   │   │   ├── mariana.jpeg
│   │   │   └── rodrigo.jpeg
│   │   │
│   │   ├── icons/
│   │   │   ├── circle-i.png
│   │   │   ├── circle-user.png
│   │   │   ├── home.png
│   │   │   ├── menu-burger.png
│   │   │   ├── phone-flip.png
│   │   │   ├── search.png
│   │   │   ├── settings.png
│   │   │   └── users-alt.png
│   │   │
│   │   └── images/
│   │       ├── mulhercelular-image.png
│   │       └── SoulUpLogo.png
│   │
│   ├── components/
│   │   ├── Atividade/
│   │   │   └── Atividade.tsx
│   │   ├── Card/
│   │   ├── CardIntegrante/
│   │   │   └── CardIntegrante.tsx
│   │   ├── FAQ/
│   │   │   └── PerguntaFAQ.tsx
│   │   ├── Footer/
│   │   │   └── Footer.tsx
│   │   ├── Header/
│   │   │   └── Header.tsx
│   │   ├── Home/
│   │   │   └── HeroSection.tsx
│   │   ├── Modal/
│   │   ├── Passo/
│   │   │   └── Passo.tsx
│   │   └── Sidebar/
│   │       └── Sidebar.tsx
│   │
│   ├── data/
│   │   └── integrantes.ts
│   │
│   ├── layouts/
│   │   └── MainLayout/
│   │       └── MainLayout.tsx
│   │
│   ├── pages/
│   │   ├── Contato/
│   │   │   └── Contato.tsx
│   │   ├── FAQ/
│   │   │   └── Faq.tsx
│   │   ├── Home.tsx
│   │   ├── Integrantes/
│   │   │   ├── Integrantes.tsx
│   │   │   └── IntegranteDetalhe.tsx
│   │   ├── Sobre/
│   │   │   └── Sobre.tsx
│   │   └── Solucao/
│   │       ├── Cadastro.tsx
│   │       ├── Feed.tsx
│   │       ├── Login.tsx
│   │       ├── Perfil.tsx
│   │       └── Solucao.tsx
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

### Organização das principais pastas

- **`src/assets/`**: reúne imagens, ícones e fotos utilizadas na interface.
- **`src/components/`**: contém componentes reutilizáveis da aplicação.
- **`src/data/`**: armazena dados utilizados pela aplicação, como as informações dos integrantes.
- **`src/layouts/`**: contém estruturas de layout utilizadas pelas páginas.
- **`src/pages/`**: reúne as páginas e funcionalidades principais do sistema.
- **`src/routes/`**: responsável pela configuração das rotas da aplicação.
- **`public/`**: contém arquivos públicos utilizados pelo projeto.
- **`package.json`**: apresenta as dependências e scripts utilizados no projeto.
- **`vite.config.ts`**: contém a configuração do Vite.

---

## Imagens e Ícones do Projeto

As imagens utilizadas no projeto estão armazenadas dentro da pasta `src/assets/`.

### Logo

![Logo SoulUp](./src/assets/images/SoulUpLogo.png)

---

### Ícones

Os ícones utilizados na interface estão armazenados em:

```text
src/assets/icons/
```

Principais ícones utilizados:

- `home.png` - Página inicial
- `users-alt.png` - Integrantes
- `settings.png` - Configurações
- `circle-user.png` - Perfil
- `search.png` - Busca
- `phone-flip.png` - Contato
- `menu-burger.png` - Menu
- `circle-i.png` - Informações

---

## Autores e Créditos

### Caio Marques da Silva

**RM:** 572760  
**Turma:** 1TDSPF

**GitHub:** [Caiomarqx](https://github.com/Caiomarqx)

**LinkedIn:** [Caio Marques da Silva](https://www.linkedin.com/in/caio-marques-739926396)

**Foto:**

![Caio Marques da Silva](./src/assets/fotos-integrantes/caio.jpeg)

---

### Gabriel Antonio Ferreira de Franca

**RM:** 573159  
**Turma:** 1TDSPF

**GitHub:** [AntonioGabrielFranca](https://github.com/AntonioGabrielFranca)

**LinkedIn:** [Gabriel Antonio Ferreira](https://www.linkedin.com/in/gabriel-antonio-ferreira-91b3123bb)

**Foto:**

![Gabriel Antonio Ferreira de Franca](./src/assets/fotos-integrantes/gabriel.jpeg)

---

### Mariana Ramos dos Santos

**RM:** 573686  
**Turma:** 1TDSPF

**GitHub:** [MariMari-Ramos](https://github.com/MariMari-Ramos)

**LinkedIn:** [Mariana Ramos dos Santos](https://www.linkedin.com/in/mariana-ramos-dos-santos861b582ba)

**Foto:**

![Mariana Ramos dos Santos](./src/assets/fotos-integrantes/mariana.jpeg)

---

### Rodrigo Terra Costa

**RM:** 571840  
**Turma:** 1TDSPF

**GitHub:** [rodrigo15511](https://github.com/rodrigo15511)

**LinkedIn:** [Rodrigo Terra Costa](https://www.linkedin.com/in/rodrigoterracosta)

**Foto:**

![Rodrigo Terra Costa](./src/assets/fotos-integrantes/rodrigo.jpeg)

---

## Repositório

O código-fonte do projeto está disponível no GitHub:

**GitHub:** [SoulUp](https://github.com/MariMari-Ramos/SoulPass)

---

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/MariMari-Ramos/SoulPass.git
```

### 2. Acessar a pasta do projeto

```bash
cd SoulPass
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Iniciar o projeto

```bash
npm run dev
```

Após iniciar o servidor de desenvolvimento, o Vite disponibilizará o endereço local para acessar a aplicação pelo navegador.

---

## Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev
```

Inicia o servidor de desenvolvimento do Vite.

### Build

```bash
npm run build
```

Realiza a compilação do projeto para produção.

### Lint

```bash
npm run lint
```

Executa a verificação de código utilizando ESLint.

### Preview

```bash
npm run preview
```

Executa uma pré-visualização da versão de produção.

---

## Considerações Finais

O SoulUp demonstra a aplicação de conceitos de desenvolvimento web moderno na criação de uma plataforma voltada à mobilidade urbana sustentável.

A utilização de React, TypeScript, componentes reutilizáveis e organização modular permite estruturar o projeto de forma mais organizada, facilitando sua manutenção e evolução.

O projeto foi desenvolvido para fins acadêmicos como parte das atividades da FIAP.

---

## Créditos

Projeto desenvolvido pela equipe da turma **1TDSPF** como parte do **FIAP Challenge**.

**SoulUp | Tecnologia, mobilidade e sustentabilidade.**