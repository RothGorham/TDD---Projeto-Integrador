# Sistema de Perguntas e Respostas com TDD

## 🚀 Executando os testes rapidamente

```bash
# Instalar dependências
npm install

# Executar todos os testes
npm test
```

## 👟 Passo a passo para executar o programa

1. **Preparar o ambiente:**
   ```bash
   # Abra um terminal (Prompt de Comando ou PowerShell)
   # Navegue até a pasta do projeto
   cd c:\Users\COCA\Downloads\tdd_example
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor:**
   ```bash
   npm start
   ```
   O servidor será iniciado na porta 3000.
   
   > **IMPORTANTE:** O aplicativo iniciará automaticamente no "modo de demonstração" sem necessidade de MongoDB. Não é preciso instalar ou configurar banco de dados.
   > 
   > **Se quiser conectar com banco de dados real:**
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
   > Substitua `sua_string_de_conexao_do_atlas` pela URL de conexão do MongoDB Atlas (formato: mongodb+srv://usuario:senha@cluster.mongodb.net/perguntas_respostas)

4. **Acessar a aplicação:**
   - Abra seu navegador e acesse: `http://localhost:3000`
   - Para testar a API diretamente:
     - Obter pergunta: GET `http://localhost:3000/api/pergunta`
     - Enviar resposta: POST `http://localhost:3000/api/resposta` com corpo `{"id": 1, "resposta": "sua resposta"}`

5. **Encerrar o servidor:**
   - Volte ao terminal e pressione `Ctrl+C`

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
