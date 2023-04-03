class API:
    def __init__(self):
        self.API_KEY = None

    def fetch_data(self, symbol):
        raise NotImplementedError("Subclasses should implement this method")

    def parse_data(self,data):
        raise NotImplementedError("Data is not parsed")
    
    def to_dict(self):
        raise NotImplementedError("Not returned as dict not set")
    
    def set_api_key(self,API_KEY):
        raise NotImplementedError("API KEY not set")
    