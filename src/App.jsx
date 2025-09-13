import { useState, useEffect } from 'react'
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";


function App() {
  const [city, setCity] = useState("San Francisco")
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)



  async function fetchWeather(queryCity){
    setLoading(true)
    setError("")
    try{
      let url;
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY

      if (/^\d+$/.test(queryCity)){
        //Input is only digits --> zipcode (default to US)
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${queryCity},us&appid=${apiKey}&units=imperial`
      }
      else{
        //string so treat as city name
        url = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${apiKey}&units=imperial`
      }
      const res = await fetch(url)
      if (!res.ok){
        throw new Error("City not found or API Issue")
      }
      const data = await res.json()
      setWeather(data)
    }catch (err){
      setError(err.message)
      setWeather(null)
    }
    setLoading(false)
}

//call the actual fetch command when the city input changes 
useEffect(()=>{
  fetchWeather(city)
},[city])

  return (
   <div className="app"> 
    <h1>🌤️ Weather App</h1>
    <SearchBar onSearch={setCity} placeholder = "Enter city or ZIP..." />

    {loading && <div className="loadingState">
       <i className="fa-solid fa-gear"></i>
      </div>}

   <ErrorMessage message={error}/>
   <WeatherCard weather={weather} />
   </div>
  )
}

export default App
