from Backend.API import API
import requests
import os

class StockPriceAPI(API):
    def __init__(self) -> None:
        super().__init__()
        
    def fetch_data(self, symbol):
        base_url = 'https://www.alphavantage.co/query?'
        function = 'TIME_SERIES_INTRADAY'
        params = {
            'function': function,
            'symbol': symbol,
            'apikey': self.API_KEY,
            'interval':"15min"
        }

        response = requests.get(base_url, params=params)
        response.raise_for_status()
        return response.json()

    def parse_data(self, data):
        time_series = data['Time Series (15min)']

        parsed_data = []

        for date, price_data in time_series.items():
            parsed_entry = {
                'date': date,
                'open': float(price_data['1. open']),
                'high': float(price_data['2. high']),
                'low': float(price_data['3. low']),
                'close': float(price_data['4. close']),
                'volume': int(price_data['5. volume']),
            }
            parsed_data.append(parsed_entry)

        return parsed_data
    
    def set_api_key(self,API_KEY):
        self.API_KEY = API_KEY