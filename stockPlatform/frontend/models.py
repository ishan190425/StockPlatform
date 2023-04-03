from django.db import models

# Create your models here.
from django.db import models

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

    def to_dict(self):
        return {
            'source': self.source,
            'author': self.author,
            'title': self.title,
            'description': self.description,
            'url': self.url,
            'urlToImage': self.urlToImage,
            'publishedAt': self.publishedAt,
            'content': self.content
            }

    def parse_data(data):
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



