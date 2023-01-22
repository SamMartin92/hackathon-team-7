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
            'x-api-key': '8Y8TJKHXXOAeqR7tUf7mLx-IwjTz1J9-aYZrjrbAjIA'
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