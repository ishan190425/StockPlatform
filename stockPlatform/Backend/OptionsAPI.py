from Backend.API import API
import requests
import os

class OptionsAPI(API):
    def __init__(self):
        super().__init__()

    def fetch_options(self,symbol):
        data = self.fetch_data(symbol)
        expiration_dict = {}
        for result in data['results']:
            expiration_date = result['expiration_date']
            if expiration_date not in expiration_dict:
                expiration_dict[expiration_date] = []
            expiration_dict[expiration_date].append(result)
        
        return expiration_dict
    
    def fetch_data(self, symbol):
        url = "https://api.polygon.io/v3/reference/options/contracts"
        params = {'underlying_ticker':symbol,
                   'limit':'1000',
                   'sort':'expiration_date',
                   'apiKey':self.API_KEY,
                   }
        response = requests.request("GET", url, params=params)
        return response.json()

    def parse_data(self,data):
        pass
    
    def to_dict(self):
        pass
    
    def set_api_key(self,API_KEY):
        self.API_KEY = API_KEY
        print(self.API_KEY)
    
