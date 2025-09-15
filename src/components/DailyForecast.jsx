export default function DailyForecast({ forecast, units}){
    if (!forecast || forecast.length === 0) return null;

    //Group by day --> which is every 8 entries
    const days = []
    for (let i=0; i<forecast.length; i+=8){
        days.push(forecast[i]);
    }

    return (
        <div className="w-full max-w-4xl mt-8">
            <h3 className="text-xl font-semibold mb-3 text-white">5-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {days.map((day, idx) => {
                    const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`; //grabd weather icon from API
                    const weekday = new Date(day.dt * 1000).toLocaleDateString([],{
                        weekday: "short",
                    })
                    return (
                        <div
                        key={idx}
                        className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center shadow-md text-white"
                        >
                        <p className="font-semibold">{weekday}</p>
                        <img src={iconUrl} alt={day.weather[0].description} className="mx-auto w-12 h-12" />
                        <p className="font-bold">
                            {Math.round(day.main.temp)}°{units === "imperial" ? "F" : "C"}
                        </p>
                        </div>
                    );
                    })
                }
            </div>
        </div>
    )
}