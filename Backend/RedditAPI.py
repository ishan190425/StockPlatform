import API
class RedditAPI(API):
    def __init__(self) -> None:
        super().__init__()
    def fetch_data(self, symbol):
        # Implement data fetching from Reddit API using the symbol
        pass
    def set_api_key(self,API_KEY):
        self.API_KEY = API_KEY
