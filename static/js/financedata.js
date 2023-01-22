const form = document.getElementById('currency-form');
form.addEventListener('submit', exchangeCurrency);

async function exchangeCurrency(event){
    event.preventDefault();
    let chart = document.getElementById('curve_chart');
    while(chart.firstChild){
        chart.removeChild(chart.firstChild);
    }
    let currencyOne = document.getElementById("currencyOne").value;
    let currencyTwo = document.getElementById("currencyTwo").value;
    const apiOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f44866094amshb75f21ef852049fp114f61jsne03ec755eeed',
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };
    let url = `https://alpha-vantage.p.rapidapi.com/query?from_symbol=${currencyOne}&function=FX_DAILY&to_symbol=${currencyTwo}&outputsize=compact&datatype=json`;
    const response = await fetch(url, apiOptions);
        let data = await response.json();
        let stringData = JSON.stringify(data);
        cleanData = JSON.parse(stringData);
        displayNumbers(cleanData, currencyOne, currencyTwo);
}

function displayNumbers(cleanData, currencyOne, currencyTwo) {
    // create array for Date and Opening Value of currency relative to 'convert from' currency
    let dateArray = [];
    let numArray = [];
    // Set start and targetNums, this changes depending on day because of how data is returned from API
    let startNum = 1;
    let targetNum = 138;
    // Get today as a Num, set startNum and targetNum depending on day of the week
    // newDate represents the date from which the function should start collecting data
    today = new Date().getDay();
    let newDate = new Date();
    if (today == 6) {
        newDate.setDate(newDate.getDate() - 1);
        startNum = 2;
        targetNum = 139;
    } else if (today == 0) {
        newDate.setDate(newDate.getDate() - 2);
        startNum = 3;
        targetNum = 140;
    }
    // startDate is the first date that gets pushed into the array to be converted for the graph
    startDate = newDate.toLocaleDateString();
    dateArray.push(`${startDate}`);
    // Push the first exchange value corresponding to startDate
    numArray.push(cleanData['Time Series FX (Daily)'][`${startDate}`]['1. open']);
    for (let i = startNum; i < targetNum; i++) {
        let date = new Date();
        date.setDate(date.getDate() - [i]);
        logDate = date.toLocaleDateString();
        x = date.getDay();
        if (x == 1) {
            i += 2;
        }
        dateArray.push(`${logDate}`);
        numArray.push(cleanData['Time Series FX (Daily)'][`${logDate}`]['1. open']);
    }
    let dataPoints = [];
    dataPoints.push(['Date', 'Open'],);
    for (let i = 99; i > -1; i--){
        dataPoints.push([dateArray[i], parseFloat(numArray[i])]);
    }
    drawChart(dataPoints, currencyOne, currencyTwo);
}

function drawChart(dataPoints, currencyOne, currencyTwo) {
    let data = google.visualization.arrayToDataTable(dataPoints);
    let options = {
      title: `Exchange rate for ${currencyOne} to ${currencyTwo}`,
      legend: { position: 'bottom' }
    };

    let chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}
