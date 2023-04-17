async function fetchStockData(symbol) {
    const response = await fetch(`/?symbol=${symbol}`);
    const data = await response.json();
    return data;
}

function extractTimeSeriesData(jsonData) {
    const timeSeriesData = jsonData['Time Series (15min)'];
    const dataPoints = [];

    for (const timestamp in timeSeriesData) {
        const dataPoint = {
            time: timestamp,
            open: parseFloat(timeSeriesData[timestamp]['1. open']),
            high: parseFloat(timeSeriesData[timestamp]['2. high']),
            low: parseFloat(timeSeriesData[timestamp]['3. low']),
            close: parseFloat(timeSeriesData[timestamp]['4. close']),
            volume: parseInt(timeSeriesData[timestamp]['5. volume']),
        };
        dataPoints.push(dataPoint);
    }

    return dataPoints;
}

function renderStockChart(dataPoints,symbol) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataPoints.map(dp => dp.time),
            datasets: [
                {
                    label: 'Stock Price',
                    data: dataPoints.map(dp => dp.close),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1,
                    fill: true,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                    },
                    adapters: {
                        date: {
                            
                        },
                    }, 
                },
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}


// Call the fetchStockData function with a symbol
fetchStockData('AAPL').then(data => {
    const dataPoints = extractTimeSeriesData(data);
    renderStockChart(dataPoints);
    
    // Process and display the data on your website
});

async function fetchRedditPosts() {
    const subredditInput = document.getElementById('subredditInput');
    const subreddit = subredditInput.value || 'wallstreetbets';
    const stock = "TSLA"
    const response = await fetch(`/?subreddit=${subreddit}&stock=${stock}`);
    const data = await response.json();
    displayRedditPosts(data);
    
}

fetchRedditPosts();

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


async function fetchIncomeStatement() {
    const subredditInput = document.getElementById('incomeEarnings');
    const stock = "TSLA"
    const response = await fetch(`/?incomeStatement=${stock}`);
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



fetchIncomeStatement();

async function fetchCompanyOverview() {
    const response = await fetch(`/?companyOverview=TSLA`);
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

fetchCompanyOverview();

async function fetchBalanceSheet() {
    const response = await fetch(`/?balanceSheet=TSLA`);
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

fetchBalanceSheet();

async function fetchCashFlow() {
    const response = await fetch(`/?cashFlow=TSLA`);
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

fetchCashFlow();

async function fetchEarnings() {
    const response = await fetch(`/?earnings=TSLA`);
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

fetchEarnings()

async function fetchEarningsCalander() {
    const response = await fetch("/?earningsCalander=TSLA");
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

fetchEarningsCalander();


async function fetchOptions() {
    const response = await fetch(`/?options=TSLA`);
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

fetchOptions()