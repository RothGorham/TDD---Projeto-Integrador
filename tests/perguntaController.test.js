const request = require('supertest');
const App = require('../src/app');
const PerguntaRepository = require('../src/repositories/perguntaRepository');

// Mock do repositório
jest.mock('../src/repositories/perguntaRepository');

describe('PerguntaController', () => {
  let app;
  
  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
    app = new App().getApp();
  });

  describe('GET /api/pergunta', () => {
    it('deve retornar uma pergunta quando existem perguntas disponíveis', async () => {
      // Arrange
      const mockPerguntas = [
        { _id: '1', pergunta: 'Qual a capital do Brasil?', correta: 'Brasília' },
        { _id: '2', pergunta: 'Quanto é 2+2?', correta: '4' }
      ];
      
      PerguntaRepository.buscarTodasPerguntas.mockResolvedValue(mockPerguntas);
      
      // Act
      const response = await request(app).get('/api/pergunta');
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('pergunta');
      expect(response.body).not.toHaveProperty('correta'); // Não deve expor a resposta correta
      expect(PerguntaRepository.buscarTodasPerguntas).toHaveBeenCalledTimes(1);
    });

    it('deve retornar erro 404 quando todas as perguntas já foram usadas', async () => {
      // Arrange - Simular que todas as perguntas já foram usadas
      // Primeiro, fazemos uma chamada para obter uma pergunta
      const mockPerguntas = [
        { _id: '1', pergunta: 'Qual a capital do Brasil?', correta: 'Brasília' }
      ];
      
      PerguntaRepository.buscarTodasPerguntas.mockResolvedValue(mockPerguntas);
      
      // Primeira chamada para obter a pergunta
      await request(app).get('/api/pergunta');
      
      // Responder corretamente para marcar como usada
      await request(app)
        .post('/api/resposta')
        .send({ resposta: 'Brasília' });
      
      // Act - Segunda chamada, agora todas as perguntas já foram usadas
      const response = await request(app).get('/api/pergunta');
      
      // Assert
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('erro');
      expect(response.body.erro).toContain('Todas as perguntas já foram usadas');
    });
  });

  describe('POST /api/resposta', () => {
    it('deve retornar sucesso quando a resposta estiver correta', async () => {
      // Arrange
      const mockPerguntas = [
        { _id: '1', pergunta: 'Qual a capital do Brasil?', correta: 'Brasília' }
      ];
      
      PerguntaRepository.buscarTodasPerguntas.mockResolvedValue(mockPerguntas);
      
      // Primeiro, obter uma pergunta
      await request(app).get('/api/pergunta');
      
      // Act
      const response = await request(app)
        .post('/api/resposta')
        .send({ resposta: 'Brasília' });
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('correta', true);
      expect(response.body).toHaveProperty('mensagem');
    });

    it('deve retornar erro quando a resposta estiver incorreta', async () => {
      // Arrange
      const mockPerguntas = [
        { _id: '1', pergunta: 'Qual a capital do Brasil?', correta: 'Brasília' }
      ];
      
      PerguntaRepository.buscarTodasPerguntas.mockResolvedValue(mockPerguntas);
      
      // Primeiro, obter uma pergunta
      await request(app).get('/api/pergunta');
      
      // Act
      const response = await request(app)
        .post('/api/resposta')
        .send({ resposta: 'Rio de Janeiro' });
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('correta', false);
      expect(response.body).toHaveProperty('mensagem');
    });

    it('deve retornar erro 404 quando não há pergunta ativa', async () => {
      // Act
      const response = await request(app)
        .post('/api/resposta')
        .send({ resposta: 'Qualquer resposta' });
      
      // Assert
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('erro');
      expect(response.body.erro).toContain('Nenhuma pergunta ativa');
    });
  });
});
