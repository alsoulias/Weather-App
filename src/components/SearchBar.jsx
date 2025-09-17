import { useState } from "react";

export default function SearchBar({ onSearch, placeholder }){
    const [input, setInput] = useState("")
    const [suggestions, setSuggestions] = useState([])

    async function fetchSuggestions(query){
        if (!query) return setSuggestions([])

        const apiKey = import.meta.env.VITE_WEATHER_API_KEY
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
        
        try{
            const res = await fetch(url)
            if (!res.ok) return
            const data = await res.json()
            setSuggestions(data)    
        }catch(err){
            console.error(err)
        }
        
    }

    function handleSelect(city){
        // Pass back lat/lon so fetchWeather can use it directly
        onSearch({ lat: city.lat, lon: city.lon, name: city.name })
        // setInput(`${city.name}, ${city.state ? city.state + ", " : ""}${city.country}`) --> if you want the search bar to hold your city 
        setInput("") //I want to clear the input so it's ready to accept another city
        setSuggestions([])
    }


    function handleKeyDown(e){
        if (e.key == "Enter" && input.trim() !== ""){
            onSearch(input)
            setInput("")
            setSuggestions([]) //clear the dropdown menu
        }
    }

    return (
       <div className="relative w-full">
        <input
            type="text"
            value={input}
            onChange={(e) => {
            const value = e.target.value;
            setInput(value);
            fetchSuggestions(value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full p-2 rounded-lg text-black"
        />

        {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white text-black rounded-lg shadow-md z-10 max-h-60 overflow-y-auto">
            {suggestions.map((city, idx) => (
                <li
                key={idx}
                onClick={() => handleSelect(city)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                {city.name}
                {city.state ? `, ${city.state}` : ""} ({city.country})
                </li>
            ))}
            </ul>
        )}
        </div>
    )
}