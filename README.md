<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Sobre
O projeto se trata de um CRUD simples de usuários com autenticação usando o NestJS.

## Como executar

1° passo - Crie um arquivo na raiz do projeto chamado `.env` e coloque o conteúdo abaixo:

```bash
ENV="development"

JWT_SECRET=
APP_PORT=

DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=
DB_PORT=
```
Preencha os campos faltantes com as informações que se pedem, colocando o valor logo após o sinal de igualdade.
Esse será o arquivo que conterá as variáveis de ambiente para desenvolvimento. Para os testes crie um arquivo também na raiz chamado `.env.test` e coloque o mesmo conteúdo acima, porém substitua o valor da variável `ENV` por `test`; e claro, preencha os outros campos com os dados do BANCO DE TESTE. <br><br>
Agora basta rodar algum dos comandos abaixo para a ação desejada


```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes

```bash
# Testes unitários
$ npm run test

# Testes e2e
$ npm run test:e2e

# Cobertura de testes
$ npm run test:cov
```

## Endpoints
### Rodas do usuário
```bash
# GET: Lista todos os usuários cadastrados - Necessário estar autenticado pelo menos como User
/users

# POST: Cria um usuário novo
/users

# GET: Lista um usuário específico de acordo com o id - Necessário estar autenticado como Admin
/users/:id

# PUT: Atualiza todos os campos de um usuário - Necessário estar autenticado como Admin
/users/:id

# PATCH: Atualiza os campos informados de um usuário - Necessário estar autenticado como Admin
/users/:id

# DELETE: Deleta um usuário - Necessário estar autenticado como Admin
/users/:id

### Rotas de autenticação
```bash

# POST: Fazer login (receber token de autenticação)
/auth/login
# 
```
```
