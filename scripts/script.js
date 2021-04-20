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

    //# attach event listeners
    //search button - app main method
    searchBtn.addEventListener("click", function() {
        let todayDt = new Date();

        //localstorage logic for search history
        let cityName = searchInput.value;
        let nameExists = stringArrContains(searchHistoryStrs, cityName);
        if (!nameExists) {
            searchHistoryStrs.push(cityName);
            updateSearchHistory(searchHistoryStrs);
        }
        
        //get current weather and city coords from current day "2.5/weather?q=" api call
        const currentWeatherApiPath = currentWeatherUrl + cityName.toLowerCase() + apiKey;
        fetch(currentWeatherApiPath)
        .then(function(response) {
            return response.json();
        })
        .then(function(currentWeather) {
            //# set current day header ui elements
            //todaySectionTitle - Pittsburgh (4/19/2021)
            todaySectionTitle.innerHTML = titleCase(cityName) +  " (" + todayDt.toLocaleDateString() + ")";
            tempCaption.innerHTML = currentWeather.main.temp;
            humidityCaption.innerHTML = currentWeather.main.humidity;
            windSpeedCaption.innerHTML = currentWeather.wind.speed;            

            let lat = currentWeather.coord.lat;
            let lon = currentWeather.coord.lon;

            //use lat and lon as qstring params for onecall fetch
            const onecallApiPath = onecallUrl + "lat=" + lat + "&lon=" + lon + apiKey;
            fetch(onecallApiPath)
            .then(function(response) {
                return response.json();
            })
            .then(function(onecall) {
                //get uv index for current day
                uvIndexCaption.innerHTML = onecall.daily[0].uvi;

                //set forecast thumbnail blocks ui with onecall data
                let dayBlocks = document.querySelectorAll(".dayBlock");
                console.log(dayBlocks);

                for (let i = 1; i < dayBlocks.length; i++) {                    
                    let ocDate = onecall.daily[i];                    
                    let block = dayBlocks[i - 1];
                    block.innerHTML = "";

                    //shortdate
                    let dt = addDays(todayDt, i);
                    let dateCaption = document.createElement("h4");
                    dateCaption.classList = "dayBlockDate";
                    dateCaption.innerHTML = dt.toLocaleDateString();
                    block.appendChild(dateCaption);

                    //icon
                    let blockImg = document.createElement("img");
                    blockImg.classList = "forecastIcon";
                    let iconRef = ocDate.weather[0].icon;
                    blockImg.setAttribute("src", `http://openweathermap.org/img/wn/${iconRef}.png`);
                    block.appendChild(blockImg);

                    //temp
                    let tempCaption = document.createElement("p");
                    tempCaption.classList = "dayBlockCaption";
                    tempCaption.innerHTML = `Temp: ${ocDate.temp.max} <span>&#8457</span>`;
                    block.appendChild(tempCaption);

                    //humidity
                    let humidityCaption = document.createElement("p");
                    humidityCaption.classList = "dayBlockCaption";
                    humidityCaption.innerHTML = `Humidity: ${ocDate.humidity} <span>%</span>`;
                    block.appendChild(humidityCaption);
                }

            });

        });

        // console.log(searchHistoryStrs);
        // console.log(currentWeatherResults);
        // console.log(onecallResults);

    });

    //## ui events
    // seach input placeholder toggle
    searchInput.addEventListener("focus", function() {
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
            ssBtn.addEventListener("click", function() {
                searchInput.value = this.textContent;
                searchBtn.click();
                searchedCitiesModal.click();
            })
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


// ## generic
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function titleCase(str) {
    let tcResult = "";
    for (let i = 0; i < str.length; i++) {
        let oneChar = str[i];
        if (i === 0) {
            tcResult += oneChar.toUpperCase();
        } else {
            tcResult += oneChar.toLowerCase();
        }
    }

    return tcResult;
}

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