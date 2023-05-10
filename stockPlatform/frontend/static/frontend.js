async function fetchNews(symbol) {
    const response = await fetch(`/?news=${symbol}`);
    const data = await response.json();
    showNews(data,symbol)
}
async function showNews(data) {
    const articles = data;
    const news = document.getElementById('news');

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        const title = document.createElement('h3');
        title.textContent = article.title;
        articleElement.appendChild(title);

        const image = document.createElement('img');
        image.src = article.urlToImage
        articleElement.appendChild(image)

        const description = document.createElement('p');
        description.textContent = article.description;
        articleElement.appendChild(description);

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Read more';
        description.appendChild(link);

        news.appendChild(articleElement);
    })
}

async function stockSummary() {
    const container = document.createElement('div');
    container.classList.add('tradingview-widget-container');

    const widget = document.createElement('div');
    widget.classList.add('tradingview-widget-container__widget');

    const copyright = document.createElement('div');
    copyright.classList.add('tradingview-widget-copyright');

    const link = document.createElement('a');
    link.href = 'https://www.tradingview.com/symbols/NASDAQ-TSLA/';
    link.rel = 'noopener';
    link.target = '_blank';

    const span = document.createElement('span');
    span.classList.add('blue-text');
    span.textContent = 'TSLA price today';
    copyright.appendChild(link);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
    script.async = true;
    script.textContent = JSON.stringify({
        "symbol": "NASDAQ:TSLA",
        "width": "100%",
        "locale": "en",
        "colorTheme": "light",
        "isTransparent": true
    });

    container.appendChild(widget);
    container.appendChild(script);
    container.appendChild(copyright);
    document.getElementById("stockSummary").appendChild(container);

}
async function stockChart(symbol) {
    const stockChart = document.getElementById("stockCanvas");
    if (stockChart) {
        return;
    }
    const container = document.createElement('div');
    container.id = "stockCanvas";
    container.classList.add('tradingview-widget-container');

    const widget = document.createElement('div');
    widget.classList.add('tradingview-widget-container__widget');

    const copyright = document.createElement('div');
    copyright.classList.add('tradingview-widget-copyright');

    const link = document.createElement('a');
    link.href = `https://www.tradingview.com/symbols/${symbol}/`;
    link.rel = 'noopener';
    link.target = '_blank';

    const span = document.createElement('span');
    span.classList.add('blue-text');

    link.appendChild(span);
    copyright.appendChild(link);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.async = true;
    script.textContent = JSON.stringify({
        "symbols": [
            [
                `${symbol}|1D`
            ]
        ],
        "chartOnly": true,
        "width": '100%',
        "height": 500,
        "locale": "en",
        "colorTheme": "light",
        "autosize": false,
        "showVolume": true,
        "showMA": true,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": true,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "lineWidth": 2,
        "lineType": 0
    });
    container.appendChild(widget);
    container.appendChild(script);
    container.appendChild(copyright);

    document.getElementById('stockChart').appendChild(container);
}

async function stockTape() {
    const container = document.createElement('div');
    container.classList.add('tradingview-widget-container');

    const widget = document.createElement('div');
    widget.classList.add('tradingview-widget-container__widget');

    const copyright = document.createElement('div');
    copyright.classList.add('tradingview-widget-copyright');

    const link = document.createElement('a');
    link.href = 'https://www.tradingview.com/markets/';
    link.rel = 'noopener';
    link.target = '_blank';

    copyright.appendChild(link);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.textContent = JSON.stringify({
        "symbols": [
            {
                "description": "",
                "proName": "NASDAQ:SQQQ"
            },
            {
                "description": "",
                "proName": "NASDAQ:TQQQ"
            },
            {
                "description": "",
                "proName": "NYSE:DOW"
            },
            {
                "description": "",
                "proName": "NASDAQ:NDX"
                
            }
        ],
        "showSymbolLogo": true,
        "colorTheme": "light",
        "isTransparent": false,
        "displayMode": "adaptive",
        "locale": "en"
    });

    container.appendChild(widget);
    container.appendChild(script);
    container.appendChild(copyright);
    document.getElementById("stockTape").appendChild(container);
}

