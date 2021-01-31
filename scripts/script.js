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

    //ui events
    searchInputEl.addEventListener("focus", function() {
        searchInputEl.setAttribute("placeholder", "");      
    });

    searchInputEl.addEventListener("blur", function() {
        searchInputEl.setAttribute("placeholder", "Search city");
    })

}


// ## 
