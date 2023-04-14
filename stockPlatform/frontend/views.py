from django.shortcuts import render
import os
# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse
from Backend.NewsAPI import NewsAPI
from Backend.StockPriceAPI import StockPriceAPI
from Backend.RedditAPI import RedditAPI
# Replace with your actual API call

news = NewsAPI()
news.set_api_key(os.getenv("NEWS_API_KEY"))
stock_api = StockPriceAPI()
stock_api.set_api_key(os.getenv("ALPHA_KEY"))
reddit_api = RedditAPI()
reddit_api.set_keys(os.getenv("client_id"),os.getenv("client_secret"),os.getenv("user_agent"))

def home(request):
    context = get_news(request)
    symbol = request.GET.get('symbol', None)
    if symbol:
        data = stock_api.fetch_data(symbol)
        return JsonResponse(data)
    subreddit = request.GET.get('subreddit', None)
    if subreddit:
        data = reddit_api.fetch_data(subreddit,"TSLA")
        parsed_data = reddit_api.parse_data(data)
        return JsonResponse(parsed_data, safe=False)
    return render(request,'base.html',context)

def get_news(request):
    data = news.fetch_data("TSLA")
    data = news.parse_data(data)
    articles = [article.to_dict() for article in data]
    context = {'articles': articles}
    return context


    
