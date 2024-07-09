Weather_App

The Weather_App is a simple web application that provides current weather conditions and a 3-day weather forecast for a specified city. The application fetches data from the WeatherAPI (https://www.weatherapi.com/) and displays it in a user-friendly format.

Features
Current Weather: Displays the current temperature, weather condition, and local time for the specified city.
3-Day Forecast: Provides a 3-day weather forecast, including average temperature and weather condition.
Switch between current weather and forecast views.
Responsive design for mobile and desktop views.

Technologies Used
HTML
CSS
JavaScript
WeatherAPI

Prerequisites
A modern web browser (Chrome, Firefox, Safari, etc.)
Internet connection

Installation
Clone the repository:
git clone https://github.com/your-username/weather-app.git
Navigate to the project directory:
cd weather-app
Open index.html in your preferred web browser.

Usage
Open the Weather App in your web browser.
Enter the name of the city you want to search for in the search input field.
Click on the "Current Weather" button to display the current weather for the specified city.
Click on the "Forecast" button to display the 3-day weather forecast for the specified city.

Project Structure
index.html: The main HTML file that contains the structure of the webpage.
css/
main.css: The main CSS file that contains the styling for the webpage.
reset.css: to reduce browser inconsistencies in things like default line heights, margins and font sizes of headings, and so on.
main.js: The JavaScript file that contains the functionality for fetching and displaying the weather information.

API Key
This application uses the WeatherAPI to fetch weather data. You will need an API key to use this service. The current implementation uses a placeholder API key (03dc0eace55d4201a07180221240307). You should replace this with your own API key in the main.js file: const apiKey = 'YOUR_API_KEY_HERE';


