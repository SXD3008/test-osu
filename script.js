// Seleciona elementos do DOM
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');
const rankingList = document.getElementById('ranking-list');

// Variáveis de controle do jogo
let startTime = 0;
let timerInterval;
let isGameActive = false;
let lastMousePosition = { x: 0, y: 0 };
let nickname = '';
let ranking = [];

// Atualiza o ranking no DOM
function updateRanking() {
    // Ordena o ranking pelo maior tempo
    ranking.sort((a, b) => b.time - a.time);

    // Limpa o ranking atual na tela
    rankingList.innerHTML = '';

    // Adiciona os top 10 ao ranking
    ranking.slice(0, 10).forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${index + 1}. ${player.name}</span>
            <span>${player.time.toFixed(2)}s</span>
        `;
        rankingList.appendChild(listItem);
    });
}

// Reseta o jogo
function resetGame() {
    if (isGameActive) {
        clearInterval(timerInterval); // Para o cronômetro
        const finalTime = (Date.now() - startTime) / 1000; // Calcula o tempo final em segundos

        // Adiciona o tempo ao ranking
        ranking.push({ name: nickname, time: finalTime });
        updateRanking(); // Atualiza o ranking

        messageElement.textContent = 'Oops! You moved the mouse!';
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

// Verifica se o mouse se moveu
function checkMouseMovement(event) {
    if (!isGameActive) return; // Ignora se o jogo não estiver ativo

    const { x, y } = lastMousePosition; // Pega a última posição do mouse
    if (event.clientX !== x || event.clientY !== y) {
        resetGame(); // Reseta o jogo se o mouse se mover
    }

    // Atualiza a posição do mouse
    lastMousePosition.x = event.clientX;
    lastMousePosition.y = event.clientY;
}

// Adiciona eventos ao teclado e mouse
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isGameActive) { // Inicia o jogo ao pressionar espaço
        startGame();
    }
});

document.addEventListener('mousemove', checkMouseMovement); // Verifica movimentos do mouse