async function fetchCompanyOverviewCopy() {
    const container = document.createElement('div');
    container.id = "companyOverviewDiv"
    container.classList.add('tradingview-widget-container');

    const widget = document.createElement('div');
    widget.classList.add('tradingview-widget-container__widget');

    const copyright = document.createElement('div');
    copyright.classList.add('tradingview-widget-copyright');

    const link = document.createElement('a');
    link.href = 'https://www.tradingview.com/symbols/NASDAQ-AAPL/financials-overview/';
    link.rel = 'noopener';
    link.target = '_blank';
    copyright.appendChild(link);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
    script.async = true;
    script.textContent = JSON.stringify({
        "colorTheme": "light",
        "isTransparent": true,
        "largeChartUrl": "",
        "displayMode": "adaptive",
        "width": '100%',
        "height": 325,
        "symbol": "NASDAQ:TSLA",
        "locale": "en"
    });

    container.appendChild(widget);
    container.appendChild(script);
    container.appendChild(copyright);

    document.getElementById("companyOverview").appendChild(container);

}

async function fetchcompanyProfile(){
    const container = document.createElement('div');
    container.id = "companyProfileDiv"
    container.classList.add('tradingview-widget-container');

    const widget = document.createElement('div');
    widget.classList.add('tradingview-widget-container__widget');

    const copyright = document.createElement('div');
    const link = document.createElement('a');
    link.href = 'https://www.tradingview.com/symbols/NASDAQ-TSLA/';
    link.rel = 'noopener';
    link.target = '_blank';
    const span = document.createElement('span');
    span.classList.add('blue-text');
    span.textContent = 'TSLA key facts';
    // link.appendChild(span);
    copyright.appendChild(link);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
    script.async = true;
    script.textContent = JSON.stringify({
        "width": '100%',
        "height": 325,
        "colorTheme": "light",
        "isTransparent": true,
        "symbol": "NASDAQ:TSLA",
        "locale": "en"
    });

    container.appendChild(widget);
    container.appendChild(copyright);
    container.appendChild(script);
    
    document.getElementById('companyProfile').appendChild(container);
}

async function fetchCompanyNews() {
    const container = document.createElement('div');
    container.id = "companyNewsDiv"
    container.classList.add('tradingview-widget-container');

    const widget = document.createElement('div');
    widget.classList.add('tradingview-widget-container__widget');

    const copyright = document.createElement('div');
    const copyrightLink = document.createElement('a');
    const copyrightSpan = document.createElement('span');

    copyrightLink.href = 'https://www.tradingview.com/symbols/TSLA/history-timeline/';
    copyrightLink.rel = 'noopener';
    copyrightLink.target = '_blank';
    copyrightSpan.classList.add('blue-text');
    copyrightSpan.textContent = 'TSLA history';
    copyrightLink.appendChild(copyrightSpan);
    copyright.appendChild(copyrightLink);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.async = true;
    script.textContent = JSON.stringify({
        "feedMode": "symbol",
        "symbol": "TSLA",
        "colorTheme": "light",
        "isTransparent": true,
        "displayMode": "adaptive",
        "width": '100%',
        "height": 325,
        "locale": "en"
    });

    container.appendChild(widget);
    container.appendChild(copyright);
    container.appendChild(script);
    document.getElementById("news").appendChild(container);
}

async function fetchRedditPosts(symbol) {
    const subredditInput = document.getElementById('subredditInput');
    const subreddit = subredditInput.value || 'wallstreetbets';
    const response = await fetch(`/?subreddit=${subreddit}&stock=${symbol}`);
    const data = await response.json();
    console.log(symbol);
    displayRedditPosts(data);
    
}

