import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./WeatherCard";
import Title from "./Title";
import axios from "axios";

const App = () => {
  const [latitude, setlatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundState, setBackgroundState] = useState("default");

  useEffect(() => {
    fetchLocation();
    apiWeather();
  }, [latitude, longitude]);

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      setlatitude(lat);
      setLongitude(long);
    });
  };

  const apiWeather = async () => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: `${latitude},${longitude}` },
      headers: {
        "X-RapidAPI-Key": "4cf6a4a128mshe5cfc932245cd71p150aedjsn517f89930999",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
      let weatherText = response.data.current.condition.text;
      weatherText.includes("rain")
        ? setBackgroundState("rainynight")
        : weatherText.includes("sun")
        ? setBackgroundState("summer")
        : weatherText.includes("Clear")
        ? setBackgroundState("clear")
        : weatherText.includes("Mist")
        ? setBackgroundState("mist")
        : setBackgroundState("default");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className={`app`}>
      <Title />
      {weatherData ? (
        <div className="weather-card">
          <WeatherCard background={backgroundState} data={weatherData} />
        </div>
      ) : null}
    </div>
  );
};

export default App;
