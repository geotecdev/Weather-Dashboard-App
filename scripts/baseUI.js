let historyBtn;
let searchInputEl;
let searchBtn;

window.onload = function() {
    //get elements
    historyBtn = document.querySelector("#historyBtn");
    searchInputEl = document.querySelector("#searchInput");
    searchBtn = document.querySelector("#searchBtn");

    //attach event listeners
    searchInputEl.addEventListener("focus", function() {
        searchInputEl.setAttribute("placeholder", "");        
    });

    searchInputEl.addEventListener("blur", function() {
        searchInputEl.setAttribute("placeholder", "Search city");
    })

}



function changeElementVisibility(el, displayStyle) {
    //el.style.display = displayStyle;
}