function displayRedditPosts(data) {
    const redditPostsContainer = document.getElementById('reddit-posts');

    data.forEach(post => {
        const postContainer = document.createElement('div');
        postContainer.classList.add('reddit-post');

        const postTitle = document.createElement('h3');
        postTitle.innerText = post.title;
        postContainer.appendChild(postTitle);

        const postDate = document.createElement('p');
        postDate.innerText = post.date;
        postDate.classList.add('post-date');
        postContainer.appendChild(postDate);

        if (post.thumbnail) {
            const postImage = document.createElement('img');
            postImage.src = post.thumbnail;
            postImage.alt = post.title;
            postContainer.appendChild(postImage);
        }

        const postContent = document.createElement('p');
        postContent.innerText = post.selftext;
        postContainer.appendChild(postContent);

        const readMoreLink = document.createElement('a');
        readMoreLink.href = post.url;
        readMoreLink.target = '_blank';
        readMoreLink.innerText = 'Read more';
        postContainer.appendChild(readMoreLink);
        redditPostsContainer.appendChild(postContainer);
    });
}

async function fetchIncomeStatement(symbol) {
    const subredditInput = document.getElementById('incomeEarnings');
    const response = await fetch(`/?incomeStatement=${symbol}`);
    const data = await response.json();
    displayIncomeStatement(data)
}

function displayIncomeStatement(data) {
    let html = '<table><thead><tr><th>Fiscal Date Ending</th><th>Reported Currency</th><th>Gross Profit</th><th>Total Revenue</th><th>Cost of Revenue</th><th>Cost of Goods and Services Sold</th><th>Operating Income</th><th>Selling, General, and Administrative</th><th>Research and Development</th><th>Operating Expenses</th><th>Investment Income, Net</th><th>Net Interest Income</th><th>Interest Income</th><th>Interest Expense</th><th>Non-Interest Income</th><th>Other Non-Operating Income</th><th>Depreciation</th><th>Depreciation and Amortization</th><th>Income Before Tax</th><th>Income Tax Expense</th><th>Interest and Debt Expense</th><th>Net Income from Continuing Operations</th><th>Comprehensive Income, Net of Tax</th><th>EBIT</th><th>EBITDA</th><th>Net Income</th></tr></thead><tbody>';

    for (let report of data) {
        html += '<tr>';
        html += `<td>${report.fiscalDateEnding}</td>`;
        html += `<td>${report.reportedCurrency}</td>`;
        html += `<td>${report.grossProfit}</td>`;
        html += `<td>${report.totalRevenue}</td>`;
        html += `<td>${report.costOfRevenue}</td>`;
        html += `<td>${report.costofGoodsAndServicesSold}</td>`;
        html += `<td>${report.operatingIncome}</td>`;
        html += `<td>${report.sellingGeneralAndAdministrative}</td>`;
        html += `<td>${report.researchAndDevelopment}</td>`;
        html += `<td>${report.operatingExpenses}</td>`;
        html += `<td>${report.investmentIncomeNet}</td>`;
        html += `<td>${report.netInterestIncome}</td>`;
        html += `<td>${report.interestIncome}</td>`;
        html += `<td>${report.interestExpense}</td>`;
        html += `<td>${report.nonInterestIncome}</td>`;
        html += `<td>${report.otherNonOperatingIncome}</td>`;
        html += `<td>${report.depreciation}</td>`;
        html += `<td>${report.depreciationAndAmortization}</td>`;
        html += `<td>${report.incomeBeforeTax}</td>`;
        html += `<td>${report.incomeTaxExpense}</td>`;
        html += `<td>${report.interestAndDebtExpense}</td>`;
        html += `<td>${report.netIncomeFromContinuingOperations}</td>`;
        html += `<td>${report.comprehensiveIncomeNetOfTax}</td>`;
        html += `<td>${report.ebit}</td>`;
        html += `<td>${report.ebitda}</td>`;
        html += `<td>${report.netIncome}</td>`;
        html += '</tr>';
    }

    html += '</tbody></table>';
    document.getElementById('incomeStatement').innerHTML = html;
}

async function fetchCompanyOverview(symbol) {
    const response = await fetch(`/?companyOverview=${symbol}`);
    const data = await response.json();
    displayCompanyOverview(data)
}

