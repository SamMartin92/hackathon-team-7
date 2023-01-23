const currencyForm = document.getElementById('currency-form');
currencyForm.addEventListener('submit', exchangeCurrency);

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
    // Set start and targetNums, this changes depending on day because of how data is returned from API and forex opens 22 pm on ???sunday???
    let startNum = 0;
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


const form = document.getElementById('news-form');
form.addEventListener('submit', getParameters);

//sets url according to selected parameters in the news-form
function getParameters(event) {
    event.preventDefault();
    // let countryArr = [];
    // let langArr = [];
    let category = document.getElementById("news-category").value;
    let country = document.getElementById('news-country').value;
    let language = document.getElementById("news-language").value;
    // langArr.push(language);
    // countryArr.push(country);
    // console.log(langArr, countryArr, category);
    // console.log(langArr.toString());
    // for (let i = 0; i < language.length; i++) {
    //     langArr.push(language[i].value);
    // }
    // if (country.length > 0) {
    //     for (let i = 0; i < country.length; i++){
    //         countryArr.push(country[i].value);
    //     }
        let url = `https://api.newscatcherapi.com/v2/latest_headlines?lang=${language}&countries=${country}&topic=${category}&when=1h`;
        getNews(url);
    // } else {
    //     for (let i = 0; i < language.length; i++){
    //     console.log(category);
    //     console.log(langArr.toString());
    //     }
    //     let url = `https://api.newscatcherapi.com/v2/latest_headlines?lang=${langArr.toString()}&topic=${category}&when=1h`;
    //     getNews(url);
    // }
    
}

// request to the newscatcher api with url
async function getNews(url) {
    const options = {
        method: 'GET',
        headers: {
            'x-api-key': 'vQNwRajERWFWP-ePSGXHZJiQj60UgbgupvI32qO4Sg0'
        }
        };
    const response = await fetch(url, options);
    let data = await response.json();
    // gets the news-table, clears any previous content and populates it with the hits from the fetch
    let newsTable = document.getElementById("news-table");
    while(newsTable.firstChild){
        newsTable.removeChild(newsTable.firstChild);
    }
    for (let i = 0; i < data.total_hits - 1; i++){
        newsTable.innerHTML += `<div class="news-div"><h2 class="news-table-header">${data.articles[i].title}</h2>
                                <p class="news-table-para">By: ${data.articles[i].author}, ${data.articles[i].published_date}</p>
                                <p class="news-table-para">${data.articles[i].excerpt}</p>
                                <p class="news-table-para">${data.articles[i].summary}</p>
                                <p class="news-table-para">Rights: ${data.articles[i].rights}</p>
                                <h3 class="news-table-link"><a href="${data.articles[i].link}" target="_blank">FULL ARTICLE HERE</a></h3></div>`;
    }
}