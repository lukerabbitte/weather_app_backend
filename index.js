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
    const { cityName, countryCode, limit } = req.query;
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=e689a22a0aa07bb6cfa7018f8db86a92`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
});

app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=e689a22a0aa07bb6cfa7018f8db86a92`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
});
