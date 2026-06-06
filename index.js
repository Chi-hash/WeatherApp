let lat;
let lon;
const apiKey = import.meta.env.VITE_API_KEY;


const weatherMap = {
    'clear': {
        gradient: 'linear-gradient(to bottom, #f97316, #fde68a)',
        icon: 'fas fa-sun'
    },
    'clouds': {
        gradient: 'linear-gradient(to bottom, #9ca3af, #d1d5db)',
        icon: 'fas fa-cloud'
    },
    'rain': {
        gradient: 'linear-gradient(to bottom, #3b82f6, #93c5fd)',
        icon: 'fas fa-cloud-showers-heavy'
    },
    'snow': {
        gradient: 'linear-gradient(to bottom, #e5e7eb, #f3f4f6)',
        icon: 'fas fa-snowflake'
    },
    'thunderstorm': {
        gradient: 'linear-gradient(to bottom, #1f2937, #374151)',
        icon: 'fas fa-bolt'
    },
    'mist': {
        gradient: 'linear-gradient(to bottom, #9ca3af, #d1d5db)',
        icon: 'fas fa-smog'
    },
    'fog': {
        gradient: 'linear-gradient(to bottom, #9ca3af, #d1d5db)',
        icon: 'fas fa-smog'
    }
}

// get user location
function getUserLocation() {
    navigator.geolocation.getCurrentPosition(
    function (position) { 
      lat = position.coords.latitude;
      lon = position.coords.longitude;
            console.log(lat, lon);
            fetchWeather();
    },
    function (error) {
        console.error(error);
    }
    )
   
}

getUserLocation();


// fetch weather data
function fetchWeather() {


    document.querySelector('.container').style.filter = 'blur(5px)';
    document.querySelector('.loading-state').style.display = 'block';


 fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateUI(data);
            fetchForecast();
            document.querySelector('.loading-state').style.display = 'none';
            document.querySelector('.container').style.filter = 'blur(0)';
        })
}




// update ui
function updateUI(data) {
    const temp = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const location = document.querySelector('.location');
    const humidity = document.querySelector('.humidity span');
    const wind = document.querySelector('.wind-speed span');
    const feelsLike = document.querySelector('.feels-like span');
    const visibility = document.querySelector('.visibility span');
    const weatherCondition = data.weather[0].main.toLowerCase();
    const weather = weatherMap[weatherCondition] || weatherMap['mist'];
    document.querySelector('section').style.background = weather.gradient;

    // timetstamp
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
     // get am or pm
    const ampm = hours >= 12 ? 'PM'
        : 'AM';
    document.querySelector('.weather-updated').textContent = `Last updated: ${timeString}  ${ampm}`;
   


    temp.textContent = `${data.main.temp}°C`;
    description.textContent = data.weather[0].main;
    location.textContent = `${data.name}, ${data.sys.country}`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    feelsLike.textContent = `${data.main.feels_like}°C`;
    visibility.textContent = `${data.visibility / 1000} km`;





    // update weather icon
    const icon = document.querySelector('.fa-sun');
    const weatherMain = data.weather[0].main.toLowerCase();

    document.querySelector('.weather-state i').className = weather.icon;


}



const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', search);

//search button logic
function search() {
    const searchInput = document.querySelector('.search-input');
    const city = searchInput.value.trim();
    if (city) {

        
    document.querySelector('.container').style.filter = 'blur(5px)';
        document.querySelector('.loading-state').style.display = 'block';
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                updateUI(data);
                fetchForecast();
                  document.querySelector('.loading-state').style.display = 'none';
            document.querySelector('.container').style.filter = 'blur(0)';
            })
            .catch(error => {
                console.error(error);
                alert('City not found. Please try again.');
            });

    }
   
}


const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        search();
    }
});



// dropdown logic
const searchInputElement = document.querySelector('.search-input');
const searchResultsDiv = document.querySelector('.search-results');

// Listen for input changes
searchInputElement.addEventListener('input', async function() {
  const city = searchInputElement.value.trim();
  
  // Hide dropdown if input is empty or too short
  if (city.length < 2) {
    searchResultsDiv.style.display = 'none';
    searchResultsDiv.innerHTML = '';
    return;
  }
  
  try {
    // Call geocoding API
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
    const cities = await response.json();
    
    // Clear old results
    searchResultsDiv.innerHTML = '';
    
    // Loop through results and create dropdown items
    cities.forEach(cityData => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.textContent = `${cityData.name}, ${cityData.country}`;
      
      // Add click listener to each result
      resultItem.addEventListener('click', function() {
        searchInputElement.value = cityData.name;
        search();
        searchResultsDiv.style.display = 'none';
      });
      
      searchResultsDiv.appendChild(resultItem);
    });
    
    // Show the dropdown
    searchResultsDiv.style.display = 'block';
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
});

// Hide dropdown when clicking outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('.search-container')) {
    searchResultsDiv.style.display = 'none';
  }
});



// 5 day forcast
function fetchForecast() {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      updateForecast(data.list);
    })
    .catch(error => console.error('Error fetching forecast:', error));
}

//updat forecast ui
function updateForecast(forecastList) {
  const forecastItems = document.querySelectorAll('.forecast-item');
  
  // Get one forecast per day (every 8 items = 24 hours)
  for (let i = 0; i < 5; i++) {
    const forecast = forecastList[i * 8]; // Get data at index 0, 8, 16, 24, 32
    
    const day = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(forecast.main.temp);
    const condition = forecast.weather[0].main.toLowerCase();
    const weatherData = weatherMap[condition] || weatherMap['mist'];
    
    // Update the forecast item
    forecastItems[i].querySelector('.forecast-day').textContent = day;
    forecastItems[i].querySelector('.forecast-temperature').textContent = `${temp}°C`;
    forecastItems[i].querySelector('i').className = weatherData.icon;
  }
}
