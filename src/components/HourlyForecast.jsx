import { useRef } from "react";

export default function HourlyForecast({ hourly, units }) {
  if (!hourly || hourly.length === 0) return null;

  const scrollRef = useRef(null);
  const next24 = hourly.slice(0, 8); // first 24 hours (3h × 8 = 24h)

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-4xl mt-8 relative">
      <h3 className="text-xl font-semibold mb-3 text-white">Next 24 Hours</h3>

      {/* Scroll buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center z-10"
      >
        ‹
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center z-10"
      >
        ›
      </button>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
      >
        {next24.map((hour, idx) => {
          const iconUrl = `http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`;
          const time = new Date(hour.dt * 1000).toLocaleTimeString([], {
            hour: "numeric",
          });

          return (
            <div
              key={idx}
              className="flex-shrink-0 w-24 bg-white/10 backdrop-blur-md rounded-lg p-3 text-center shadow-md text-white"
            >
              <p className="text-sm">{time}</p>
              <img
                src={iconUrl}
                alt={hour.weather[0].description}
                className="mx-auto w-12 h-12"
              />
              <p className="font-bold">
                {Math.round(hour.main.temp)}°{units === "imperial" ? "F" : "C"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
