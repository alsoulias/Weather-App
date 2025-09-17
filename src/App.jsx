import { useState, useEffect } from 'react'
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import ToggleUnits from './components/ToggleUnits';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';


function App() {
  const [city, setCity] = useState("San Francisco")
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const[units, setUnits] = useState("imperial") //set default to imperial but add toggle to metric system



  async function fetchWeather(queryCity){
    setLoading(true)
    setError("")
    try{
      let url;
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY

      if (typeof queryCity === "object" && queryCity.lat && queryCity.lon) {
        // user picked from suggestions
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${queryCity.lat}&lon=${queryCity.lon}&appid=${apiKey}&units=${units}`;
    } 
      else if (/^\d+$/.test(queryCity)){
        //Input is only digits --> zipcode (default to US)
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${queryCity},us&appid=${apiKey}&units=${units}`
      }
      else{
        //string so treat as city name
        url = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${apiKey}&units=${units}`
      }

      //Step 1: Get the current general weather : extract the city's coordinates for leveraging later
      const res = await fetch(url)
      if (!res.ok){
        throw new Error("City not found or API Issue")
      }
      const data = await res.json()

      //Step 2: Use lat/lon for 5-day / 3-hour which is the API's free plan to get some hourly and daily forecast data
      const{lat, lon} = data.coord
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
      )

      const forecastData = await forecastRes.json()

      if (!forecastRes.ok){
        throw new Error("Forecast data not available")
      }

      //Merge the data gathered: keep city name but add hourly/daily forecast
      setWeather({
        city: data.name,
        current: data,         // keep /weather response as "current"
        forecast: forecastData // keep /forecast response for hourly/daily
      })
    }catch (err){
      setError(err.message)
      setWeather(null)
    }
    setLoading(false)
}

//call the actual fetch command when the city input changes or when units are changed
useEffect(()=>{
  fetchWeather(city)
},[city, units]) 

  return (
   <div className="app"> 
   <div className="min-h-screen flex flex-col items-center p-6">
    <h1 className="text-3xl font-extrabold text-blue-400 flex items-center gap-2 mb-6">
      <span role="img" aria-label="weather">🌤️</span> Weather App
    </h1>
    {/* Wrap toggle + search bar in one flex container */}
      <div className="flex items-center gap-4 mb-8 w-full max-w-md">
        {/* toggle units */}
        <ToggleUnits units={units} setUnits={setUnits} />

        {/* search bar*/}
        <SearchBar onSearch={setCity} placeholder="Enter city or ZIP..." />
      </div>

        {/* Weather Card */}
      <WeatherCard weather={weather?.current} city={weather?.city} units={units} />

      {/* Hourly Forecast */}
      <HourlyForecast hourly={weather?.forecast?.list || []} units = {units} />

      {/*Daily Forecast */}
      <DailyForecast forecast={weather?.forecast?.list || []} units = {units} />
      

  </div>
      {loading && (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}

   <ErrorMessage message={error}/>
   {/* <WeatherCard weather={weather} units={units} /> */}
   </div>
  )
}

export default App
