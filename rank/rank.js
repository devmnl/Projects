// scripts.js

// Dados fictícios para cada máquina com cores personalizadas
const dataMachine1 = [1200, 8000, 900, 1100]; 
const dataMachine2 = [1300, 1400, 1000, 1050]; 

const employeesMachine1 = [
    { name: 'MARCIO', image: 'funcionario_a.jpg', color: 'rgba(255, 99, 132, 0.6)' },
    { name: 'MANOEL', image: '/images/manoel.jpeg', color: 'rgba(54, 162, 235, 0.6)' },
    { name: 'WESLEY', image: 'funcionario_c.jpg', color: 'rgba(255, 159, 64, 0.6)' },
    { name: 'LUIZ', image: 'funcionario_d.jpg', color: 'rgba(153, 102, 255, 0.6)' }
];

const employeesMachine2 = [
    { name: 'RENÊ', image: '/images/rene.jpeg', color: 'rgba(153, 102, 255, 0.6)' },
    { name: 'VITOR', image: 'funcionario_f.jpg', color: 'rgba(255, 99, 132, 0.6)' },
    { name: 'DOUGLAS', image: 'funcionario_g.jpg', color: 'rgba(54, 162, 235, 0.6)' },
    { name: 'ERIC', image: 'funcionario_h.jpg', color: 'rgba(255, 159, 64, 0.6)' }
];

// Função de configuração do gráfico com cores personalizadas
const config = (data, employees, label) => ({
    type: 'bar',
    data: {
        labels: employees.map(e => e.name),
        datasets: [{
            label: label,
            data: data,
            backgroundColor: employees.map(e => e.color), // Cores personalizadas
            borderColor: employees.map(e => e.color.replace('0.6', '1')), // Bordas com opacidade total
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// Criação dos gráficos para cada máquina
const ctx1 = document.getElementById('chartMachine1').getContext('2d');
const chartMachine1 = new Chart(ctx1, config(dataMachine1, employeesMachine1, 'Produção Máquina 1'));

const ctx2 = document.getElementById('chartMachine2').getContext('2d');
const chartMachine2 = new Chart(ctx2, config(dataMachine2, employeesMachine2, 'Produção Máquina 2'));

// Função para gerar o ranking de cada máquina com fotos e cores correspondentes
const generateRanking = (data, employees, elementId) => {
    const sortedData = data.map((value, index) => ({
        ...employees[index],
        value: value
    })).sort((a, b) => b.value - a.value);

    const rankingElement = document.getElementById(elementId);
    rankingElement.innerHTML = '';
    sortedData.forEach(item => {
        const div = document.createElement('div');
        
        // Cria a imagem do funcionário
        const img = document.createElement('img');
        img.src = item.image; // Usa o caminho completo da imagem fornecido
        img.alt = item.name;

        // Cria o texto do funcionário com a cor correspondente
        const text = document.createElement('span');
        text.textContent = `${item.name}: ${item.value} t`;
        text.style.color = item.color.replace('0.6', '1'); // Aplica a cor correspondente

        // Adiciona a imagem e o texto ao div
        div.appendChild(img);
        div.appendChild(text);
        
        rankingElement.appendChild(div);
    });
};

// Gerar o ranking para cada máquina com fotos e cores correspondentes
generateRanking(dataMachine1, employeesMachine1, 'rankingMachine1');
generateRanking(dataMachine2, employeesMachine2, 'rankingMachine2');





