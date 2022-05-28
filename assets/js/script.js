// form variables
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
var stateInputEl = document.querySelector("#statename");
var weatherArray = [];
var c;

//var languageButtonsEl = document.querySelector("#language-buttons");
//var repoContainerEl = document.querySelector("#repos-container");
//var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityname = cityInputEl.value.trim();
  var statename = stateInputEl.value.trim();

  if (!cityname || !statename) {
    alert("Please enter a city name");

   
  } else {
    //getWeather(cityname, statename);
    getWeather(40.7,74) //constants for testing
    // clear old content
    cityInputEl.value = "";
    stateInputEl.value = "";

}
};





// add functions to translate lat and lon
// add function to get weather for city based on lat and lon

//function to show the weather we need 
var displayWeather = function(cityData) {
    console.log(cityData);
//0 is today
//1 ++ is future
//if more than 7 days of data stop at 7
    dl = 1; // represents the lowest value we'd want
    if (cityData.daily.length < 6) {
        dl = data.daily.length;
    } else {
        dl = 7;
    }
    
console.log(cityData);
    //create an array 
    weatherArray = [];
//get data for each days weather
    for (i = 0; i < dl;i++) {
        var weatherDate = moment().add(i,"d").format("L");
        var temp = cityData.daily[i].temp.day;
        var UVI = cityData.daily[i].uvi;
        var wind = cityData.daily[i].wind_speed;
        var hum = cityData.daily[i].humidity;
        var desc = cityData.daily[i].weather[0].description;
        var icon = cityData.daily[i].weather[0].icon;
        
        //console.log(temp, UVI, windSpeed, hum, desc, icon);
        //put each days data into our weather array
        weatherArray[i] = {
            weatherDate,
            temp,
            UVI,
            wind,
            hum, 
            desc, 
            icon,
        };
    }
    console.log(weatherArray);
    //display in weather cards
    c=0;
    var day1ContainerArea = document.getElementById("day1-container");
    var day1card = document.createElement("div");
    day1card.classList = "col-auto card card-body";
    day1ContainerArea.innerHTML = ""; //container fresh start
    day1ContainerArea.append(day1card); 
    //header
    var headerEl = document.createElement("h5");
    headerEl.innerHTML = weatherArray[c].weatherDate;
    headerEl.classList = "card-header card-header-date";
    day1card.append(headerEl);
    var headerSpanEl = document.createElement("span");
    headerSpanEl.innerHTML = " " + weatherArray[c].desc;
    headerSpanEl.classList = "card-header-desc";
    headerEl.append(headerSpanEl);
    //card info area
    var cardinfo = document.createElement("div");
    cardinfo.classList = "col-auto card card-body";
    day1card.append(cardinfo); 
    //icon come back to add image
    iconEl = document.createElement("img");
    iconEl.classList = "card-info";
    iconEl.setAttribute("src", "http://openweathermap.org/img/wn/" +
    weatherArray[c].icon +
    "@2x.png");
    iconEl.setAttribute("height", "50px");
    iconEl.setAttribute("alt", weatherArray[c].desc);
    cardinfo.append(iconEl);
    //temp
    var tempEl = document.createElement("p");
    tempEl.innerHTML = "Temperature: " + weatherArray[c].temp + "°F";
    tempEl.classList = "card-info";
    cardinfo.append(tempEl);
    //humidity
    var humEl = document.createElement("p");
    humEl.innerHTML = "Humidity: " + weatherArray[c].hum + "%";
    humEl.classList = "card-info";
    cardinfo.append(humEl);
    //uv index
    var uviEl = document.createElement("p");
    uviEl.innerHTML = "UV Index: " + weatherArray[c].UVI;
    //uv color
    var uviColor;
    if (weatherArray[c].UVI < 3){
        uviColor = "greenUVI";
    } else if (weatherArray[c].UVI < 6) {
        uviColor = "yellowUVI";
    } else if (weatherArray[c].UVI < 8) {
        uviColor = "orangeUVI";
    } else if (weatherArray[c].UVI < 11) {
        uviColor = "redUVI";
    } else if (weatherArray[c].UVI < 10.9999) {
        uviColor = "purpleUVI";
    } else {
        uviColor = "";
    }

    uviEl.classList = "card-info" + uviColor;
    cardinfo.append(dayuviEl);
    //wind
    var windEl = document.createElement("p");
    windEl.innerHTML = "Wind Speed: " + weatherArray[c].wind;
    windEl.classList = "card-info";
    cardinfo.append(windEl);
};
 
var getWeather = function(lat,lon) {

    // format the github api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +
  lat +
  "&lon=" +
  lon +
  "&units=imperial&exclude=hourly,minutely&appid=6047a3a93fe5b57d52141da0dff7f508";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(cityData) {
          console.log(cityData);
          displayWeather(cityData);
        });
      } else {
        alert('Error: City Not Found');
      }
    })
    .catch(function(error) {
      alert("API not connected");
    });
};

var getFeaturedRepos = function(language) {
  // format the github api url
  var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

  // make a get request to url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(cityData) {
        displayRepos(data.items, language);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};



var displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);