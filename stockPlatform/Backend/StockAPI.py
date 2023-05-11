from stockPlatform.Backend.API import API
import requests
import os
import csv

class StockAPI(API):
    def __init__(self) -> None:
        super().__init__()
    
    def generate_params(self, function, symbol,interval=None):
        params = {
            'function': function,
            'symbol': symbol,
            'apikey': self.API_KEY,
        }
        if interval:
            params['interval'] = interval
        return params
    
    def fetch_stock_prices(self,symbol):
        function = 'TIME_SERIES_INTRADAY'
        params = self.generate_params(function,symbol,"15min")
        return self.fetch_data(params)
    
    def fetch_company_overview(self,symbol):
        print("In company overview")
        function = 'OVERVIEW'
        params = self.generate_params(function,symbol)
        company_data = self.fetch_data(params)
        parsed_data = {}
        for key, value in company_data.items():
            if key in ["MarketCapitalization", "EBITDA", "BookValue", "DividendPerShare", "EPS", "RevenuePerShareTTM",
                    "RevenueTTM", "GrossProfitTTM", "DilutedEPSTTM", "AnalystTargetPrice", "PriceToBookRatio",
                    "EVToRevenue", "EVToEBITDA", "52WeekHigh", "52WeekLow", "50DayMovingAverage",
                    "200DayMovingAverage"]:
                parsed_data[key] = "${:,.2f}".format(float(value))
            elif key in ["PERatio", "PEGRatio", "ProfitMargin", "OperatingMarginTTM", "ReturnOnAssetsTTM",
                        "ReturnOnEquityTTM", "QuarterlyEarningsGrowthYOY", "QuarterlyRevenueGrowthYOY",
                        "TrailingPE", "ForwardPE", "PriceToSalesRatioTTM", "Beta"]:
                parsed_data[key] = "{:.2f}".format(float(value))
            elif key == "SharesOutstanding":
                parsed_data[key] = "{:,}".format(int(value))
            else:
                parsed_data[key] = value
        return parsed_data

        
        # Return the JSON string
        return parsed_data
    
    def fetch_income_statement(self, symbol):
        function = 'INCOME_STATEMENT'
        params = self.generate_params(function, symbol)
        data = self.fetch_data(params)
        income_statement = []
        for report in data['annualReports']:
            income_statement.append({
                'fiscalDateEnding': report['fiscalDateEnding'],
                'reportedCurrency': report['reportedCurrency'],
                'grossProfit': "${:,.2f}".format(float(report['grossProfit'])),
                'totalRevenue': "${:,.2f}".format(float(report['totalRevenue'])),
                'costOfRevenue': "${:,.2f}".format(float(report['costOfRevenue'])),
                'costofGoodsAndServicesSold': "${:,.2f}".format(float(report['costofGoodsAndServicesSold'])),
                'operatingIncome': "${:,.2f}".format(float(report['operatingIncome'])),
                'sellingGeneralAndAdministrative': "${:,.2f}".format(float(report['sellingGeneralAndAdministrative'])),
                'researchAndDevelopment': "${:,.2f}".format(float(report['researchAndDevelopment'])),
                'operatingExpenses': "${:,.2f}".format(float(report['operatingExpenses'])),
                'investmentIncomeNet': "${:,.2f}".format(float(report['investmentIncomeNet'])),
                'netInterestIncome': "${:,.2f}".format(float(report['netInterestIncome'])),
                'interestIncome': "${:,.2f}".format(float(report['interestIncome'])),
                'interestExpense': "${:,.2f}".format(float(report['interestExpense'])),
                'nonInterestIncome': "${:,.2f}".format(float(report['nonInterestIncome'])),
                'otherNonOperatingIncome': "${:,.2f}".format(float(report['otherNonOperatingIncome'])),
                'depreciation': "${:,.2f}".format(float(report['depreciation'])),
                'depreciationAndAmortization': "${:,.2f}".format(float(report['depreciationAndAmortization'])),
                'incomeBeforeTax': "${:,.2f}".format(float(report['incomeBeforeTax'])),
                'incomeTaxExpense': "${:,.2f}".format(float(report['incomeTaxExpense'])),
                'interestAndDebtExpense': "${:,.2f}".format(float(report['interestAndDebtExpense'])),
                'netIncomeFromContinuingOperations': "${:,.2f}".format(float(report['netIncomeFromContinuingOperations'])),
                'comprehensiveIncomeNetOfTax': "${:,.2f}".format(float(report['comprehensiveIncomeNetOfTax'])),
                'ebit': "${:,.2f}".format(float(report['ebit'])),
                'ebitda': "${:,.2f}".format(float(report['ebitda'])),
                'netIncome': "${:,.2f}".format(float(report['netIncome']))
            })
        return income_statement

    def fetchBalanceSheet(self, symbol):
        function = 'BALANCE_SHEET'
        params = self.generate_params(function,symbol)
        data = self.fetch_data(params)
        parsed_data = []
        
        for sheet in data['annualReports']:
            parsed_sheet = {}
            parsed_sheet['fiscalDateEnding'] = sheet['fiscalDateEnding']
            parsed_sheet['reportedCurrency'] = sheet['reportedCurrency']

            for key, value in sheet.items():
                if not value or value == "None":
                    parsed_sheet[key] = value
                elif key in ['totalAssets', 'totalCurrentAssets', 'cashAndCashEquivalentsAtCarryingValue', 
                        'cashAndShortTermInvestments', 'inventory', 'currentNetReceivables', 'totalNonCurrentAssets', 
                        'propertyPlantEquipment', 'accumulatedDepreciationAmortizationPPE', 'intangibleAssets', 
                        'intangibleAssetsExcludingGoodwill', 'goodwill', 'investments', 'shortTermInvestments', 
                        'otherCurrentAssets', 'otherNonCurrentAssets', 'totalLiabilities', 'totalCurrentLiabilities', 
                        'currentAccountsPayable', 'deferredRevenue', 'currentDebt', 'shortTermDebt', 
                        'totalNonCurrentLiabilities', 'capitalLeaseObligations', 'longTermDebt', 'currentLongTermDebt', 
                        'shortLongTermDebtTotal', 'otherCurrentLiabilities', 'otherNonCurrentLiabilities', 
                        'totalShareholderEquity', 'retainedEarnings', 'commonStock']:
                    parsed_sheet[key] = "${:,.2f}".format(float(value))
                elif key in ['commonStockSharesOutstanding']:
                    parsed_sheet[key] = "{:,}".format(int(value))
                else:
                    continue
        
            parsed_data.append(parsed_sheet)
        return parsed_data
    
    def fetch_cash_flow(self, symbol):
        function = 'CASH_FLOW'
        params = self.generate_params(function, symbol)
        data = self.fetch_data(params)
        # Define which keys should be formatted as dollars, numbers, or strings
        dollar_keys = ['operatingCashflow', 'paymentsForOperatingActivities', 'proceedsFromOperatingActivities', 
                    'cashflowFromInvestment', 'cashflowFromFinancing', 'proceedsFromRepaymentsOfShortTermDebt',
                    'paymentsForRepurchaseOfCommonStock', 'paymentsForRepurchaseOfEquity', 
                    'paymentsForRepurchaseOfPreferredStock', 'dividendPayout', 'dividendPayoutCommonStock', 
                    'dividendPayoutPreferredStock', 'proceedsFromIssuanceOfCommonStock', 
                    'proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet', 'proceedsFromIssuanceOfPreferredStock', 
                       'proceedsFromRepurchaseOfEquity', 'proceedsFromSaleOfTreasuryStock', 'changeInCashAndCashEquivalents',
                       'netIncome','changeInOperatingLiabilities', 'changeInOperatingAssets', 'depreciationDepletionAndAmortization', 
                    'capitalExpenditures', 'changeInReceivables', 'changeInInventory', 'profitLoss', 'changeInExchangeRate']
        str_keys = ['fiscalDateEnding', 'reportedCurrency']

        # Format and parse the data
        parsed_data = []
        for report in data['annualReports']:
            parsed_report = {}
            for key, value in report.items():
                if value == "None":
                    parsed_report[key] = value
                elif key in dollar_keys:
                    parsed_report[key] = '${:,.2f}'.format(float(value))
                elif key in str_keys:
                    parsed_report[key] = value
                else:
                    continue
            parsed_data.append(parsed_report)
        return parsed_data

    
    def fetch_earnings(self, symbol):
        function = 'EARNINGS'
        params = self.generate_params(function, symbol)
        data = self.fetch_data(params)
        quarterly_earnings = []
        for earnings in data['quarterlyEarnings']:
            quarterly_earning = {}
            for key,value in earnings.items():
                if value == "None":
                    quarterly_earning[key] = value
                elif key in ['reportedEPS','estimatedEPS','surprise']:
                    quarterly_earning[key] = float(value)
                elif key in ['surprisePercentage']:
                    quarterly_earning[key] = '{:,.2f}%'.format(float(value))
                else:
                    quarterly_earning[key] = value
            quarterly_earnings.append(quarterly_earning)

        return quarterly_earnings
            
    
    def fetch_earnings_calander(self,symbol):
        function = 'EARNINGS_CALENDAR'
        params = self.generate_params(function,symbol)
        data = self.fetch_data(params,csv=True)
        reader = csv.DictReader(data.splitlines(), delimiter=',')
        data_dict = list(reader)[0]
        return data_dict
    
    def fetch_ipo_calander(self,symbol):
        function = 'IPO_CALENDAR'
        params = self.generate_params(function,symbol)
        return self.fetch_data(params) 
        
    def fetch_data(self, params,csv=False):
        base_url = 'https://www.alphavantage.co/query?'
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        if csv:
            return response.text
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