const express = require('express');
const bodyParser = require('body-parser');
const Sentiment = require('sentiment');

// Cria uma instância do analisador de sentimento
const sentimentAnalyzer = new Sentiment();

// Cria uma instância do aplicativo Express
const app = express();
app.use(bodyParser.json());

/**
 * Detecta a intenção da mensagem com base em palavras-chave simples.
 * Retorna uma string representando a intenção identificada.
 */
function detectarIntencao(texto) {
  const lower = texto.toLowerCase();
  if (lower.includes('oi') || lower.includes('olá') || lower.includes('hello') || lower.includes('hi')) {
    return 'saudacao';
  }
  if (lower.includes('tempo') || lower.includes('weather') || lower.includes('clima')) {
    return 'consulta_clima';
  }
  if (lower.includes('ajuda') || lower.includes('help') || lower.includes('socorro') || lower.includes('assist')) {
    return 'pedido_ajuda';
  }
  return 'conversa';
}

/**
 * Endpoint de chat.
 * Espera um corpo JSON como { message: "texto" }.
 * Utiliza o analisador de sentimento e a função de detecção de intenção para gerar uma resposta.
 */
app.post('/chat', (req, res) => {
  const message = req.body.message || '';

  const intent = detectarIntencao(message);
  const sentimentResult = sentimentAnalyzer.analyze(message);
  let sentimento;
  if (sentimentResult.score > 0) {
    sentimento = 'positivo';
  } else if (sentimentResult.score < 0) {
    sentimento = 'negativo';
  } else {
    sentimento = 'neutro';
  }

  let reply;
  switch (intent) {
    case 'saudacao':
      reply = 'Olá! Como posso te ajudar hoje?';
      break;
    case 'consulta_clima':
      reply = 'Não tenho dados meteorológicos agora, mas posso conversar sobre outras coisas!';
      break;
    case 'pedido_ajuda':
      reply = 'Claro, em que posso te ajudar?';
      break;
    default:
      reply = 'Interessante! Conte‑me mais.';
  }

  res.json({
    intent,
    sentiment: sentimento,
    reply,
  });
});

// Inicia o servidor na porta definida pela variável de ambiente ou 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Chatbot server listening on port ${port}`);
});
