from API import API
class TwitterAPI(API):
    def __init__(self) -> None:
        super().__init__()
    def fetch_data(self, symbol):
        # Implement data fetching from Twitter API using the symbol
        pass
    def parse_data(self, data):
        pass
    def set_api_key(self,API_KEY):
        self.API_KEY = API_KEY