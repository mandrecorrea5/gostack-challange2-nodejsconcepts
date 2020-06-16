# GoStack Challange2 - NodeJs Concepts
> Segundo desafio da jornada Go Stack, um repositório para colocar em prática os conhecimentos adquiridos sobre Node e seus conceitos

O projeto tem por finalidade criar, listar, atualizar e deletar respoitórios do GIT.

## Estrutura do Projeto
    src                                         repositório que contém os arquivos funcionais da aplicação
    src/__tests__                               repositório que contém os testes da aplicação
    src/app.js                                  arquivo com o código principal
    src/server.js                               arquivo coma configuração da porta que a aplicação deve rodar
    .gitignore
    README.md
    jest.config.js                              arquivo de configuração do jest
    nodemon.json                                arquivo de configuração do nodemon
    package.json                                libs necessárias para que o projeto funcione corretamente

## Development Setup
Para que a projeto rode corretamente, precisa ter instalado
    
    node
    
### Libs Used

    cors:     2.8.5
    express:  4.17.1
    uuidv4:   6.1.0
    
### Dev Libs Used

    jest:       25.2.6
    nodemon:    2.0.2
    supertest:  4.0.2
    
### Instalation
  ```yarn install```

### Run Project
```yarn dev```

### Run Tests
```yarn test```
