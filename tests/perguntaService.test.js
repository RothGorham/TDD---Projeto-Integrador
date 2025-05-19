const PerguntaService = require('../src/services/perguntaService');
const PerguntaRepository = require('../src/repositories/perguntaRepository');

// Mock do repositório
jest.mock('../src/repositories/perguntaRepository');

describe('PerguntaService', () => {
  let perguntaService;
  
  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
    perguntaService = new PerguntaService(PerguntaRepository);
  });

  describe('sortearPergunta', () => {
    it('deve retornar uma pergunta quando existem perguntas disponíveis', async () => {
      // Arrange
      const mockPerguntas = [
        { _id: '1', pergunta: 'Qual a capital do Brasil?', correta: 'Brasília' },
        { _id: '2', pergunta: 'Quanto é 2+2?', correta: '4' }
      ];
      
      PerguntaRepository.buscarTodasPerguntas.mockResolvedValue(mockPerguntas);
      
      // Act
      const resultado = await perguntaService.sortearPergunta([]);
      
      // Assert
      expect(resultado).toBeDefined();
      expect(resultado.id).toBeDefined();
      expect(resultado.pergunta).toBeDefined();
      expect(resultado.correta).toBeDefined();
      expect(PerguntaRepository.buscarTodasPerguntas).toHaveBeenCalledTimes(1);
    });

    it('deve lançar erro quando todas as perguntas já foram usadas', async () => {
      // Arrange
      const mockPerguntas = [
        { _id: '1', pergunta: 'Qual a capital do Brasil?', correta: 'Brasília' },
        { _id: '2', pergunta: 'Quanto é 2+2?', correta: '4' }
      ];
      
      PerguntaRepository.buscarTodasPerguntas.mockResolvedValue(mockPerguntas);
      const perguntasUsadas = ['1', '2']; // Todas as perguntas já foram usadas
      
      // Act & Assert
      await expect(perguntaService.sortearPergunta(perguntasUsadas))
        .rejects
        .toThrow('Todas as perguntas já foram usadas. Reinicie a partida.');
    });
  });

  describe('verificarResposta', () => {
    it('deve retornar true quando a resposta estiver correta', async () => {
      // Arrange
      const pergunta = {
        id: '1',
        pergunta: 'Qual a capital do Brasil?',
        correta: 'Brasília'
      };
      
      // Act
      const resultado = await perguntaService.verificarResposta('Brasília', pergunta);
      
      // Assert
      expect(resultado).toBe(true);
    });

    it('deve retornar false quando a resposta estiver incorreta', async () => {
      // Arrange
      const pergunta = {
        id: '1',
        pergunta: 'Qual a capital do Brasil?',
        correta: 'Brasília'
      };
      
      // Act
      const resultado = await perguntaService.verificarResposta('Rio de Janeiro', pergunta);
      
      // Assert
      expect(resultado).toBe(false);
    });

    it('deve ser case insensitive na verificação da resposta', async () => {
      // Arrange
      const pergunta = {
        id: '1',
        pergunta: 'Qual a capital do Brasil?',
        correta: 'Brasília'
      };
      
      // Act
      const resultado = await perguntaService.verificarResposta('brasília', pergunta);
      
      // Assert
      expect(resultado).toBe(true);
    });

    it('deve ignorar espaços extras na verificação da resposta', async () => {
      // Arrange
      const pergunta = {
        id: '1',
        pergunta: 'Qual a capital do Brasil?',
        correta: 'Brasília'
      };
      
      // Act
      const resultado = await perguntaService.verificarResposta('  Brasília  ', pergunta);
      
      // Assert
      expect(resultado).toBe(true);
    });
  });
});