function displayCompanyOverview(data) {
    const overview = document.getElementById("companyOverview");
    overview.innerHTML = `
    <p><b>Symbol:</b> ${data.Symbol}</p>
    <p><b>Asset Type:</b> ${data.AssetType}</p>
    <p><b>Name:</b> ${data.Name}</p>
    <p><b>Description:</b> ${data.Description}</p>
    <p><b>CIK:</b> ${data.CIK}</p>
    <p><b>Exchange:</b> ${data.Exchange}</p>
    <p><b>Currency:</b> ${data.Currency}</p>
    <p><b>Country:</b> ${data.Country}</p>
    <p><b>Sector:</b> ${data.Sector}</p>
    <p><b>Industry:</b> ${data.Industry}</p>
    <p><b>Address:</b> ${data.Address}</p>
    <p><b>Fiscal Year End:</b> ${data.FiscalYearEnd}</p>
    <p><b>Latest Quarter:</b> ${data.LatestQuarter}</p>
    <p><b>Market Capitalization:</b> ${data.MarketCapitalization}</p>
    <p><b>EBITDA:</b> ${data.EBITDA}</p>
    <p><b>P/E Ratio:</b> ${data.PERatio}</p>
    <p><b>PEG Ratio:</b> ${data.PEGRatio}</p>
    <p><b>Book Value:</b> ${data.BookValue}</p>
    <p><b>Dividend Per Share:</b> ${data.DividendPerShare}</p>
    <p><b>Dividend Yield:</b> ${data.DividendYield}</p>
    <p><b>EPS:</b> ${data.EPS}</p>
    <p><b>Revenue Per Share TTM:</b> ${data.RevenuePerShareTTM}</p>
    <p><b>Profit Margin:</b> ${data.ProfitMargin}</p>
    <p><b>Operating Margin TTM:</b> ${data.OperatingMarginTTM}</p>
    <p><b>Return on Assets TTM:</b> ${data.ReturnOnAssetsTTM}</p>
    <p><b>Return on Equity TTM:</b> ${data.ReturnOnEquityTTM}</p>
    <p><b>Revenue TTM:</b> ${data.RevenueTTM}</p>
    <p><b>Gross Profit TTM:</b> ${data.GrossProfitTTM}</p>
    <p><b>Diluted EPS TTM:</b> ${data.DilutedEPSTTM}</p>
    <p><b>Quarterly Earnings Growth YOY:</b> ${data.QuarterlyEarningsGrowthYOY}</p>
    <p><b>Quarterly Revenue Growth YOY:</b> ${data.QuarterlyRevenueGrowthYOY}</p>
    <p><b>Analyst Target Price:</b> ${data.AnalystTargetPrice}</p>
    <p><b>Trailing P/E:</b> ${data.TrailingPE}</p>
    <p><b>Forward P/E:</b> ${data.ForwardPE}</p>
    <p><b>Price to Sales Ratio TTM:</b> ${data.PriceToSalesRatioTTM}</p>
    <p><b>Price to Book Ratio:</b> ${data.PriceToBookRatio}</p>
    <p><b>EV to Revenue:</b> ${data.EVToRevenue}</p>
    <p><b>EV to EBITDA:</b> ${data.EVToEBITDA}</p>
    <p><b>Beta:</b> ${data.Beta}</p>
    <p><b>52 Week High:</b> ${data["52WeekHigh"]}</p>
    <p><b>52 Week Low:</b> ${data["52WeekLow"]}</p>
    <p><b>50 Day Moving Average:</b> ${data["50DayMovingAverage"]}</p>
    <p><b>200 Day Moving Average:</b> ${data["200DayMovingAverage"]}</p>
    <p><b>Shares Outstanding:</b> ${data.SharesOutstanding}</p>
    <p><b>Dividend Date:</b> ${data.DividendDate}</p>
    <p><b>Ex-Dividend Date:</b> ${data.ExDividendDate}</p>`;
}

async function fetchBalanceSheet(symbol) {
    const response = await fetch(`/?balanceSheet=${symbol}`);
    const data = await response.json();
    displayBalanceSheet(data)
}

