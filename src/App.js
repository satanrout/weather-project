import React, { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/header/header.component";
import MainCard from "./components/maincard/maincard.component";
import SecondaryCard from "./components/secondarycard/SecondaryCard.component";

const App = () => {
  const [date, setDate] = useState({
    currentDate: "",
    currentDay: "",
    currentMonth: "",
    secondDay: "",
    thirdDay: "",
    fourthDay: "",
    fifthDay: "",
  });
  const [currentInput, setCurrentInput] = useState("delhi");
  // const [areaKey, setAreaKey] = useState("");
  const [foreCast, setForeCast] = useState({
    headLine: "test",
    test: "",
    temprature: {
      min: "",
      max: "",
    },
  });

  const apiKey = "55MDci99GXjrDobAalHHV6YR4DL8R8YK";

  const userInput = (e) => {
    setCurrentInput(e.target.value);
  };

  useEffect(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    const currentMonth = months[new Date().getMonth()];
    const currentDay = days[new Date().getDay()];
    const currentDate = new Date().getDate();
    const secondDay = days[new Date().getDay() + 1];
    const thirdDay = days[new Date().getDay() + 2];
    const fourthDay = days[new Date().getDay() + 3];
    const fifthDay = days[new Date().getDay() + 4];

    setDate({
      currentDate: currentDate,
      currentDay: currentDay,
      currentMonth: currentMonth,
      secondDay: secondDay,
      thirdDay: thirdDay,
      fourthDay: fourthDay,
      fifthDay: fifthDay,
    });
  }, []);

  const locationKey = () => {
    fetch(
      `http://dataservice.accuweather.com/locations/v1/search?apikey=${apiKey}&q=${currentInput}`
    ).then((response) =>
      response.json().then((data) => getForecast(data[0].Key))
    );
  };

  const getForecast = (areaKey) => {
    fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${areaKey}?apikey=${apiKey}`
    ).then((response) =>
      response.json().then(
        (data) => console.log(data)
        // setForeCast({
        //   headLine: data.Headline.Text,
        //   test: data,
        //   temprature: {
        //     min:
        //       (data.DailyForecasts[0].Temperature.Minimum.Value - 32) * (5 / 9),
        //     max:
        //       (data.DailyForecasts[0].Temperature.Maximum.Value - 32) * (5 / 9),
        //   },
        // })
      )
    );
  };

  return (
    <div className="App">
      <div className="app_container">
        <Header />
        <MainCard date={date} />
        <SecondaryCard date={date} />
        <div className="form">
          <div className="form_container">
            <input
              placeholder="search for location"
              className="searchInput"
              onChange={userInput}
              type="text"
            />
            <button className="searchButton" onClick={locationKey()}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
  /* {foreCast.headLine !== "test" ? (
        <div>
          {console.log(foreCast.test)}
          <h2>{foreCast.headLine}</h2>
          <span>Min: {Math.round(foreCast.temprature.min)}c</span>
          <span>Max: {Math.round(foreCast.temprature.max)}c</span>
        </div>
      ) : null} */
  /* <button onClick={getForecast}>get forecast</button> */
};

export default App;
