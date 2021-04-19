//element variables
let historyBtn;
let searchInput;
let searchBtn;
let searchedCitiesModal;
let modalBody;
let todaySectionTitle;
let tempCaption;
let humidityCaption;
let windSpeedCaption;
let uvIndexCaption;

let searchHistoryStrs = [""];

window.onload = function() {
    //get document elements
    historyBtn = document.querySelector("#historyBtn");
    searchInput = document.querySelector("#searchInput");
    searchBtn = document.querySelector("#searchBtn");
    searchedCitiesModal = document.querySelector("#searchedCitiesModal");
    modalBody = document.querySelector("#modalBody");
    todaySectionTitle = document.querySelector("#todaySectionTitle");
    tempCaption = document.querySelector("#tempCaption");
    humidityCaption = document.querySelector("#humidityCaption");
    windSpeedCaption = document.querySelector("#windSpeedCaption");
    uvIndexCaption = document.querySelector("#uvIndexCaption");

    //get search history from local storage
    resetSearchHistory();

    //attach event listeners
    // search button - app main method
    searchBtn.addEventListener("click", function(){
        //submitSearch();

        //let city = getCity("Pittsburgh");
        let cityName = searchInput.value;
        let city = getCity(cityName);
        let forecasts = getForecasts(city.lat, city.lng);

        
    });

    //## ui events
    // seach input placeholder toggle
    searchInput.addEventListener("focus", function() {
        console.log("test");
        searchInput.setAttribute("placeholder", "");      
    });

    searchInput.addEventListener("blur", function() {
        searchInput.setAttribute("placeholder", "Search city");
    });
}

// #### functions

function resetSearchHistory() {
    //check if local storage contains list of search text record

    let searchHistoryJsonStr = localStorage.getItem("searchHistoryStrs");
    if (searchHistoryJsonStr !== null) {
        console.log(searchHistoryJsonStr);
        searchHistoryStrs = JSON.parse(searchHistoryJsonStr);
    } else {
        //set ls value if none exists
        searchHistoryStrs = [];
        localStorage.setItem("searchHistoryStrs", searchHistoryStrs);
    }

    //for each serach history string, set a button in modal
    for (let i = 0; i < searchHistoryStrs.length; i++) {
        let searchStr = searchHistoryStrs[i];
        let ssBtn = document.createElement("button");
        ssBtn.classList = "searchHistoryBtn"
        if (ssBtn !== null && modalBody != null) {
            modalBody.appendChild(ssBtn);
        }
    }
}


function submitSearch() {
    let searchText = searchInput.value;
    if (strArrContains(searchHistoryStrs, searchText)) {
        return;
    } else {
        searchHistoryStrs.push(searchText);
        resetSearchHistory();
    }
    
}

// ## modal ui


// ## generic
function titleCase(str) {
    let tcResult = "";
    for (let i = 0; i < str.length; i++) {
        let oneChar = str[i];
        if (i === 0) {
            tcResult += String.toUpperCase(oneChar)
        } else {
            tcResult += String.toLowerCase(oneChar)
        }
    }

    return tcResult;
}

function strArrContains(strArr, matchStr) {
    let fResult = false;
    for (let i = 0; i < strArr.length; i++)
    return fResult;
}

function changeElementVisibility(el, displayStyle) {
    el.style.display = displayStyle;
}

// ## api functions
function getCity(cityName) {
    let city = {
        "name": "",
        "lat": 0,
        "lng": 0
    };

    let rootUrl = "https://api.opencagedata.com/geocode/v1/json?q=";
    let apiKey = "bb67ff620d0e482f8c938020e4aa33d7";

    //api fetch & convert to dto
    fetch(rootUrl + cityName.toLowerCase() +"&key=" + apiKey)
        .then(function(response) {
            return response.json();
    })
    .then(function(data) {
        if (data.results.length > 0)
        {
            //first city name match result. (data ordered desc by population)
            let firstMatch = data.results[0];
            if (firstMatch != null && firstMatch != undefined) {
                if (firstMatch.components != null && firstMatch.geometry != null) {
                    city.name = firstMatch.components.city;
                    city.lat = firstMatch.geometry.lat;
                    city.lng = firstMatch.geometry.lng;
                }
            }
        }
    })
    .catch(function(error) {
        console.log(error);
    });

    return city;
}

function getForecasts(lat, lng) {
    let rootUrl = "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily";

    //api fetch & convert to dto
    fetch(rootUrl + "?lat=" + lat + "&lon=" + lng + "&units=imperial&lang=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "a1bf5f60f3mshd4fde2ec05bae2dp1e4d2fjsnd5b3a9a73204",
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        return data.reults;
    });
    
}

//chris: front end styling
//steph: responsive layout
//a