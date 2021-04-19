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

const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
const onecallUrl = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&";
const apiKey = "&appid=d2859c08329856077f40292bd485d4e7";

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

    //when window loads, get search history from local storage, set searchHistoryStrs to arr
    getSearchHistory();

    //attach event listeners
    // search button - app main method
    searchBtn.addEventListener("click", function() {

        //localstorage logic for search history
        let cityName = searchInput.value;
        let nameExists = stringArrContains(searchHistoryStrs, cityName);
        if (!nameExists) {
            searchHistoryStrs.push(cityName);
            updateSearchHistory(searchHistoryStrs);
        }
        
        //get current weather and city coords from current day "2.5/weather?q=" api call
        const currentWeatherApiPath = currentWeatherUrl + cityName.toLowerCase() + apiKey;
        
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
function getSearchHistory() {
    let searchHistoryJsonStr = localStorage.getItem("searchHistoryStrs");
    if (searchHistoryJsonStr !== null) {
        searchHistoryStrs = JSON.parse(searchHistoryJsonStr);
    } else {
        //set default if value if none exists
        searchHistoryStrs = [""];
        localStorage.setItem("searchHistoryStrs", searchHistoryStrs);
    }

    //for each serach history string, set a button in modal
    modalBody.innerHTML = "";
    for (let i = 0; i < searchHistoryStrs.length; i++) {
        let searchStr = searchHistoryStrs[i];
        let ssBtn = document.createElement("button");
        ssBtn.classList = "searchHistoryBtn"
        ssBtn.innerHTML = searchStr;
        if (ssBtn !== null && modalBody != null) {
            modalBody.appendChild(ssBtn);
        }
    }
}

function updateSearchHistory(allSearchStrsArr) {
    let searchHistoryJsonStr = localStorage.getItem("searchHistoryStrs");
    if (searchHistoryJsonStr !== null) {
        //searchHistoryStrs = JSON.parse(searchHistoryJsonStr);
        localStorage.setItem("searchHistoryStrs", JSON.stringify(allSearchStrsArr));
    }

    getSearchHistory();
}

// ## api functions



// ## generic
function stringArrContains(strArr, matchStr) {
    let fResult = false;

    for (let i = 0; i < strArr.length; i++) {
        let item = strArr[i];
        if (matchStr.toLowerCase() === item.toLowerCase()) {
            fResult = true;
            break;
        }
    }

    return fResult;
}

function changeElementVisibility(el, displayStyle) {
    el.style.display = displayStyle;
}