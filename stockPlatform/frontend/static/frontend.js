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

async function fetchRedditPosts() {
    const subredditInput = document.getElementById('subredditInput');
    const subreddit = subredditInput.value || 'wallstreetbets';
    const stock = "TSLA"
    const response = await fetch(`/?subreddit=${subreddit}&stock=${stock}`);
    const data = await response.json();
    displayRedditPosts(data);
    
}

fetchRedditPosts();

function displayRedditPosts(data) {
    const redditPostsContainer = document.getElementById('reddit-posts');

    data.forEach(post => {
        const postContainer = document.createElement('div');
        postContainer.classList.add('reddit-post');

        const postTitle = document.createElement('h3');
        postTitle.innerText = post.title;
        postContainer.appendChild(postTitle);

        const postDate = document.createElement('p');
        postDate.innerText = post.date;
        postDate.classList.add('post-date');
        postContainer.appendChild(postDate);

        if (post.thumbnail) {
            const postImage = document.createElement('img');
            postImage.src = post.thumbnail;
            postImage.alt = post.title;
            postContainer.appendChild(postImage);
        }

        const postContent = document.createElement('p');
        postContent.innerText = post.selftext;
        postContainer.appendChild(postContent);

        const readMoreLink = document.createElement('a');
        readMoreLink.href = post.url;
        readMoreLink.target = '_blank';
        readMoreLink.innerText = 'Read more';
        postContainer.appendChild(readMoreLink);

        redditPostsContainer.appendChild(postContainer);
    });
}
