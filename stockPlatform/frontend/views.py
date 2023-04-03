from django.shortcuts import render
import os
# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse
from stockPlatform.Backend.NewsAPI import NewsAPI

# Replace with your actual API call

news = NewsAPI()
news.set_api_key(os.getenv)
def get_news(request):
    data = news.fetch_data("TSLA")
    data = news.parse_data(data)
    return data
    
    

def index(request):
    return render(request, 'base.html')



    
