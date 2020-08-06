import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [currentInput, setCurrentInput] = useState("");
  // const [areaKey, setAreaKey] = useState("");
  const [foreCast, setForeCast] = useState("test");
  // headLine: "",
  // temprature: {
  //   min: "",
  //   max: "",
  // },

  const apiKey = "55MDci99GXjrDobAalHHV6YR4DL8R8YK";

  const userInput = (e) => {
    setCurrentInput(e.target.value);
  };

  const locationKey = () => {
    fetch(
      `http://dataservice.accuweather.com/locations/v1/search?apikey=${apiKey}&q=${currentInput}`
    ).then((response) =>
      response.json().then((data) => getForecast(data[0].Key))
    );
  };

  const getForecast = (areaKey) => {
    fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${areaKey}?apikey=${apiKey}`
    ).then((response) => response.json().then((data) => setForeCast({ data })));
  };

  //i can add forecast function on location fetch request

  // const getForecast = () => {
  //   fetch(
  //     `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${areaKey}?apikey=${apiKey}`
  //   ).then((response) => response.json().then((data) => console.log(data)));
  // };

  //get weather information
  // const getForecast = async (areaKey) => {
  //   const base = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/";
  //   const query = `${areaKey}?apikey=${apiKey}`;

  //   const response = await fetch(base + query);
  //   const data = await response.json();

  //   // console.log(data);
  //   console.log(data);
  // };

  // // get location information
  // const getLocation = async (queryInput) => {
  //   const base = "http://dataservice.accuweather.com/locations/v1/search";
  //   const query = `?apikey=${apiKey}&q=${queryInput}`;

  //   const response = await fetch(base + query);
  //   const data = await response.json();

  //   return data[0];
  // };

  // getLocation(currentInput)
  //   .then((data) => getForecast(data.Key))
  //   .then((data) => console.log(data, "then"));

  return (
    <div>
      <h1>weather app</h1>
      <input onChange={userInput} type="text" />
      <button onClick={locationKey}>get Location Key</button>
      {console.log(foreCast)}
      {/* <button onClick={getForecast}>get forecast</button> */}
    </div>
  );
};

export default App;
