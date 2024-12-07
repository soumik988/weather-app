const apiKey = "38fbc7d407f3515a41865bb31016d776";
const apiuRL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector("#weather-icon");

async function checkweather(city) {
    try {
        const response = await fetch(apiuRL + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

        

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Weather condition handling
        console.log("Weather condition:", data.weather[0].main);

        if (data.weather[0].main === "Clouds") {
            weathericon.src = "clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weathericon.src = "clear.png";
        } else if (data.weather[0].main === "Rain") {
            weathericon.src = "rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weathericon.src = "drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weathericon.src = "mist.png";
        } else {
            console.error("Unexpected weather condition:", data.weather[0].main);
            weathericon.src = "clear.png"; // Default image
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching weather data.");
    }

    document.querySelector(".weather").style.display="block";
}

searchbtn.addEventListener("click", () => {
    const city = searchbox.value;
    if (city.trim() === "") {
        alert("Please enter a city name.");
        return;
    }
    checkweather(city);
});