function displayBalanceSheet(data) {
    let html = '<table><thead><tr><th>Report Date</th><th>Reported Currency</th><th>Total Assets</th><th>Total Current Assets</th><th>Cash And Cash Equivalents</th><th>Cash And Short Term Investments</th><th>Inventory</th><th>Net Receivables</th><th>Total Non-Current Assets</th><th>Property Plant Equipment</th><th>Accumulated Depreciation And Amortization</th><th>Intangible Assets</th><th>Intangible Assets Excluding Goodwill</th><th>Goodwill</th><th>Investments</th><th>Long Term Investments</th><th>Short Term Investments</th><th>Other Current Assets</th><th>Other Non-Current Assets</th><th>Total Liabilities</th><th>Total Current Liabilities</th><th>Current Accounts Payable</th><th>Deferred Revenue</th><th>Current Debt</th><th>Short Term Debt</th><th>Total Non-Current Liabilities</th><th>Capital Lease Obligations</th><th>Long Term Debt</th><th>Current Long Term Debt</th><th>Long Term Debt Noncurrent</th><th>Short/Long Term Debt Total</th><th>Other Current Liabilities</th><th>Other Non-Current Liabilities</th><th>Total Shareholder Equity</th><th>Treasury Stock</th><th>Retained Earnings</th><th>Common Stock</th><th>Common Stock Shares Outstanding</th></tr></thead><tbody>';

    for (let report of data) {
        html += '<tr>';
        html += `<td>${report.fiscalDateEnding}</td>`;
        html += `<td>${report.reportedCurrency}</td>`;
        html += `<td>${report.totalAssets}</td>`;
        html += `<td>${report.totalCurrentAssets}</td>`;
        html += `<td>${report.cashAndCashEquivalentsAtCarryingValue}</td>`;
        html += `<td>${report.cashAndShortTermInvestments}</td>`;
        html += `<td>${report.inventory}</td>`;
        html += `<td>${report.currentNetReceivables}</td>`;
        html += `<td>${report.totalNonCurrentAssets}</td>`;
        html += `<td>${report.propertyPlantEquipment}</td>`;
        html += `<td>${report.accumulatedDepreciationAmortizationPPE}</td>`;
        html += `<td>${report.intangibleAssets}</td>`;
        html += `<td>${report.intangibleAssetsExcludingGoodwill}</td>`;
        html += `<td>${report.goodwill}</td>`;
        html += `<td>${report.investments}</td>`;
        html += `<td>${report.longTermInvestments}</td>`;
        html += `<td>${report.shortTermInvestments}</td>`;
        html += `<td>${report.otherCurrentAssets}</td>`;
        html += `<td>${report.otherNonCurrentAssets}</td>`;
        html += `<td>${report.totalLiabilities}</td>`;
        html += `<td>${report.totalCurrentLiabilities}</td>`;
        html += `<td>${report.currentAccountsPayable}</td>`;
        html += `<td>${report.deferredRevenue}</td>`;
        html += `<td>${report.currentDebt}</td>`;
        html += `<td>${report.shortTermDebt}</td>`;
        html += `<td>${report.totalNonCurrentLiabilities}</td>`;
        html += `<td>${report.capitalLeaseObligations}</td>`; 
        html += `<td>${report.longTermDebt}</td>`;
        html += `<td>${report.currentLongTermDebt}</td>`;
        html += `<td>${report.longTermDebtNoncurrent}</td>`;
        html += `<td>${report.shortLongTermDebtTotal}</td>`;
        html += `<td>${report.otherCurrentLiabilities}</td>`;
        html += `<td>${report.otherNonCurrentLiabilities}</td>`;
        html += `<td>${report.totalShareholderEquity}</td>`;
        html += `<td>${report.treasuryStock}</td>`;
        html += `<td>${report.retainedEarnings}</td>`;
        html += `<td>${report.commonStock}</td>`;
        html += `<td>${report.commonStockSharesOutstanding}</td>`;
        html += '</tr>';
    }
    html += '</tbody></table>';
    document.getElementById('balanceSheet').innerHTML = html;
}

async function fetchCashFlow(symbol) {
    const response = await fetch(`/?cashFlow=${symbol}`);
    const data = await response.json();
    displayCashFlow(data);
}

