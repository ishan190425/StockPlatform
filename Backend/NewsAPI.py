import requests
from API import API
import os
import json


class Article:
    def __init__(self, source, author, title, description, url, urlToImage, publishedAt, content):
        self.source = source
        self.author = author
        self.title = title
        self.description = description
        self.url = url
        self.urlToImage = urlToImage
        self.publishedAt = publishedAt
        self.content = content


class NewsAPI(API):
    def __init__(self) -> None:
        super().__init__()
        
    def fetch_data(self, symbol):
        url = 'https://newsapi.org/v2/everything'
        params = {
            'q': symbol,
            'language': 'en',
            'pageSize': 10,
            'apiKey': self.API_KEY
        }
        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            return data['articles']
        else:
            print(f"Error {response.status_code}: {response.text}")
            return []
        
    def set_api_key(self,API_KEY):
        self.API_KEY = API_KEY
        
    def parse_data(self, data):
        parsed_data = []

        for article in data:
            parsed_article = Article(
                source=article['source']['name'],
                author=article['author'],
                title=article['title'],
                description=article['description'],
                url=article['url'],
                urlToImage=article['urlToImage'],
                publishedAt=article['publishedAt'],
                content=article['content']
            )
            parsed_data.append(parsed_article)

        return parsed_data

        
if __name__ == "__main__":
    news = NewsAPI()
    news.set_api_key(os.getenv("NEWS_API_KEY"))
    data = news.fetch_data("TSLA")
    print(data)