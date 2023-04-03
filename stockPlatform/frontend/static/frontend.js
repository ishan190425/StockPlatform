document.addEventListener('DOMContentLoaded', () => {
    fetch('/news')
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const newsContainer = document.getElementById('news-container');

            articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');

                const title = document.createElement('h3');
                title.textContent = article.title;
                articleElement.appendChild(title);

                const description = document.createElement('p');
                description.textContent = article.description;
                articleElement.appendChild(description);

                const link = document.createElement('a');
                link.href = article.url;
                link.textContent = 'Read more';
                articleElement.appendChild(link);

                newsContainer.appendChild(articleElement);
            });
        });
});