function displayCashFlow(cashFlowData) {
    let cashFlowDiv = document.getElementById("cashFlow");
    cashFlowDiv.innerHTML = "<h2>Cash Flow Statement</h2>";
    let table = "<table><thead><tr><th>Fiscal Date Ending</th><th>Reported Currency</th><th>Operating Cashflow</th><th>Payments for Operating Activities</th><th>Proceeds from Operating Activities</th><th>Change in Operating Liabilities</th><th>Change in Operating Assets</th><th>Depreciation, Depletion and Amortization</th><th>Capital Expenditures</th><th>Change in Receivables</th><th>Change in Inventory</th><th>Profit/Loss</th><th>Cashflow from Investment</th><th>Cashflow from Financing</th><th>Proceeds from Repayments of Short Term Debt</th><th>Payments for Repurchase of Common Stock</th><th>Payments for Repurchase of Equity</th><th>Payments for Repurchase of Preferred Stock</th><th>Dividend Payout</th><th>Dividend Payout Common Stock</th><th>Dividend Payout Preferred Stock</th><th>Proceeds from Issuance of Common Stock</th><th>Proceeds from Issuance of Long Term Debt and Capital Securities</th><th>Proceeds from Issuance of Preferred Stock</th><th>Proceeds from Repurchase of Equity</th><th>Proceeds from Sale of Treasury Stock</th><th>Change in Cash and Cash Equivalents</th><th>Change in Exchange Rate</th><th>Net Income</th></tr></thead><tbody>";
    for (let i = 0; i < cashFlowData.length; i++) {
        table += "<tr>";
        table += "<td>" + cashFlowData[i]["fiscalDateEnding"] + "</td>";
        table += "<td>" + cashFlowData[i]["reportedCurrency"] + "</td>";
        table += "<td>" + cashFlowData[i]["operatingCashflow"] + "</td>";
        table += "<td>" + cashFlowData[i]["paymentsForOperatingActivities"] + "</td>";
        table += "<td>" + cashFlowData[i]["proceedsFromOperatingActivities"] + "</td>";
        table += "<td>" + cashFlowData[i]["changeInOperatingLiabilities"] + "</td>";
        table += "<td>" + cashFlowData[i]["changeInOperatingAssets"] + "</td>";
        table += "<td>" + cashFlowData[i]["depreciationDepletionAndAmortization"] + "</td>";
        table += "<td>" + cashFlowData[i]["capitalExpenditures"] + "</td>";
        table += "<td>" + cashFlowData[i]["changeInReceivables"] + "</td>";
        table += "<td>" + cashFlowData[i]["changeInInventory"] + "</td>";
        table += "<td>" + cashFlowData[i]["profitLoss"] + "</td>";
        table += "<td>" + cashFlowData[i]["cashflowFromInvestment"] + "</td>";
        table += "<td>" + cashFlowData[i]["cashflowFromFinancing"] + "</td>";
        table += "<td>" + cashFlowData[i]["proceedsFromRepaymentsOfShortTermDebt"] + "</td>";
        table += "<td>" + cashFlowData[i]["paymentsForRepurchaseOfCommonStock"] + "</td>";
        table += "<td>" + cashFlowData[i]["paymentsForRepurchaseOfEquity"] + "</td>";
        table += "<td>" + cashFlowData[i]["paymentsForRepurchaseOfPreferredStock"] + "</td>";
        table += "<td>" + cashFlowData[i]["dividendPayout"] + "</td>";
        table += "<td>" + cashFlowData[i]["dividendPayoutCommonStock"] + "</td>";
        table += "<td>" + cashFlowData[i]["dividendPayoutPreferredStock"] + "</td>";
        table += "<td>" + cashFlowData[i]["proceedsFromIssuanceOfCommonStock"] + "</td>";
        table += "<td>" + cashFlowData[i]["proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet"] + "</td>";
        table += "<td>" + cashFlowData[i]["proceedsFromIssuanceOfPreferredStock"] + "</td>";
        table += "<td>" + cashFlowData[i]["proceedsFromRepurchaseOfEquity"] + "</td>";
        table += "<td>" + cashFlowData[i]["proceedsFromSaleOfTreasuryStock"] + "</td>";
        table += "<td>" + cashFlowData[i]["changeInCashAndCashEquivalents"] + "</td>";
        table += "<td>" + cashFlowData[i]["changeInExchangeRate"] + "</td>";
        table += "<td>" + cashFlowData[i]["netIncome"] + "</td>";
        table += "</tr>";
    }

    // Display the table in the HTML
    document.getElementById("cashFlow").innerHTML = table;
}


