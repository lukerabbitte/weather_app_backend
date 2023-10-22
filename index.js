import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(express.json())

// Accept requests from frontend server only
const allowedOrigin = 'http://127.0.0.1:5173';

app.use(cors({
    origin: allowedOrigin,
}));

app.listen(
    PORT,
    () => console.log(`Server active on http://localhost:${PORT}`)
)

// Get coordinates based on city name
app.get('/geocoding', async (req, res) => {
    const { cityName, limit } = req.query;
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=e689a22a0aa07bb6cfa7018f8db86a92`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
});

// Get weather based on coordinates
app.get('/weather', async (req, res) => {
    const { lat, lon, lang } = req.query;
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e689a22a0aa07bb6cfa7018f8db86a92&units=metric&lang=${lang}&cnt=40`); // TODO add UI for changing units
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
});

// Get air pollution based on coordinates
app.get('/air_pollution', async (req, res) => {
    const { lat, lon } = req.query;
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=e689a22a0aa07bb6cfa7018f8db86a92`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching air pollution data.' });
    }
});

// Get the first page of results from a Unsplash search of `${city} city`
app.get('/unsplash_photos', async (req, res) => {
    const { city } = req.query;
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=r_wUIHMUiHEOd0pCFkr_VoV2VfxNQY2ID8x4Attz7d4&page=1&orientation=landscape&query=${city} city`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching unsplash data.' });
    }
})
