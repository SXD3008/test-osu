// Seleciona elementos do DOM
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');

// Variáveis de controle do jogo
let startTime = 0;
let timerInterval;
let isGameActive = false;
let lastMousePosition = { x: 0, y: 0 };

// Reseta o jogo
function resetGame() {
    clearInterval(timerInterval); // Para o cronômetro
    startTime = 0;               // Reseta o tempo
    isGameActive = false;        // Marca o jogo como parado
    timerElement.textContent = '0.00s'; // Reseta o cronômetro na tela
    messageElement.textContent = 'Oops! You moved the mouse!';
}

// Atualiza o cronômetro
function updateTimer() {
    const currentTime = (Date.now() - startTime) / 1000; // Calcula o tempo em segundos
    timerElement.textContent = `${currentTime.toFixed(2)}s`; // Mostra o tempo no DOM
}

// Inicia o jogo
function startGame() {
    messageElement.textContent = ''; // Limpa mensagens anteriores
    startTime = Date.now();          // Marca o início do jogo
    isGameActive = true;             // Marca o jogo como ativo
    timerInterval = setInterval(updateTimer, 10); // Atualiza o cronômetro a cada 10ms
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
