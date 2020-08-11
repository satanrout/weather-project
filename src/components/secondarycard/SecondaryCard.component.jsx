import React from "react";
import "./secondarycard.style.css";

const SecondaryCard = ({ date, otherForeCast }) => {
  // i can add a logic to show add 'ur' to sat
  return (
    <div className="secondary_card">
      <div className="day">
        <div>{date.secondDay}day</div>
        <div>{date.thirdDay}sday</div>
        <div>{date.fourthDay}nesday</div>
        <div>{date.fifthDay}day</div>
      </div>
      <div className="weather_type">
        <div>Rain</div>
        <div>Rain</div>
        <div>Rain</div>
        <div>Rain</div>
      </div>
      <div className="secondary_temperature">
        <div>{otherForeCast.day2}°C</div>
        <div>{otherForeCast.day3}°C</div>
        <div>{otherForeCast.day4}°C</div>
        <div>{otherForeCast.day5}°C</div>
      </div>
    </div>
  );
};

export default SecondaryCard;
