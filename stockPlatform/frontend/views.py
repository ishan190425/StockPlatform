from django.shortcuts import render
import os
# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse
from Backend.NewsAPI import NewsAPI

# Replace with your actual API call

news = NewsAPI()
news.set_api_key(os.getenv("NEWS_API_KEY"))

def home(request):
    context = get_news(request)
    #return JsonResponse(context)
    return render(request,'base.html',context)

def get_news(request):
    data = news.fetch_data("TSLA")
    data = news.parse_data(data)
    articles = [article.to_dict() for article in data]
    context = {'articles': articles}
    return context


    
