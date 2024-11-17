// Seleciona elementos do DOM
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');
const rankingList = document.getElementById('ranking-list');
const top5List = document.getElementById('top-5-list');

// Variáveis de controle do jogo
let startTime = 0;
let timerInterval;
let isGameActive = false;
let lastMousePosition = { x: 0, y: 0 };
let nickname = '';
let ranking = [];

// Função para atualizar o ranking no localStorage
function saveRanking() {
    localStorage.setItem('ranking', JSON.stringify(ranking));
}

// Função para carregar o ranking do localStorage
function loadRanking() {
    const savedRanking = localStorage.getItem('ranking');
    if (savedRanking) {
        ranking = JSON.parse(savedRanking);
        updateRanking(); // Atualiza o ranking na tela
        updateTop5(); // Atualiza o Top 5
    }
}

// Atualiza o ranking no DOM
function updateRanking() {
    ranking.sort((a, b) => b.time - a.time); // Ordena o ranking por tempo decrescente
    rankingList.innerHTML = ''; // Limpa o ranking atual

    ranking.slice(0, 10).forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${index + 1}. ${player.name}</span>
            <span>${player.time.toFixed(2)}s</span>
        `;
        rankingList.appendChild(listItem);
    });
}

// Atualiza o Top 5 no DOM
function updateTop5() {
    top5List.innerHTML = ''; // Limpa o top 5 atual

    ranking.slice(0, 5).forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${index + 1}. ${player.name}</span>
            <span>${player.time.toFixed(2)}s</span>
        `;
        top5List.appendChild(listItem);
    });
}

// Reseta o jogo
function resetGame() {
    if (isGameActive) {
        clearInterval(timerInterval); // Para o cronômetro
        const finalTime = (Date.now() - startTime) / 1000; // Calcula o tempo final em segundos
        ranking.push({ name: nickname, time: finalTime }); // Adiciona o tempo ao ranking
        updateRanking(); // Atualiza o ranking na tela
        updateTop5(); // Atualiza o Top 5
        saveRanking(); // Salva o ranking no localStorage
        messageElement.textContent = 'Oops! You moved the mouse!'; // Mensagem de erro
    }

    startTime = 0;               // Reseta o tempo
    isGameActive = false;        // Marca o jogo como parado
    timerElement.textContent = '0.00s'; // Reseta o cronômetro na tela
}

// Atualiza o cronômetro
function updateTimer() {
    if (isGameActive) { 
        const currentTime = (Date.now() - startTime) / 1000; // Calcula o tempo em segundos
        timerElement.textContent = `${currentTime.toFixed(2)}s`; // Atualiza o texto do cronômetro
    }
}

// Inicia o jogo
function startGame() {
    if (!nickname) {
        nickname = prompt('Enter your nickname:'); // Pergunta o nome do jogador
        if (!nickname) return; // Cancela se o jogador não inserir um nome
    }

    messageElement.textContent = ''; // Limpa mensagens anteriores
    timerElement.textContent = '0.00s'; // Reseta o cronômetro no início do jogo
    startTime = Date.now();          // Marca o início do jogo
    isGameActive = true;             // Marca o jogo como ativo

    // Atualiza o cronômetro em intervalos regulares
    timerInterval = setInterval(updateTimer, 10);
}

// Ver
