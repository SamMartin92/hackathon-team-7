const form = document.getElementById('news-form');
form.addEventListener('submit', getParameters);

//sets url according to selected parameters in the news-form
function getParameters(event) {
    event.preventDefault();
    let countryArr = [];
    let langArr = [];
    let category = document.getElementById("news-category").value;
    let country = document.getElementById('news-country').selectedOptions;
    let language = document.getElementById("news-language").selectedOptions;

    for (let i = 0; i < language.length; i++) {
        langArr.push(language[i].value);
    }
    if (country.length > 0) {
        for (let i = 0; i < country.length; i++){
            countryArr.push(country[i].value);
        }
        let url = `https://api.newscatcherapi.com/v2/latest_headlines?lang=${langArr.toString()}&countries=${countryArr.toString()}&topic=${category}&when=1h`;
        getNews(url);
    } else {
        for (let i = 0; i < language.length; i++){
        console.log(category);
        console.log(langArr.toString());
        }
        let url = `https://api.newscatcherapi.com/v2/latest_headlines?lang=${langArr.toString()}&topic=${category}&when=1h`;
        getNews(url);
    }
    
}

// request to the newscatcher api with url
async function getNews(url) {
    const options = {
        method: 'GET',
        headers: {
            'x-api-key': 'LAp8tpc2Zc4Bm7nTcRQev8I8MXPkuPIMG79_L8uLVSc'
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
        newsTable.innerHTML += `<h2>${data.articles[i].title}</h2>
                                <p>By: ${data.articles[i].author}, ${data.articles[i].published_date}</p>
                                <p>${data.articles[i].excerpt}</p>
                                <p>${data.articles[i].summary}</p>
                                <p>Rights: ${data.articles[i].rights}</p>
                                <h3><a href="${data.articles[i].link}" target="_blank">FULL ARTICLE HERE</a></h3>`;
    }
}