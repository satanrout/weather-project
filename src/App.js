import React, { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/header/header.component";
import MainCard from "./components/maincard/maincard.component";
import SecondaryCard from "./components/secondarycard/SecondaryCard.component";

import snow from "./images/snow.webp";
import sunny from "./images/sunny.webp";
import cloudy from "./images/cloudy.webp";
import rain from "./images/rain.webp";

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
  const [loadKey, setLoadKey] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  // const [areaKey, setAreaKey] = useState("");
  const [weather, setWeather] = useState({
    day2: "",
    day3: "",
    day4: "",
    day5: "",
  });
  const [otherForeCast, setOtherForeCast] = useState({
    day2: "",
    day3: "",
    day4: "",
    day5: "",
  });
  const [foreCast, setForeCast] = useState({
    temperature: {
      average: "",
      min: "",
      max: "",
    },
    weatherType: "",
    weatherIntensity: "",
    IconPhrase: "",
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

  const handleClick = () => {
    setLoadKey(!loadKey);
  };

  useEffect(() => {
    fetch(
      `http://dataservice.accuweather.com/locations/v1/search?apikey=${apiKey}&q=${currentInput}`
    ).then((response) =>
      response.json().then((data) => {
        setCurrentLocation(data[0].EnglishName);
        getForecast(data[0].Key);
      })
    );
  }, [loadKey]);

  const getForecast = (areaKey) => {
    fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${areaKey}?apikey=${apiKey}`
    ).then((response) =>
      response.json().then((data) => {
        const days = data.DailyForecasts;
        setForeCast({
          temperature: {
            average: Math.round(
              ((days[0].Temperature.Minimum.Value - 32) * (5 / 9) +
                (days[0].Temperature.Maximum.Value - 32) * (5 / 9)) /
                2
            ),
            min: Math.round((days[0].Temperature.Minimum.Value - 32) * (5 / 9)),
            max: Math.round((days[0].Temperature.Maximum.Value - 32) * (5 / 9)),
          },
          weatherType:
            days[0].Day.HasPrecipitation === true
              ? days[0].Day.PrecipitationIntensity +
                " " +
                days[0].Day.PrecipitationType
              : days[0].Day.IconPhrase,
        });

        setOtherForeCast({
          day2: Math.round(
            ((days[1].Temperature.Minimum.Value - 32) * (5 / 9) +
              (days[1].Temperature.Maximum.Value - 32) * (5 / 9)) /
              2
          ),
          day3: Math.round(
            ((days[2].Temperature.Minimum.Value - 32) * (5 / 9) +
              (days[2].Temperature.Maximum.Value - 32) * (5 / 9)) /
              2
          ),
          day4: Math.round(
            ((days[3].Temperature.Minimum.Value - 32) * (5 / 9) +
              (days[3].Temperature.Maximum.Value - 32) * (5 / 9)) /
              2
          ),
          day5: Math.round(
            ((days[4].Temperature.Minimum.Value - 32) * (5 / 9) +
              (days[4].Temperature.Maximum.Value - 32) * (5 / 9)) /
              2
          ),
        });

        setWeather({
          day2:
            days[1].Day.HasPrecipitation === true
              ? days[1].Day.PrecipitationIntensity +
                " " +
                days[1].Day.PrecipitationType
              : days[1].Day.IconPhrase,
          day3:
            days[2].Day.HasPrecipitation === true
              ? days[2].Day.PrecipitationIntensity +
                " " +
                days[2].Day.PrecipitationType
              : days[2].Day.IconPhrase,
          day4:
            days[3].Day.HasPrecipitation === true
              ? days[3].Day.PrecipitationIntensity +
                " " +
                days[3].Day.PrecipitationType
              : days[3].Day.IconPhrase,
          day5:
            days[4].Day.HasPrecipitation === true
              ? days[4].Day.PrecipitationIntensity +
                " " +
                days[4].Day.PrecipitationType
              : days[4].Day.IconPhrase,
        });
      })
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setLoadKey(!loadKey);
    }
  };

  const background = {
    backgroundImage: foreCast.weatherType.includes("Rain")
      ? `url(${rain})`
      : foreCast.weatherType.includes("Cloudy")
      ? `url(${cloudy})`
      : foreCast.weatherType.includes("now")
      ? `url(${snow})`
      : `url(${sunny})`,
  };

  return (
    <div style={background} className="App">
      <div className="app_container">
        <Header currentLocation={currentLocation} />
        <MainCard foreCast={foreCast} date={date} />
        <SecondaryCard
          weather={weather}
          otherForeCast={otherForeCast}
          date={date}
        />
        <div className="form">
          <div className="form_container">
            <input
              onKeyPress={handleKeyPress}
              placeholder="search for location"
              className="searchInput"
              onChange={userInput}
              type="text"
            />
            <button className="searchButton" onClick={handleClick}>
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
