document.getElementById("getWeather").addEventListener("click", () => {
            const errorElement = document.getElementById("error");
            const weatherInfo = document.getElementById("weatherInfo");
            errorElement.innerText = "";
            weatherInfo.style.display = "none";

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        fetchWeather(lat, lon);
                    },
                    (error) => {
                        errorElement.innerText = "Unable to get location. Please enable location services.";
                    }
                );
            } else {
                errorElement.innerText = "Geolocation is not supported by this browser.";
            }
        });

        function fetchWeather(lat, lon) {
            const apiKey = "YOUR_API_KEY";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch weather data.");
                    }
                    return response.json();
                })
                .then((data) => {
                    document.getElementById("temperature").innerText = data.main.temp;
                    document.getElementById("description").innerText = data.weather[0].description;
                    document.getElementById("location").innerText = data.name;
                    document.getElementById("weatherInfo").style.display = "block";
                })
                .catch((error) => {
                    document.getElementById("error").innerText = "Error fetching weather data. Please try again later ❌";
                    console.error(error);
                });
        }