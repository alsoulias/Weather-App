export default function ToggleUnits({ units, setUnits }) {
  return (
    <div
      className="relative w-28 h-10 bg-gray-700 rounded-full flex items-center cursor-pointer select-none"
      onClick={() => setUnits(units === "imperial" ? "metric" : "imperial")}
    >
      {/* Knob */}
      <div
        className={`absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md transform transition ${
          units === "metric" ? "translate-x-[72px]" : "translate-x-0"
        }`}
      ></div>

      {/* Labels (stay above knob) */}
      <div className="relative z-10 flex w-full justify-between px-4 text-sm font-medium">
        <span
          className={`transition ${
            units === "imperial" ? "text-blue-400 font-bold" : "text-gray-400"
          }`}
        >
          °F
        </span>
        <span
          className={`transition ${
            units === "metric" ? "text-blue-400 font-bold" : "text-gray-400"
          }`}
        >
          °C
        </span>
      </div>
    </div>
  );
}