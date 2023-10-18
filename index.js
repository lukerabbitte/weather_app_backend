import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 8080;
const API_KEY = 'e689a22a0aa07bb6cfa7018f8db86a92';
const OPENWEATHERMAP_GEOCODING_API = 'http://api.openweathermap.org/geo/1.0/direct';

app.use(express.json())

// Accepts request from any server
app.use(cors({
}));

app.listen(
    PORT,
    () => console.log(`Server active on http://localhost:${PORT}`)
)

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'green crewneck',
        size: "large"
    });
});

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
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e689a22a0aa07bb6cfa7018f8db86a92&units=metric&lang=${lang}&cnt=4`); // TODO add UI for changing units
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

