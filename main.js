const apiKey = '03dc0eace55d4201a07180221240307';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form');
    const input = document.querySelector('#inputCity');
    const cardContainerCurrent = document.querySelector('#cardContainerCurrent');
    const cardContainerForecast = document.querySelector('#cardContainerForecast');
    const currentWeatherPage = document.querySelector('#currentWeatherPage');
    const forecastPage = document.querySelector('#forecastPage');
    const currentWeatherBtn = document.querySelector('#currentWeatherBtn');
    const forecastBtn = document.querySelector('#forecastBtn');

    function removeCards() {
        cardContainerCurrent.innerHTML = '';
        cardContainerForecast.innerHTML = '';
    }

    function showError(container, errorMessage) {
        container.innerHTML = `<div class="card error">${errorMessage}</div>`;
    }

    function showCurrentWeather(city) {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error('The city is not defined or invalid');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }
                return response.json();
            })
            .then(data => {
                removeCards();

                const iconUrl = `https:${data.current.condition.icon}`;
                const localTime = data.location.localtime;

                const html = `<div class="card">
                                <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
                                <div class="card-weather">
                                    <div class="card-value">${data.current.temp_c}<sup>°C</sup></div>
                                    <img class="card-img" src="${iconUrl}" alt="Weather">
                                </div>
                                <div class="card-description">${data.current.condition.text}</div>
                                <div class="card-time">Local Time: ${localTime}</div>`;
                cardContainerCurrent.insertAdjacentHTML('afterbegin', html);
            })
            .catch(error => {
                removeCards();
                showError(cardContainerCurrent, error.message);
            });
    }

    function showForecast(city) {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error('The city is not defined or invalid');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }
                return response.json();
            })
            .then(data => {
                removeCards();

                data.forecast.forecastday.forEach(day => {
                    const iconUrl = `https:${day.day.condition.icon}`;
                    const date = day.date;
                    const temp = day.day.avgtemp_c;
                    const condition = day.day.condition.text;

                    const html = `<div class="card">
                                    <h2 class="card-date">${date}</h2>
                                    <div class="card-weather">
                                        <div class="card-value">${temp}<sup>°C</sup></div>
                                        <img class="card-img" src="${iconUrl}" alt="Weather">
                                    </div>
                                    <div class="card-description">${condition}</div>
                                </div>`;
                    cardContainerForecast.insertAdjacentHTML('beforeend', html);
                });
            })
            .catch(error => {
                removeCards();
                showError(cardContainerForecast, error.message);
            });
    }

    form.onsubmit = function (e) {
        e.preventDefault();
        let city = input.value.trim();

        if (city === "") {
            removeCards();
            showError(cardContainerCurrent, 'The city name can\'t be empty.');
            showError(cardContainerForecast, 'The city name can\'t be empty.');
            return;
        }

        if (currentWeatherPage.classList.contains('active')) {
            showCurrentWeather(city);
        } else if (forecastPage.classList.contains('active')) {
            showForecast(city);
        }
    };

    currentWeatherBtn.addEventListener('click', () => {
        currentWeatherPage.classList.add('active');
        forecastPage.classList.remove('active');
        removeCards();

        let city = input.value.trim();
        if (city === "") {
            showError(cardContainerCurrent, 'The city name can\'t be empty.');
        } else {
            showCurrentWeather(city);
        }
    });

    forecastBtn.addEventListener('click', () => {
        forecastPage.classList.add('active');
        currentWeatherPage.classList.remove('active');
        removeCards();

        let city = input.value.trim();
        if (city === "") {
            showError(cardContainerForecast, 'The city name can\'t be empty.');
        } else {
            showForecast(city);
        }
    });

    // Set default page
    currentWeatherPage.classList.add('active');
});
