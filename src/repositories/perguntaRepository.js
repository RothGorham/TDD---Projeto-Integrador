const Pergunta = require('../models/Pergunta');

// Dados de exemplo para modo de demonstração
const perguntasDemo = [
  {
    _id: '1',
    texto: 'Qual método do TDD é executado primeiro?',
    opcoes: ['Implementação', 'Refatoração', 'Teste', 'Documentação'],
    resposta: 'Teste',
    usada: false
  },
  {
    _id: '2',
    texto: 'O que significa a sigla TDD?',
    opcoes: ['Test-Driven Development', 'Test Design Document', 'Test Deployment Description', 'Type Definition Document'],
    resposta: 'Test-Driven Development',
    usada: false
  },
  {
    _id: '3',
    texto: 'Qual o principal benefício do TDD?',
    opcoes: ['Código mais seguro e testável', 'Desenvolvimento mais rápido', 'Menos documentação necessária', 'Interface mais bonita'],
    resposta: 'Código mais seguro e testável',
    usada: false
  }
];

class PerguntaRepository {
  /**
   * Busca todas as perguntas disponíveis no banco de dados
   * @returns {Promise<Array>} Lista de perguntas
   */
  static async buscarTodasPerguntas() {
    try {
      if (process.env.DEMO_MODE === 'true' || process.env.DEMO_MODE === true) {
        return [...perguntasDemo];
      }
      return await Pergunta.find();
    } catch (error) {
      if (process.env.DEMO_MODE === 'true' || process.env.DEMO_MODE === true) {
        return [...perguntasDemo];
      }
      throw new Error(`Erro ao buscar perguntas: ${error.message}`);
    }
  }

  /**
   * Busca uma pergunta pelo ID
   * @param {string} id - ID da pergunta
   * @returns {Promise<Object>} Pergunta encontrada
   */
  static async buscarPerguntaPorId(id) {
    try {
      if (process.env.DEMO_MODE === 'true' || process.env.DEMO_MODE === true) {
        const pergunta = perguntasDemo.find(p => p._id === id);
        if (!pergunta) {
          throw new Error('Pergunta não encontrada');
        }
        return pergunta;
      }
      
      const pergunta = await Pergunta.findById(id);
      if (!pergunta) {
        throw new Error('Pergunta não encontrada');
      }
      return pergunta;
    } catch (error) {
      if (process.env.DEMO_MODE === 'true' || process.env.DEMO_MODE === true) {
        const pergunta = perguntasDemo.find(p => p._id === id);
        if (pergunta) return pergunta;
      }
      throw new Error(`Erro ao buscar pergunta: ${error.message}`);
    }
  }
}

module.exports = PerguntaRepository;
