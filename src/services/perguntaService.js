class PerguntaService {
  constructor(perguntaRepository) {
    this.perguntaRepository = perguntaRepository;
  }

  /**
   * Sorteia uma pergunta aleatória que ainda não foi usada
   * @param {Array} perguntasUsadas - IDs das perguntas já utilizadas
   * @returns {Promise<Object>} Pergunta sorteada
   */
  async sortearPergunta(perguntasUsadas) {
    const todas = await this.perguntaRepository.buscarTodasPerguntas();
    const naoUsadas = todas.filter(p => !perguntasUsadas.includes(p._id.toString()));

    if (!naoUsadas.length) {
      throw new Error('Todas as perguntas já foram usadas. Reinicie a partida.');
    }

    const sorteada = naoUsadas[Math.floor(Math.random() * naoUsadas.length)];

    return {
      id: sorteada._id.toString(),
      pergunta: sorteada.pergunta,
      correta: sorteada.correta
    };
  }

  /**
   * Verifica se a resposta fornecida está correta
   * @param {string} resposta - Resposta fornecida pelo usuário
   * @param {Object} pergunta - Pergunta atual
   * @returns {Promise<boolean>} Resultado da verificação
   */
  async verificarResposta(resposta, pergunta) {
    if (!pergunta) {
      throw new Error('Nenhuma pergunta ativa para verificar resposta.');
    }

    // Normaliza as respostas para comparação (remove espaços extras e converte para minúsculas)
    const respostaNormalizada = resposta.trim().toLowerCase();
    const corretaNormalizada = pergunta.correta.trim().toLowerCase();

    return respostaNormalizada === corretaNormalizada;
  }
}

module.exports = PerguntaService;
