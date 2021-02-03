//element variables
let historyBtn;
let searchInputEl;
let searchBtn;
let searchedCitiesModalEl;
let modalBodyEl;
let todaySectionTitleEl;
let tempCaptionEl;
let humidityCaptionEl;
let windSpeedCaptionEl;
let uvIndexCaptionEl;

//search history modal vars
let searchModalEl;
let searchModalBody;
let closeBtn;
let searchModalBgCoverEl;

let searchHistoryStrs = [""];

window.onload = function() {
    //get document elements
    historyBtn = document.querySelector("#historyBtn");
    searchInputEl = document.querySelector("#searchInput");
    searchBtn = document.querySelector("#searchBtn");
    searchedCitiesModalEl = document.querySelector("#searchedCitiesModal");
    modalBodyEl = document.querySelector("#modalBody");
    todaySectionTitleEl = document.querySelector("#todaySectionTitle");
    tempCaptionEl = document.querySelector("#tempCaption");
    humidityCaptionEl = document.querySelector("#humidityCaption");
    windSpeedCaptionEl = document.querySelector("#windSpeedCaption");
    uvIndexCaptionEl = document.querySelector("#uvIndexCaption");

    searchModalEl = document.querySelector("#searchModal");
    searchModalBody = document.querySelector("#searchModalBody")
    closeBtn = document.querySelector("#closeBtn");
    searchModalBgCoverEl = document.querySelector("#searchModalBgCover");

    searchModalBgCoverEl.style.display = "none";

    //get search history from local storage
    //resetSearchHistory();

    //attach event listeners
    historyBtn.addEventListener("click", showHistoryModal)
    searchBtn.addEventListener("click", function(){
        //submitSearch();

        //let city = getCity("Pittsburgh");
        let city = getCity("Portland");
        console.log(city);
        //console.log(city);
    });

    //## ui events
    // seach input placeholder toggle
    searchInputEl.addEventListener("focus", function() {
        console.log("test");
        searchInputEl.setAttribute("placeholder", "");      
    });

    searchInputEl.addEventListener("blur", function() {
        searchInputEl.setAttribute("placeholder", "Search city");
    })

    //close search history modal span
    closeBtn.addEventListener("click", function() {
        changeElementVisibility(searchModalBgCoverEl, "none");
    });
    
    searchModalBgCoverEl.addEventListener("click", function() {
        changeElementVisibility(searchModalBgCoverEl, "none");
    });

    // modal vis ui
    function showHistoryModal(searchHistoryArr) {
        changeElementVisibility(searchModalBgCoverEl, "block");
    }
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
        if (ssBtn !== null && modalBodyEl != null) {
            modalBodyEl.appendChild(ssBtn);
        }
    }
}


function submitSearch() {
    let searchText = searchInputEl.value;
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
    });

    return city;
}

function getForecasts(lat, lng, apiKey) {
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

    });
    

    //high_temp
    //?lat=" + lat + "&lon=" + lng + "&units=imperial&lang=en"
}