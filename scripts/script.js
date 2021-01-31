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

let searchHistoryStrs = [];

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

    //attach event listeners
    searchBtn.addEventListener("click", submitSearch)

    //ui events
    searchInputEl.addEventListener("focus", function() {
        searchInputEl.setAttribute("placeholder", "");      
    });

    searchInputEl.addEventListener("blur", function() {
        searchInputEl.setAttribute("placeholder", "Search city");
    })

    //get search history from local storage
    resetSearchHistory();

}

// #### functions

function resetSearchHistory() {
    //check if local storage contains list of search text record
    let searchHistoryJsonStr = localStorage.getItem("searchHistoryStrs");
    if (searchHistoryJsonStr != null) {
        searchHistoryStrs = JSON.parse(searchHistoryJsonStr);
    } else {
        //set ls value if none exists
        localStorage.setItem("searchHistoryStrs", JSON.stringify(searchHistoryStrs));
    }

    //for each serach history string, set a button in modal
}

function submitSearch() {
    let searchText = searchInputEl.value;
    
}


// ## generic
function changeElementVisibility(el, displayStyle) {
    el.style.display = displayStyle;
}
