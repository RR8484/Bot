const axios = require('axios');
const { key } = require('./config.json')

async function getWeather(location) {
  const apiKey = key; // Replace with your actual API key
  const endpoint = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(location)}`;

  try {
    const response = await axios.get(endpoint);
    const data = response.data;
    if (data.success === false) {
      console.error('Error:', data.error);
      return null;
    } else {
      // Return only the relevant weather data
      return {
        temperature: data.current.temperature,
        weatherDescription: data.current.weather_descriptions[0],
      };
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

module.exports = { getWeather };
