let lat;
let lon;

// get user location
function getUserLocation() {
    navigator.geolocation.getCurrentPosition(
    function (position) { 
      lat = position.coords.latitude;
      lon = position.coords.longitude;
        console.log(lat, lon);
    },
    function (error) {
        console.error(error);
    }
)
}

getUserLocation();


// fetch weather data
function fetchWeather() {
    fetch(`https://api.openweathermap.org/data/4.0/onecall/current?lat= ${lat}&lon= ${lon}&units=metric&lang=en&appid=`)
}