// Substitua pelos IDs dos canais
const ALANZOKA_CHANNEL_ID = 'UCq8wZ6fI7T3CUxJ2sLtzL-Q'; // Alanzoka
const PEWDIEPIE_CHANNEL_ID = 'UC-lHJZR3Gqxm24_Vd_AJ5Yw'; // PewDiePie
const API_KEY = 'AIzaSyAAuC1FAIonv_6dyeXNTzLW9iBNgXWQfQ4';

// Função para buscar o número de inscritos
async function fetchSubscriberCount(channelId) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`);
        const data = await response.json();
        return parseInt(data.items[0].statistics.subscriberCount);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return 0; // Valor padrão em caso de erro
    }
}

// Atualizar gráfico
async function updateChart(chart) {
    const alanzokaSubscribers = await fetchSubscriberCount(ALANZOKA_CHANNEL_ID);
    const pewdiepieSubscribers = await fetchSubscriberCount(PEWDIEPIE_CHANNEL_ID);
    chart.data.datasets[0].data = [alanzokaSubscribers, pewdiepieSubscribers];
    chart.update();
}

// Configurar o gráfico
const ctx = document.getElementById('subscribersChart').getContext('2d');
const subscribersChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Alanzoka', 'PewDiePie'],
        datasets: [{
            label: 'Subscribers',
            data: [0, 0],
            backgroundColor: ['#3498db', '#f39c12']
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Atualização automática
setInterval(() => updateChart(subscribersChart), 60000); // Atualiza a cada minuto

// Atualização inicial
updateChart(subscribersChart);
