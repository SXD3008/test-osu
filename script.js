let canvas, ctx, circles = [], startTime;

function startGame() {
    // Oculta o menu e exibe o canvas do jogo
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    
    // Configura o canvas
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    
    // Carrega o mapa de ritmo
    fetch('assets/maps/map.json')
        .then(response => response.json())
        .then(data => {
            // Armazena os círculos do mapa no array `circles`
            circles = data.circles.map(circle => ({
                x: circle.x,
                y: circle.y,
                time: circle.time,
                radius: 50 // Define um tamanho padrão para o círculo
            }));

            // Registra o início do jogo e inicia o loop de animação
            startTime = Date.now();
            requestAnimationFrame(gameLoop);
        })
        .catch(error => console.error('Erro ao carregar o mapa:', error));
}

function gameLoop() {
    // Limpa o canvas para o próximo frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const currentTime = Date.now() - startTime;
    circles.forEach(circle => {
        const elapsed = currentTime - circle.time;
        if (elapsed < 0) return; // Mostra o círculo apenas no tempo correto

        // Desenha o círculo no canvas
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#00f";
        ctx.lineWidth = 5;
        ctx.stroke();

        // Remove círculos que passaram do tempo
        if (elapsed > 500) {
            circles = circles.filter(c => c !== circle);
        }
    });

    // Continua o loop de animação
    requestAnimationFrame(gameLoop);
}

// Detecta cliques no canvas
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    circles.forEach(circle => {
        const dx = x - circle.x;
        const dy = y - circle.y;
        if (Math.sqrt(dx * dx + dy * dy) < circle.radius) {
            console.log("Acertou!");
        }
    });
});
