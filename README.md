# Weather App

A modern, responsive weather application that displays real-time weather data with a beautiful glassmorphism UI design.

## Features

- **Real-time Weather Data** - Get current weather conditions for any location
- **Geolocation Support** - Automatically detect and fetch weather for your current location
- **City Search** - Search for weather by city name with autocomplete suggestions
- **Dynamic UI** - Background gradient and weather icons change based on current weather conditions
- **Detailed Weather Info** - Display temperature, humidity, wind speed, feels-like temperature, and visibility
- **5-Day Forecast** - View weather forecast for the next 5 days
- **Loading State** - Visual feedback with spinner while fetching data
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Build Tool:** Vite
- **Weather API:** OpenWeatherMap
- **Icons:** Font Awesome 6.4.0
- **Fonts:** Google Fonts (Inter)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Chi-hash/WeatherApp.git
cd WeatherApp
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```bash
VITE_API_KEY=your_openweathermap_api_key_here
```

4. Get your API key from [OpenWeatherMap](https://openweathermap.org/api) (free tier available)

## Running the App

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

## Usage

### Get Weather by Location

1. Click the location icon button (bottom right of search bar)
2. Allow browser permission to access your location
3. Weather data will load automatically for your current location

### Search by City

1. Type a city name in the search input
2. Select from the autocomplete suggestions dropdown
3. Press Enter or click the search button
4. Weather data will display for the selected city

### View Weather Details

- **Temperature** - Current temperature in Celsius
- **Description** - Weather condition (Sunny, Cloudy, Rainy, etc.)
- **Humidity** - Current humidity percentage
- **Wind Speed** - Wind speed in m/s
- **Feels Like** - What the temperature feels like
- **Visibility** - Current visibility in km

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_KEY=your_api_key_here
```

**Note:** Never commit `.env` to version control. Add it to `.gitignore`.

## Project Structure

```
WeatherApp/
├── index.html       # Main HTML file
├── index.js         # JavaScript logic and API calls
├── style.css        # Styling and layout
├── package.json     # Dependencies and scripts
└── README.md        # This file
```

## API Reference

This app uses the [OpenWeatherMap API](https://openweathermap.org/api):

- **Weather Endpoint:** `api.openweathermap.org/data/2.5/weather`
- **Geocoding Endpoint:** `api.openweathermap.org/geo/1.0/direct`

## Colors & Design

The app features a beautiful glassmorphism design with dynamic gradients based on weather:

- **Clear** - Orange to Yellow gradient
- **Cloudy** - Gray gradient
- **Rainy** - Blue gradient
- **Snowy** - Cyan gradient
- **Thunderstorm** - Purple gradient

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project is open source and available under the MIT License.

## Author

Created by Chi-hash

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
