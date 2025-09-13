export default function WeatherCard({ weather }) {
  if (!weather || !weather.main) return null;

  const icon = weather.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p>{weather.weather[0].description}</p>
      <p>🌡️ {weather.main.temp} °F</p>
      <p>💨 {weather.wind.speed} mph</p>
    </div>
  );
}