async function fetchEarnings(symbol) {
    const response = await fetch(`/?earnings=${symbol}`);
    const data = await response.json();
    displayEarnings(data);
}

function displayEarnings(data) {
    let earningsDiv = document.getElementById("earnings");

    // Clear the earnings div
    earningsDiv.innerHTML = "";

    // Create a table to display the earnings data
    let table = document.createElement("table");
    table.classList.add("table");

    // Create table header
    let header = table.createTHead();
    let row = header.insertRow();
    let th = document.createElement("th");
    th.textContent = "Quarter";
    row.appendChild(th);
    th = document.createElement("th");
    th.textContent = "Reported EPS";
    row.appendChild(th);
    th = document.createElement("th");
    th.textContent = "Estimated EPS";
    row.appendChild(th);
    th = document.createElement("th");
    th.textContent = "Surprise";
    row.appendChild(th);
    th = document.createElement("th");
    th.textContent = "Surprise %";
    row.appendChild(th);

    // Create table body
    let tbody = document.createElement("tbody");
    data.forEach(function (quarter) {
        row = tbody.insertRow();
        let cell = row.insertCell();
        cell.textContent = quarter.fiscalDateEnding;
        cell = row.insertCell();
        cell.textContent = quarter.reportedEPS;
        cell = row.insertCell();
        cell.textContent = quarter.estimatedEPS;
        cell = row.insertCell();
        cell.textContent = quarter.surprise;
        cell = row.insertCell();
        cell.textContent = quarter.surprisePercentage + "%";
    });

    table.appendChild(tbody);
    earningsDiv.appendChild(table);
}

async function fetchEarningsCalander(symbol) {
    const response = await fetch(`/?earningsCalander=${symbol}`);
    const data = await response.json();
    displayEarningsCalander(data)
}

function displayEarningsCalander(data) {
    const earningsCalander = document.getElementById("earningsCalander");
    earningsCalander.innerHTML = `
    <p><b>Symbol:</b> ${data.symbol}</p>
    <p><b>Name:</b> ${data.name}</p>
    <p><b>Report Date:</b> ${data.reportDate}</p>
    <p><b>Fiscal Date Ending:</b> ${data.fiscalDateEnding}</p>
    <p><b>Estimate:</b> ${data.estimate} EPS</p>
    <p><b>Currency:</b> ${data.currency}</p>`
    
}

async function fetchOptions(symbol) {
    const response = await fetch(`/?options=${symbol}`);
    const data = await response.json();
    displayOptions(data);
}

function displayOptions(data) {
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = ""; // clear previous content

    for (const [expiration, options] of Object.entries(data)) {
        // create a table for each expiration date
        const table = document.createElement("table");
        const caption = document.createElement("caption");
        caption.innerText = `Expiration Date: ${expiration}`;
        table.appendChild(caption);

        // create table header row
        const headerRow = document.createElement("tr");
        ["Ticker", "Strike Price", "Contract Type"].forEach((text) => {
            const cell = document.createElement("th");
            cell.innerText = text;
            headerRow.appendChild(cell);
        });
        table.appendChild(headerRow);

        // create table rows for each option
        options.forEach((option) => {
            const row = document.createElement("tr");
            const tickerCell = document.createElement("td");
            tickerCell.innerText = option.underlying_ticker;
            const strikePriceCell = document.createElement("td");
            strikePriceCell.innerText = option.strike_price;
            const contractTypeCell = document.createElement("td");
            contractTypeCell.innerText = option.contract_type;
            row.appendChild(tickerCell);
            row.appendChild(strikePriceCell);
            row.appendChild(contractTypeCell);
            table.appendChild(row);
        });

        optionsDiv.appendChild(table); // add table to the options div
    }
}

