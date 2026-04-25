# Alay Admin

Projeto feito para cadastro de produtos e controle de estoque.

O projeto faz ligação com mais um front em Next para uso do usuário final:
https://github.com/kaualacerda-dev/Alay-front

E compartilha o mesmo backend que o projeto em Next https://github.com/kaualacerda-dev/Alay-Backend. No ambiente local, a API está configurada para rodar em `http://localhost:3001`. Em produção, a API está configurada para usar `https://alay-backend.onrender.com`, porém o login em produção está privado, caso queira testar, entrar em contato.

- Link do projeto em Prod https://alay-admin.onrender.com

## Sobre o projeto

O Alay Admin é uma aplicação administrativa feita em Angular. A ideia principal é permitir que o administrador consiga gerenciar os produtos da loja, cadastrar novos itens e visualizar o estoque disponível.

Esse projeto funciona junto com outros dois pontos da aplicação:

- Frontend do usuário final em Next.js, usado para a experiência da loja.
- Backend compartilhado, responsável por autenticação, cadastro de produtos, estoque e comunicação com o banco de dados.

## Funcionalidades

- Login de administrador.
- Cadastro de produtos.
- Upload de imagem do produto.
- Seleção de categoria do produto.
- Controle de preço, SKU, descrição e quantidade em estoque.
- Visualização dos produtos cadastrados.
- Busca de produtos pelo nome.
- Exibição do preço formatado em real brasileiro.

## Tecnologias utilizadas

- Angular
- TypeScript
- RxJS
- Angular Forms
- Angular Router
- HttpClient
- Tailwind CSS

## Rotas principais

- `/login`: tela de login.
- `/home`: tela inicial após o login.
- `/cadastro-produtos`: tela para cadastrar produtos.
- `/estoque`: tela para visualizar e pesquisar produtos em estoque.

## Como rodar o projeto

Instale as dependências:

```bash
npm install
```

Rode o projeto em modo de desenvolvimento:

```bash
npm start
```

Depois, acesse no navegador:

```text
http://localhost:4200
```

## Build

Para gerar a versão de produção:

```bash
npm run build
```

O build será gerado na pasta `dist/admin_controll`.

## Testes

Para rodar os testes:

```bash
npm test
```

## Configuração da API

As URLs da API ficam nos arquivos de ambiente do Angular:

- `src/app/environments/environment.ts`: usado no desenvolvimento local.
- `src/app/environments/environment.production.ts`: usado no build de produção.

Exemplo local:

```ts
export const environment = {
  apiUrl: 'http://localhost:3001'
};
```

O frontend se comunica com o backend usando services, como `AuthService` e `ProductService`.
