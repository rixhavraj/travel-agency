// Simulated weather data for fallback mode
const mockWeatherData = {
  'Kedarnath': { temp: 5, condition: 'Snow Showers', icon: '❄️' },
  'Badrinath': { temp: 7, condition: 'Partly Cloudy', icon: '⛅' },
  'Nainital': { temp: 15, condition: 'Clear', icon: '☀️' },
  'Mussoorie': { temp: 14, condition: 'Foggy', icon: '🌫️' },
  'Rishikesh': { temp: 22, condition: 'Sunny', icon: '☀️' },
  'Jim Corbett': { temp: 25, condition: 'Sunny', icon: '☀️' },
  'Auli': { temp: 2, condition: 'Snow', icon: '🌨️' },
  'Kainchi Dham': { temp: 16, condition: 'Clear', icon: '☀️' }
};

export const fetchDestinationWeather = async (location) => {
  const apiKey = import.meta.env.VITE_SERPAPI_KEY;

  // FALLBACK MODE: If no API key is set, simulate a network request and return mock data
  if (!apiKey || apiKey === 'your_serpapi_key_here') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = mockWeatherData[location] || { temp: 20, condition: 'Clear', icon: '☀️' };
        resolve({
          temperature: data.temp,
          condition: data.condition,
          icon: data.icon,
          isMock: true
        });
      }, 1500); // Simulate network latency
    });
  }

  // LIVE MODE: Call SerpApi
  try {
    // Note: Calling SerpApi directly from the frontend is not recommended for production due to CORS and key exposure.
    // For demonstration purposes, we are doing it here.
    const response = await fetch(`https://serpapi.com/search.json?q=weather+in+${location}&engine=google&api_key=${apiKey}`);
    const data = await response.json();

    if (data.answer_box && data.answer_box.type === 'weather_result') {
      const condition = data.answer_box.weather;
      let icon = '☀️';
      if (condition.toLowerCase().includes('snow')) icon = '❄️';
      else if (condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('overcast')) icon = '☁️';
      else if (condition.toLowerCase().includes('rain')) icon = '🌧️';

      return {
        temperature: data.answer_box.temperature,
        condition: condition,
        icon: icon,
        isMock: false
      };
    }
    
    // Fallback if SerpApi doesn't return a weather box
    return { temperature: '--', condition: 'Unknown', icon: '❓', isMock: false };

  } catch (error) {
    console.error('SerpApi fetch error:', error);
    // Fallback on error
    return { temperature: '--', condition: 'Error', icon: '⚠️', isMock: true };
  }
};
