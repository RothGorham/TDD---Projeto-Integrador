const App = require('./app');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/perguntas_respostas';
const DEMO_MODE = process.env.DEMO_MODE || true; // Modo de demonstração por padrão

const app = new App();

// Função para iniciar o servidor
const startServer = async () => {
  try {
    if (DEMO_MODE === true || DEMO_MODE === 'true') {
      console.log('🔔 Iniciando em modo de demonstração (sem MongoDB)');
      // Pula a conexão com o banco de dados
    } else {
      console.log('🔔 Tentando conectar ao MongoDB...');
      await app.connectToDatabase(MONGO_URI);
    }
    app.listen(PORT);
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
};

// Iniciar o servidor apenas se este arquivo for executado diretamente
if (require.main === module) {
  startServer();
}

module.exports = app;
