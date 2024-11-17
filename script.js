// IDs dos canais e nomes para a tabela
const CHANNELS = [
    { id: 'UCq8wZ6fI7T3CUxJ2sLtzL-Q', name: 'Alanzoka' },
    { id: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw', name: 'PewDiePie' }
];

const API_KEY = 'AIzaSyAAuC1FAIonv_6dyeXNTzLW9iBNgXWQfQ4';

// Função para buscar inscritos
async function fetchSubscriberCount(channelId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`);
    const data = await response.json();
    return parseInt(data.items[0].statistics.subscriberCount);
}

// Função para atualizar a tabela
async function updateTable() {
    const tableBody = document.querySelector('#subscribersTable tbody');
    tableBody.innerHTML = ''; // Limpa a tabela

    const promises = CHANNELS.map(async (channel) => {
        const subscribers = await fetchSubscriberCount(channel.id);
        return { name: channel.name, subscribers };
    });

    const results = await Promise.all(promises);
    results.sort((a, b) => b.subscribers - a.subscribers); // Ordena por inscritos

    results.forEach((channel, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${channel.name}</td>
            <td>${channel.subscribers.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Atualiza a tabela a cada 60 segundos
setInterval(updateTable, 60000);
updateTable();
