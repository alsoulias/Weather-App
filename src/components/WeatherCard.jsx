export default function WeatherCard({ weather, city, units }) {
  if (!weather) return null; // simpler guard

  const icon = weather.weather?.[0]?.icon;
  const description = weather.weather?.[0]?.description;

  return (
    <div className="mt-6 max-w-sm mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 text-center text-white">
      {/* city */}
      <h2 className="text-2xl font-bold mb-2">{city}</h2>
      <p className="capitalize text-gray-300">{description}</p>

      {/* weather icon */}
      {icon && (
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="mx-auto my-4 w-20 h-20"
        />
      )}

      {/* temperature */}
      <p className="text-4xl font-extrabold">
        {Math.round(weather.main.temp)}°{units === "imperial" ? "F" : "C"}
      </p>
      <p className="text-sm text-gray-400">
        Feels like {Math.round(weather.main.feels_like)}°
      </p>

      {/* details */}
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <div className="bg-white/5 rounded-lg p-2">
          💨 {Math.round(weather.wind.speed)} {units === "imperial" ? "mph" : "m/s"}
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          💧 {weather.main.humidity}%
        </div>
      </div>
    </div>
  );
}
