import API
class StockPriceAPI(API):
    def __init__(self) -> None:
        super().__init__()
    def fetch_data(self, symbol):
        # Implement data fetching from Stock Price API (e.g., Alpha Vantage or Yahoo Finance) using the symbol
        pass
    def set_api_key(self,API_KEY):
        self.API_KEY = API_KEY