function transitionTab(button, element) {
    hideAll();
    document.getElementById(button).classList.add('active');
    var elm = document.getElementsByClassName(element)
    Array.prototype.forEach.call(elm, function (container) {
        container.classList.remove('hide');
    });
    return fetchSymbol();
}

function updateSymbol() {
    clearStocks();
    boot();
    companyPrices();
}

function boot() {
    var symbol = fetchSymbol();
    stockSummary();
    stockChart(symbol);
    fetchOptions(symbol);
    stockTape();
}

function fetchSymbol() {
    const search = document.getElementById('searchTicker');
    const symbol = search.value || 'TSLA';
    return symbol;
}

function hideAll() {
    var infoButton = document.getElementsByClassName('infoButton');
    Array.prototype.forEach.call(infoButton, function (tab) {
        tab.classList.remove('active');
    });
    var containers = document.getElementsByClassName("container");
    Array.prototype.forEach.call(containers, function (container) {
        container.classList.add('hide');
    });
}   

function companyPrices() {
    var symbol = transitionTab("pricesButton", "Prices");
    fetchOptions(symbol);
}

function companyNews() {
    var symbol = transitionTab("companyNewsButton", "newsContainer");
    if (document.getElementById("companyNewsDiv") == null) {
        fetchCompanyNews();
    }
}

function companyOverview() {
    var symbol = transitionTab("companyOverviewButton", "companyOverviewContainer");
    if (document.getElementById("companyOverviewDiv") == null) {
        fetchCompanyOverviewCopy();
    }
}

function companyProfile() {
    var symbol = transitionTab("companyProfileButton", "companyProfileContainer");
    if (document.getElementById("companyProfileDiv") == null) {
        fetchcompanyProfile();
    }
}
    

function companyIncome() {
    var symbol = transitionTab("companyIncomeButton", "incomeContainer");
    fetchIncomeStatement(symbol);
}

function companyBalanceSheet() {
    var symbol = transitionTab("companyBalanceSheetButton", "balanceSheetContainer");
    fetchBalanceSheet(symbol);
}

function companyCashFlow() {
    var symbol = transitionTab("companyCashFlowButton", "cashFlowContainer");
    fetchCashFlow(symbol);
}

function companyEarnings() { 
    var symbol = transitionTab("companyEarningsButton", "earningsContainer");
    fetchEarnings(symbol);
}

function companyEarningsCalander() {
    var symbol = transitionTab("companyEarningsCalanderButton", "earningsCalanderContainer");
    fetchEarningsCalander(symbol);
}

function companyReddit() {
    var symbol = transitionTab("redditButton", "redditContainer");
    fetchRedditPosts(symbol);
}


function clearStocks(){
    document.getElementById("stockChart").innerHTML = null;
    document.getElementById("options").innerHTML = null
    document.getElementById("news").innerHTML = null;
    document.getElementById("companyOverview") = null;
    document.getElementById("incomeStatement").innerHTML = null;
    document.getElementById("balanceSheet").innerHTML = null;
    document.getElementById("cashFlow").innerHTML = null;
    document.getElementById("earnings").innerHTML = null;
    document.getElementById("earningsCalander").innerHTML = null;
    document.getElementById("reddit-posts").innerHTML = null;
}

function watchlistButton() {
    const container = document.createElement('div');
    // container.id = symbol; TODO: Implement tracking ids
    container.classList.add("watchListItem");
    container.classList.add('tradingview-widget-container');

    const widget = document.createElement('div');
    widget.classList.add('tradingview-widget-container__widget');

    const copyright = document.createElement('div');
    copyright.classList.add('tradingview-widget-copyright');

    const link = document.createElement('a');
    link.href = 'https://www.tradingview.com/symbols/NASDAQ-TSLA/';
    link.rel = 'noopener';
    link.target = '_blank';

    copyright.appendChild(link);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
    script.async = true;
    script.textContent = JSON.stringify({
        "symbol": "NASDAQ:TSLA",
        "width": "100%",
        "colorTheme": "light",
        "isTransparent": true,
        "locale": "en"
    });

    container.appendChild(widget);
    container.appendChild(script);
    container.appendChild(copyright);

    document.getElementById("watchListSearch").appendChild(container);

}

watchlistButton();