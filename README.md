# 🥋 Karate Score System

Sistema web de placar para lutas de karatê com controle remoto em tempo real via celular 📱🖥️

---

## 📌 Descrição

O **Karate Score System** é uma aplicação web desenvolvida para exibir e controlar o placar de lutas de karatê de forma profissional.

A aplicação permite que um dispositivo (celular) controle, em tempo real, o que é exibido em outro dispositivo (computador), incluindo:

* Pontuação dos competidores
* Faltas (warnings e penalidades)
* Cronômetro da luta
* Indicadores de VAR
* Gravação da luta via câmera 🎥

---

## ⚙️ Funcionalidades

### 🖥️ Tela do Placar (Display)

* Exibição de pontos (vermelho 🔴 e azul 🔵)
* Exibição de faltas (até 5 por competidor 🟨)
* Cronômetro em tempo real ⏱️
* Nome dos atletas
* Categoria da luta
* Indicador de VAR
* Identificação do dojo
* Gravação da luta via webcam

---

### 📱 Tela de Controle (Mobile)

* ➕ / ➖ pontos (vermelho e azul)
* ➕ / ➖ faltas
* ▶️ / ⏸️ controle do cronômetro
* 🎥 iniciar/parar gravação
* Ativação de VAR

---

## 🧠 Arquitetura

```
Frontend (React)
   ├── Display (placar)
   └── Control (celular)

        ↓ WebSocket (Socket.IO)

Backend (Node.js + Express)
   └── Gerenciamento do estado da luta
```

---

## 🚀 Tecnologias Utilizadas

### Frontend

* React (Vite)
* Socket.IO Client
* CSS / Tailwind (opcional)

### Backend

* Node.js
* Express
* Socket.IO

### Outros

* MediaRecorder API (gravação de vídeo)

---

## 📁 Estrutura do Projeto

```
karate-score-system/
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── display/
│   │   └── control/
│   └── package.json
```

---

## 🔧 Como Rodar o Projeto

### 🔙 Backend

```
cd backend
npm install
node server.js
```

Servidor rodará em:
http://localhost:3001

---

### ⚛️ Frontend

```
cd frontend
npm install
npm run dev
```

---

## 📱 Acessando no celular

1. Descubra o IP da sua máquina:

   ipconfig

2. Substitua no frontend:

   io("http://SEU_IP:3001")

3. Acesse pelo navegador do celular

---

## 🔄 Comunicação em Tempo Real

A comunicação entre dispositivos é feita via **WebSockets**, utilizando o Socket.IO:

* Celular envia comandos
* Servidor processa
* Placar atualiza instantaneamente

---

## 🎥 Gravação de Vídeo

A gravação da luta é feita diretamente no navegador do computador usando:

* navigator.mediaDevices.getUserMedia
* MediaRecorder

O vídeo é salvo localmente após o término da gravação.

---

## 🧪 Status do Projeto

🚧 Em desenvolvimento

---

## 📈 Melhorias Futuras

* Persistência com PostgreSQL 🗄️
* Sistema de usuários (árbitros)
* Histórico de lutas
* Replay da gravação
* Interface estilo transmissão esportiva
* Deploy online (Vercel + Render)

---

## 🤝 Contribuição

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit (`git commit -m 'feat: nova feature'`)
4. Push (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é livre para uso acadêmico e pessoal.

---

## 👨‍💻 Autor

Desenvolvido por Gustavo Millamonte - Aluno SESI SENAI
