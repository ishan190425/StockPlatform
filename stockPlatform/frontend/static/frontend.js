async function fetchStockData(symbol) {
    const response = await fetch(`/?symbol=${symbol}`);
    const data = await response.json();
    return data;
}

function extractTimeSeriesData(jsonData) {
    const timeSeriesData = jsonData['Time Series (15min)'];
    const dataPoints = [];

    for (const timestamp in timeSeriesData) {
        const dataPoint = {
            time: timestamp,
            open: parseFloat(timeSeriesData[timestamp]['1. open']),
            high: parseFloat(timeSeriesData[timestamp]['2. high']),
            low: parseFloat(timeSeriesData[timestamp]['3. low']),
            close: parseFloat(timeSeriesData[timestamp]['4. close']),
            volume: parseInt(timeSeriesData[timestamp]['5. volume']),
        };
        dataPoints.push(dataPoint);
    }

    return dataPoints;
}

function renderStockChart(dataPoints,symbol) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataPoints.map(dp => dp.time),
            datasets: [
                {
                    label: 'Stock Price',
                    data: dataPoints.map(dp => dp.close),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1,
                    fill: true,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                    },
                    adapters: {
                        date: {
                            
                        },
                    }, 
                },
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}


// Call the fetchStockData function with a symbol
fetchStockData('AAPL').then(data => {
    const dataPoints = extractTimeSeriesData(data);
    console.log(dataPoints);
    renderStockChart(dataPoints);
    
    // Process and display the data on your website
});