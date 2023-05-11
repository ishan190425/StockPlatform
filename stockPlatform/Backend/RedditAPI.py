from stockPlatform.Backend.API import API
import requests
from datetime import datetime

class RedditAPI(API):
    def __init__(self) -> None:
        super().__init__()
        self.client_id = None
        self.client_secret = None
        self.user_agent = None
        
    def fetch_data(self, subreddit, stock):
        url = f'https://www.reddit.com/r/{subreddit}/search.json?q={stock}&restrict_sr=1&sort=new'
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers)
        return response.json()

        
    def parse_data(self, data):
        parsed_data = []

        for post in data['data']['children']:
            if not post['data']['stickied']:
                created_utc = post['data']['created_utc']
                date = datetime.utcfromtimestamp(created_utc).strftime('%Y-%m-%d %H:%M:%S')

                parsed_article = {
                    'title': post['data']['title'],
                    'thumbnail': post['data']['thumbnail'] if 'http' in post['data']['thumbnail'] else None,
                    'url': post['data']['url'],
                    'selftext': post['data']['selftext'][:200] + '...' if post['data']['selftext'] else '',
                    'date': date,
                }
                parsed_data.append(parsed_article)

        return parsed_data

    
    
    def set_api_key(self,API_KEY):
        self.API_KEY = API_KEY
        
    def set_keys(self,client_id,client_secret,user_agent):
        self.client_id = client_id
        self.client_secret = client_secret
        self.user_agent = user_agent

