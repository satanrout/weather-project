import React from "react";
import "./maincard.style.css";
import rain from "./rain.svg";

const MainCard = ({ date }) => {
  return (
    <div className="main_card">
      <div className="left">
        <div className="date">
          {date.currentDay} {date.currentDate}th {date.currentMonth}
        </div>
        <div className="temperature">29°C</div>
        <div className="min_max">
          <span className="min_temperature">↓ 26°C</span>
          <span className="max_temperature">↑ 32°C</span>
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

        <div className="weather">Heavy Rain</div>
        <div className="feel">Feels Like 35°C</div>
      </div>
    </div>
  );
};

export default MainCard;
