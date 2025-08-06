<div align="center">
  <img src="front-end/img/logo-readme.gif" width="200" height="200">
</div>

# AyudaKI - Plataforma de Doações e Eventos

AyudaKI é uma plataforma para conectar doadores a campanhas de arrecadação e eventos sociais, gerenciada por ONGs e administradores. O sistema permite que usuários normais façam doações e que ONGs criem e gerenciem suas próprias campanhas e eventos.

---

## Índice

- [Estrutura de Pastas](#estrutura-de-pastas)
- [Páginas e Funcionalidades](#páginas-e-funcionalidades)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

---

## Estrutura de Pastas

O projeto segue uma estrutura de pastas organizada para separar o código de estrutura front-end, estrutura de simulção do sistema e estrutura provisora do back-end.

```
AyudaKI [GITHUB]/
├── back-end/               # Contém a simulação do sistema com back (o atual não é completo nesse nivel)
│   ├── cadastro-login.py
│   ├── config-perfil.py
│   ├── contato.py
│   └── sistema.py
├── front-end/              
│   ├── css/                
│   │   ├── cadastro.css
│   │   ├── campanha_detalhe.css
│   │   ├── campanhas.css
│   │   ├── contato.css
│   │   ├── criar_campanha.css
│   │   ├── dark-mode.css
│   │   ├── login.css
│   │   ├── perfil.css
│   │   └── style.css
│   ├── html/               # Todas as páginas HTML do sistema
│   │   ├── cadastro.html
│   │   ├── campanha_detalhe.html
│   │   ├── contato.html
│   │   ├── campanhas_ong.html
│   │   ├── criar_campanha.html
│   │   ├── dashboard_admin.html
│   │   ├── eventos.html
│   │   ├── login.html
│   │   ├── perfil.html
│   │   └── ver_campanhas.html
│   ├── img/                
│   │   ├── background.mp4
│   │   ├── default-profile.png
│   │   ├── icon-cesta-basica.png
│   │   ├── icon-criancas.png
│   │   ├── icon-pets.png
│   │   ├── icon-roupas.png
│   │   └── logo.png
│   └── js/                 # Sistemas de conexão, pagamento, tema dark e etc
│       ├── auth.js
│       ├── db.js
│       └── script.js
├── index.html              
└── README.md
```
---

## Páginas e Funcionalidades

O projeto é composto por diversas páginas, cada uma com uma função específica dentro do sistema. Você pode conferir o sistema de banco de dados nesse [link](https://app.dynobird.com/?action=open&id=436751bf-5006-4b72-9c2c-87471fe1d06f)

### `index.html` (Página Inicial)
- **Descrição:** Ponto de entrada da aplicação. Serve como a página de boas-vindas e introdução ao projeto.
- **Funcionalidade:** Exibe uma visão geral da plataforma e links para as principais seções.

### `html/ver_campanhas.html` (Ver Campanhas)
- **Descrição:** Lista todas as campanhas de doação ativas na plataforma.
- **Funcionalidade:** Permite que os usuários naveguem por todas as campanhas disponíveis e selecionem uma para ver os detalhes.

### `html/campanha_detalhe.html` (Detalhes da Campanha)
- **Descrição:** Exibe informações detalhadas de uma campanha específica.
- **Funcionalidade:**
    - Mostra título, descrição, criador e a barra de progresso.
    - Permite que usuários logados façam doações.
    - O formulário de doação gera um QR Code Pix, simulando um processo de pagamento.

### `html/eventos.html` (Eventos)
- **Descrição:** Apresenta uma lista de eventos organizados pelas ONGs.
- **Funcionalidade:** Permite visualizar eventos sociais, mutirões, feiras de adoção, etc.

### `html/login.html` e `html/cadastro.html`
- **Descrição:** Páginas para autenticação e registro de novos usuários.
- **Funcionalidade:** Gerenciam o acesso ao sistema, distinguindo entre usuários normais, ONGs e administradores.

### `html/campanhas_ong.html` (Minhas Campanhas)
- **Descrição:** Dashboard exclusivo para ONGs.
- **Funcionalidade:** Permite que uma ONG visualize, edite e gerencie todas as campanhas que ela mesma criou.

### `html/criar_campanha.html` (Criar Campanha)
- **Descrição:** Formulário para criação de novas campanhas.
- **Funcionalidade:** Disponível apenas para ONGs, permite que elas definam os detalhes e a meta de uma nova campanha de arrecadação.

### `html/dashboard_admin.html` (Dashboard Admin)
- **Descrição:** Dashboard de gerenciamento para administradores.
- **Funcionalidade:** Oferece uma visão geral do sistema e ferramentas para gerenciar usuários, campanhas e eventos.

---

## Funcionalidades Principais

- **Sistema de Usuários:** Diferenciação de perfis (normal, ONG, admin).
- **Gestão de Campanhas:** ONGs podem criar e gerenciar campanhas de arrecadação.
- **Doações Interativas:** Usuários podem doar para campanhas e visualizar o progresso.
- **Simulação de Pagamento:** Geração de QR Code Pix para simular o processo de doação.
- **Modo Claro/Escuro:** Botão para alternar entre temas de cor, melhorando a acessibilidade.
- **Navegação Dinâmica:** O menu de navegação se adapta ao tipo de usuário logado.

---

## Tecnologias Utilizadas
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PYTHON](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

- **HTML5:** Estrutura e semântica das páginas.
- **CSS3:** Estilização, layout e design.
- **JavaScript:** Lógica de negócios, manipulação do DOM e interatividade.
- **Python:** Simulação da lógica do sistema se tivesse back-end.
- **`db.js`:** Simulação de um banco de dados local para persistência de dados no navegador.

---

<div align="center">
  <img src="front-end/img/cat.gif" style="border-radius: 20px;" width="200" height="200">
</div>

## Agradecimentos...

- Meu caro amigo Daniel que parasitou meu trabalho e me ajudou na parte mais dificil... a mais impossivel de todas... o gif do readME. 👌

---
