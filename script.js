// script.js
let canvas, ctx, circles = [], startTime;

function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    startTime = Date.now();

    // Simular um círculo de exemplo
    circles.push({ x: 200, y: 200, time: 1000, radius: 50 });

    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const currentTime = Date.now() - startTime;
    circles.forEach(circle => {
        const elapsed = currentTime - circle.time;
        if (elapsed < 0) return;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#00f";
        ctx.lineWidth = 5;
        ctx.stroke();

        // Remove círculos após certo tempo
        if (elapsed > 500) {
            circles = circles.filter(c => c !== circle);
        }
    });

    requestAnimationFrame(gameLoop);
}

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

