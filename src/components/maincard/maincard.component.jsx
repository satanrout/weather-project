import React from "react";
import "./maincard.style.css";
import rain from "../../images/rain.svg";
import snow from "../../images/snow.svg";
import sunny from "../../images/sunny.svg";
import cloudy from "../../images/cloudy.svg";

const MainCard = ({ date, foreCast }) => {
  const weatherImage = foreCast.weatherType.includes("ain") ? (
    <img className="weather_image" src={rain} alt={"rainy"} width="48px" />
  ) : foreCast.weatherType.includes("un") ? (
    <img className="weather_image" src={sunny} alt={"sunny"} width="48px" />
  ) : foreCast.weatherType.includes("loud") ? (
    <img className="weather_image" src={cloudy} alt={"cloudy"} width="48px" />
  ) : (
    <img className="weather_image" src={snow} alt={"snow"} width="48px" />
  );

  return (
    <div className="main_card">
      <div className="left">
        <div className="date">
          {date.currentDay} {date.currentDate}th {date.currentMonth}
        </div>
        <div className="temperature">{foreCast.temperature.average}°C</div>
        <div className="min_max">
          <span className="min_temperature">
            ↓ {foreCast.temperature.min}°C
          </span>
          <span className="max_temperature">
            ↑ {foreCast.temperature.max}°C
          </span>
        </div>
      </div>
      <div className="right">
        <div className="weather_image_container">{weatherImage}</div>

        <div className="weather">{foreCast.weatherType}</div>
        <div className="feel">
          {foreCast.temperature.average < 25
            ? "it's so cold today"
            : foreCast.temperature.average > 36
            ? "it's really hot today"
            : foreCast.weatherType.includes("Rain")
            ? "bring your umbrella"
            : "nice weather today"}
        </div>
      </div>
    </div>
  );
};

export default MainCard;
