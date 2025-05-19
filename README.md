# Sistema de Perguntas e Respostas com TDD

## 📋 Passo a passo para testar o projeto

### Etapa 1: Preparação do ambiente
1. Abra um terminal (Prompt de Comando ou PowerShell)
2. Navegue até a pasta do projeto:
   ```bash
   cd c:?
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Etapa 2: Executar os testes automatizados

**Para executar todos os testes:**
```bash
npm test
```

**Para executar apenas os testes do serviço:**
```bash
npx jest tests/perguntaService.test.js
```

**Para executar apenas os testes do controller:**
```bash
npx jest tests/perguntaController.test.js
```

### Etapa 3: Executar a aplicação

1. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor iniciará na porta 3000 em modo de demonstração (sem precisar de MongoDB).

2. Acesse a aplicação:
   - Abra seu navegador e acesse: `http://localhost:3000`

3. Para encerrar o servidor:
   - Volte ao terminal e pressione `Ctrl+C`

### Etapa 4: Testar a API diretamente

1. Com o servidor iniciado (`npm start`), você pode:

   - **Obter uma pergunta aleatória:**
     ```
     Método: GET
     URL: http://localhost:3000/api/pergunta
     ```
     Resposta esperada: JSON com a pergunta, opções e ID

   - **Verificar uma resposta:**
     ```
     Método: POST
     URL: http://localhost:3000/api/resposta
     Corpo (JSON): {"id": "1", "resposta": "Teste"}
     ```
     Resposta esperada: JSON informando se a resposta está correta

## ⚙️ Configurações opcionais

> **IMPORTANTE:** O aplicativo inicia automaticamente no "modo de demonstração" sem necessidade de MongoDB.
> 
> **Para usar um banco de dados local:**
> ```bash
> # No Windows:
> set DEMO_MODE=false
> npm start
> 
> # No Linux/Mac:
> DEMO_MODE=false npm start
> ```
> 
> **Para usar MongoDB Atlas:**
> ```bash
> # No Windows:
> set DEMO_MODE=false
> set MONGO_URI=sua_string_de_conexao_do_atlas
> npm start
> 
> # No Linux/Mac:
> DEMO_MODE=false MONGO_URI=sua_string_de_conexao_do_atlas npm start
> ```
> 
> Substitua `sua_string_de_conexao_do_atlas` pela URL de conexão do MongoDB Atlas.

## ✅ O que este projeto demonstra

Este projeto demonstra uma implementação de Test-Driven Development (TDD) para um sistema de perguntas e respostas, mostrando:

1. **Ciclo Red-Green-Refactor na prática**
   - Testes escritos antes da implementação
   - Implementação mínima para passar nos testes
   - Refatoração com segurança

2. **Testes de unidade e integração**
   - Serviços testados isoladamente com mocks
   - Controllers testados através de requisições HTTP

3. **Arquitetura em camadas**
   - Models → Repositories → Services → Controllers

## 📂 Estrutura de testes explicada

- `tests/perguntaService.test.js`: Testa a lógica de negócio
  - Sorteio de perguntas aleatórias sem repetição
  - Verificação de respostas (corretas/incorretas)
  - Tratamento de erros

- `tests/perguntaController.test.js`: Testa os endpoints da API
  - GET /api/pergunta → Obter nova pergunta
  - POST /api/resposta → Verificar resposta

## 📝 Notas para avaliação

- **Cobertura de testes**: Todos os componentes principais possuem testes
- **Casos de borda**: Foram testadas situações como lista de perguntas vazia
- **Mocks**: Evita dependência de banco de dados real nos testes
- **Simplicidade**: Código mínimo necessário para passar nos testes

## 🧪 Abordagem TDD utilizada

1. Escrevemos testes que falham (RED)
2. Implementamos código mínimo para passar (GREEN)
3. Melhoramos o código mantendo os testes (REFACTOR)

## 📋 API REST implementada

- `GET /api/pergunta` → Retorna: `{ "id": 1, "texto": "Pergunta?", "opcoes": [...] }`
- `POST /api/resposta` → Enviar: `{ "id": 1, "resposta": "Resposta" }`
                       → Retorna: `{ "correta": true/false }`
