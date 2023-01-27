import "./WeatherCard.css";

const DAY_HOUR = 6;
const NIGHT_HOUR = 17;

function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const today = new Date(),
    time = today.getHours();

  const getTimeOfDay = (hours) => {
    if (hours >= DAY_HOUR && hours <= NIGHT_HOUR) {
      return "Day";
    } else {
      return "Night";
    }
  };

  const weatherCondition = weatherData?.conditions?.toLowerCase() || "";

  function getWeatherIcon() {
    if (weatherCondition === null) return "";
    if (weatherCondition.includes("clear")) {
      return `Sunny${getTimeOfDay(time)}.svg`;
    } else if (weatherCondition.includes("clouds")) {
      return `Cloudy${getTimeOfDay(time)}.svg`;
    } else if (weatherCondition.includes("fog")) {
      return `Foggy${getTimeOfDay(time)}.svg`;
    } else if (
      weatherCondition.includes("rain") ||
      weatherCondition.includes("drizzle")
    ) {
      return `Rainy${getTimeOfDay(time)}.svg`;
    } else if (weatherCondition.includes("snow")) {
      return `Snowy${getTimeOfDay(time)}.svg`;
    } else {
      return `Stormy${getTimeOfDay(time)}.svg`;
    }
  }

  function checkForRain() {
    if (
      weatherCondition.includes("clear") ||
      weatherCondition.includes("clouds")
    ) {
      return "clear";
    } else {
      return "precip";
    }
  }

  return (
    <div
      className={`weathercard weathercard__background_${getTimeOfDay(
        time
      )}_${checkForRain()}`}
    >
      <h2 className="weathercard__temp">
        {Math.round(weatherData.temperature)}&deg;F
      </h2>
      <div className="weathercard__image-wrWeatherCarder">
        <img
          className="weathercard__image"
          src={process.env.PUBLIC_URL + "/" + getWeatherIcon()}
          alt="Display from WeatherCards"
        />
      </div>
    </div>
  );
}

export default WeatherCard;
