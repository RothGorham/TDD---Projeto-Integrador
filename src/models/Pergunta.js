const mongoose = require('mongoose');

const perguntaSchema = new mongoose.Schema({
    pergunta: {
        type: String,
        required: true
    },
    correta: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Pergunta', perguntaSchema);
