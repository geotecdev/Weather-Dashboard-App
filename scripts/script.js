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
let closeSpan;
let searchModalBgCoverEl;

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

    searchModalEl = document.querySelector("#searchModal");
    searchModalBody = document.querySelector("#searchModalBody")
    closeSpan = document.querySelector("#closeSpan");
    searchModalBgCoverEl = document.querySelector("#searchModalBgCover");

    searchModalBgCoverEl.style.display = "none";

    //get search history from local storage
    resetSearchHistory();

    //attach event listeners
    historyBtn.addEventListener("click", showHistoryModal)
    searchBtn.addEventListener("click", submitSearch)

    //## ui events
    // seach input placeholder toggle
    searchInputEl.addEventListener("focus", function() {
        searchInputEl.setAttribute("placeholder", "");      
    });

    searchInputEl.addEventListener("blur", function() {
        searchInputEl.setAttribute("placeholder", "Search city");
    })

    //close search history modal span
    closeSpan.addEventListener("click", function() {
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

// ## modal ui


// ## generic
function changeElementVisibility(el, displayStyle) {
    el.style.display = displayStyle;
}
