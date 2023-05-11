from django.shortcuts import render
import os
# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse
from stockPlatform.Backend.NewsAPI import NewsAPI
from stockPlatform.Backend.StockAPI import StockAPI
from stockPlatform.Backend.RedditAPI import RedditAPI
from stockPlatform.Backend.OptionsAPI import OptionsAPI
# Replace with your actual API call

news_api = NewsAPI()
news_api.set_api_key(os.getenv("NEWS_API_KEY"))
stock_api = StockAPI()
stock_api.set_api_key(os.getenv("ALPHA_KEY"))
reddit_api = RedditAPI()
reddit_api.set_keys(os.getenv("client_id"),os.getenv("client_secret"),os.getenv("user_agent"))
options_api = OptionsAPI()
options_api.set_api_key(os.getenv("POLYGON_API"))


def home(request):
    
    symbol = request.GET.get('symbol', None)
    if symbol:
        data = stock_api.fetch_stock_prices(symbol)
        return JsonResponse(data)
    news = request.GET.get('news',None)
    if news:
        data = news_api.fetch_data(news)
        return JsonResponse(data,safe=False)
    subreddit = request.GET.get('subreddit', None)
    if subreddit:
        stock = request.GET.get('stock', None)
        data = reddit_api.fetch_data(subreddit,stock)
        parsed_data = reddit_api.parse_data(data)
        return JsonResponse(parsed_data, safe=False)
    incomeStatement = request.GET.get("incomeStatement",None)
    if incomeStatement:
        data = stock_api.fetch_income_statement(incomeStatement)
        return JsonResponse(data, safe=False)
    companyOverview = request.GET.get("companyOverview",None)
    if companyOverview: 
        data = stock_api.fetch_company_overview(companyOverview)
        return JsonResponse(data, safe=False)
    balanceSheet = request.GET.get("balanceSheet",None)
    if balanceSheet:
        data = stock_api.fetchBalanceSheet(balanceSheet)
        return JsonResponse(data, safe=False)
    cashFlow = request.GET.get("cashFlow",None)
    if cashFlow:
        data = stock_api.fetch_cash_flow(cashFlow)
        return JsonResponse(data, safe=False)
    earnings = request.GET.get("earnings",None)
    if earnings:
        data = stock_api.fetch_earnings(earnings)
        return JsonResponse(data, safe=False)
    earningsCalander = request.GET.get("earningsCalander", None)
    if earningsCalander:
        data = stock_api.fetch_earnings_calander(earningsCalander)
        return JsonResponse(data, safe=False)
    options = request.GET.get("options",None)
    if options:
        data = options_api.fetch_options(options)
        return JsonResponse(data,safe=False)
    return render(request,'base.html')

def get_news():
    data = news.fetch_data("TSLA")
    data = news.parse_data(data)
    articles = [article.to_dict() for article in data]
    context = {'articles': articles}
    return context


    
