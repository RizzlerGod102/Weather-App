const apiKey = "ffcaebd982d99a5d9de8dd019a46f228";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city) {
        if(!city) return; // prevent empty input

        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            const data = await response.json();

            if(response.status == 404){
                document.querySelector(".weather").style.display = "block";
                document.querySelector(".error").style.display = "none";
            }else{
                
            }

            if(data.cod === "404" || !data.main){
                alert("City not found!");
                return;
            }

            // Update weather info
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Update weather icon dynamically
            const main = data.weather[0].main;
            if(main === "Clouds") weatherIcon.src = "images/clouds.png";
            else if(main === "Clear") weatherIcon.src = "images/clear.png";
            else if(main === "Rain") weatherIcon.src = "images/rain.png";
            else if(main === "Drizzle") weatherIcon.src = "images/drizzle.png";
            else if(main === "Mist") weatherIcon.src = "images/mist.png";

        } catch(err) {
    console.error(err);
    alert("Error fetching weather data!");
    }

        document.querySelector(".weather").style.display = "block";
    }

    // Search button click
    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });

    // Load default city on page load
    checkWeather("New York");