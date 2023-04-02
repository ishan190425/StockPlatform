class API:
    def __init__(self):
        self.API_KEY = None

    def fetch_data(self, symbol):
        raise NotImplementedError("Subclasses should implement this method")
    
    def set_api_key(self,API_KEY):
        raise NotImplementedError("API KEY not set")