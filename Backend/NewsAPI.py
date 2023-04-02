import requests
import API
class NewsAPI(API):
    def __init__(self) -> None:
        super().__init__()
    def fetch_data(self, symbol):
        url = 'https://newsapi.org/v2/everything'
        params = {
            'q': symbol,
            'language': 'en',
            'pageSize': 10,
            'apiKey': self.api_key
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