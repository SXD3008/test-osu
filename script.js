// Dados iniciais simulados
let channels = [
    { name: 'Alanzoka', subscribers: 6000000 }, // 6 milhões
    { name: 'PewDiePie', subscribers: 111000000 } // 111 milhões
];

// Função para gerar aumento aleatório entre 1 e 300
function getRandomIncrease() {
    return Math.floor(Math.random() * 300) + 1;
}

// Função para atualizar os inscritos simulados
function updateSubscribers() {
    channels.forEach(channel => {
        channel.subscribers += getRandomIncrease();
    });

    // Ordena por inscritos em ordem decrescente
    channels.sort((a, b) => b.subscribers - a.subscribers);
}

// Função para atualizar a tabela
function updateTable() {
    const tableBody = document.querySelector('#subscribersTable tbody');
    tableBody.innerHTML = ''; // Limpa a tabela

    channels.forEach((channel, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${channel.name}</td>
            <td>${channel.subscribers.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Atualização automática
function startLiveUpdates() {
    updateSubscribers(); // Atualiza os inscritos simulados
    updateTable();       // Atualiza a tabela visual

    setInterval(() => {
        updateSubscribers(); // Atualiza os dados
        updateTable();       // Atualiza a tabela na página
    }, 1000); // Atualiza a cada 1 segundo
}

// Inicia as atualizações ao carregar a página
startLiveUpdates();
