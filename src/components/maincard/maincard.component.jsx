import React from "react";
import "./maincard.style.css";
import rain from "./rain.svg";

const MainCard = ({ date, foreCast }) => {
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
        <div className="weather_image_container">
          <img
            className="weather_image"
            src={rain}
            alt={"rainy"}
            width="48px"
          />
        </div>

        <div className="weather">
          {foreCast.weatherIntensity + " " + foreCast.weatherType}
        </div>
        <div className="feel">Feels Like 35°C</div>
      </div>
    </div>
  );
};

export default MainCard;
