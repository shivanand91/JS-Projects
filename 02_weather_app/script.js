document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("cityInput");
    const getWeatherButton = document.getElementById("getWeather");
    const weatherResult = document.getElementById("weatherResult");
    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "e3641e7466927a62d689261dcd429c99" // 


    getWeatherButton.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) {
            alert("Please enter a city name");
            return;
        };

        // it may through an error
        // server/database is always in another continent

        try {
            const weatherData = await fetchWeatherData(city); 
            displayWeather(weatherData);
        } catch (error) {
            showError();
        }

       
    })

    async function fetchWeatherData(city) {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(URL);  
        
        if(!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;
    }

    function displayWeather(data) {
        console.log(data);
        const { name, main, weather } = data;
        cityName.textContent = name;
        temperature.textContent = `${main.temp} °C`;
        description.textContent = weather[0].description;

        errorMessage.classList.add("hidden");
        weatherResult.classList.remove("hidden");
    }

    function showError() {
        errorMessage.classList.remove("hidden");
        weatherResult.classList.add("hidden");
    }

});