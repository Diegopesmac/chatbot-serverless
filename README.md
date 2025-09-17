# Projeto 3 – Chatbot serverless com processamento de linguagem natural (PLN)

Este projeto demonstra como construir um chatbot simples usando uma arquitetura serverless. A aplicação utiliza **Node.js** com **Express** para simular uma função serverless que recebe mensagens do usuário, processa o texto e devolve uma resposta.  
O objetivo é ilustrar conceitos de computação sem servidor (serverless), construção de APIs REST e integração com front‑end web para exibir conversas.  

## Estrutura do projeto

```
project3/
│  README.md            # Descrição do projeto e instruções
│
├─ backend/             # Código do serviço serverless
│  ├─ index.js          # Função principal de chatbot em Node/Express
│  └─ package.json      # Dependências e scripts
│
└─ frontend/            # Interface web para interagir com o chatbot
   └─ index.html        # Página HTML com formulário e exibição de mensagens
```

## Como executar localmente

1. Navegue até a pasta `backend` e instale as dependências:

   ```bash
   cd backend
   npm install
   ```

2. Inicie o servidor Express (que simula a função serverless):

   ```bash
   npm start
   ```

   O servidor será executado na porta 3000 por padrão. Ele expõe um endpoint `POST /chat` que aceita um JSON com a chave `message` e retorna uma resposta.

3. Abra o arquivo `frontend/index.html` em seu navegador.  
   Digite uma mensagem no campo de texto e clique em **Enviar**. O front‑end fará uma chamada POST para `http://localhost:3000/chat` e exibirá a resposta gerada pelo “bot”.

## Como funciona

* **Backend** – O arquivo `backend/index.js` cria uma aplicação Express com um endpoint `/chat`. Ao receber uma mensagem, ele gera uma resposta simples invertendo o texto enviado (como exemplo de processamento de linguagem natural). Em um ambiente serverless real, essa lógica poderia ser executada por uma função AWS Lambda ou Google Cloud Function e integrar um serviço de PLN mais sofisticado.

* **Front‑end** – O arquivo `frontend/index.html` contém um formulário simples que permite ao usuário enviar perguntas e visualizar respostas. O JavaScript do lado do cliente usa `fetch` para enviar a mensagem ao back‑end e atualiza a interface com as respostas.

## Próximos passos

Este protótipo serve de base para explorar conceitos de serverless e PLN. Algumas ideias de melhorias incluem:

* Substituir a lógica de inversão de texto por integração com um modelo de PLN, como o OpenAI ChatGPT ou modelos open‑source (via API externa).  
* Utilizar o **AWS Lambda** ou **Google Cloud Functions** para hospedar a função de chat sem gerenciar servidores, e **API Gateway** para expor o endpoint.  
* Proteger o endpoint com autenticação (por exemplo, tokens JWT ou chaves API).  
* Adicionar persistência de conversas e um painel de administração para monitorar interações.
