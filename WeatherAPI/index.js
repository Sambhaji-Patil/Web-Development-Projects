const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = '94ea497705deed31395629724ff93272';  // Replace with your actual API key from OpenWeatherMap

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/will-it-rain', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send('City is required');
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });

        const forecasts = response.data.list;
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const tomorrowForecasts = forecasts.filter(forecast => {
            const forecastDate = new Date(forecast.dt * 1000);
            return forecastDate.getDate() === tomorrow.getDate();
        });

        const isRaining = tomorrowForecasts.some(forecast => 
            forecast.weather[0].main.toLowerCase().includes('rain') || 
            forecast.weather[0].description.toLowerCase().includes('rain')
        );

        const minTemp = Math.min(...tomorrowForecasts.map(forecast => forecast.main.temp_min));
        const maxTemp = Math.max(...tomorrowForecasts.map(forecast => forecast.main.temp_max));

        const forecastDescription = tomorrowForecasts[0].weather[0].description;

        res.render('index.ejs', {
            result: {
                city: city,
                willItRain: isRaining,
                forecast: forecastDescription,
                minTemp: minTemp,
                maxTemp: maxTemp
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving weather data');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
