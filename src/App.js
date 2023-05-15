import axios from "axios";
import React, { useState } from "react";
import { ImLocation } from "react-icons/im";
import { WiBarometer, WiHumidity, WiStrongWind } from "react-icons/wi";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response, data);
      });
      setLocation("");
    }
  };

  // const icon = data.weather[0].icon;
  // const iconSource = `https://openweathermap.org/img/wn/${icon}.png`;

  return (
    <div className="w-full h-full">
      <img
        className="fixed w-full h-full object-cover object-center -z-50"
        src="\weather2.jpg"
        alt=""
      />
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/50 -z-40
      "
      ></div>

      <div
        id="container"
        className="flex flex-col w-full h-screen justify-center items-center text-center px-4"
      >
        <div id="search" className="fixed top-6">
          <input
            className="h-7 p-1 rounded-lg outline-none focus:ring-2  ring-amber-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyUp={searchLocation}
            placeholder="Enter city"
            type="text"
          />
        </div>
        <div id="top" className="mb-24 w-[460px] lg:w-full">
          <div id="location" className="flex flex-col items-center mb-20">
            <h1 className="flex text-3xl text-amber-400 font-bold tracking-widest shadow-md shadow-amber-400">
              <ImLocation className="mr-3" />
              {data.name}
            </h1>
            {data.sys ? (
              <h1 className="text-2xl mt-2 font-medium text-white opacity-30">
                {data.sys.country}
              </h1>
            ) : null}
          </div>

          <div className="relative mt-6 w-72 h-48 mx-auto rounded-lg ">
            <div
              id="temp"
              className="text-9xl font-bold -tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-600"
            >
              {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
            </div>
            <div id="description">
              {data.weather ? (
                <p className="absolute w-28 bottom-0 right-0 font-bold text-gray-500 text-lg sm:text-2xl">
                  {data.weather[0].description}
                </p>
              ) : null}
              {data.weather ? (
                <img
                  className="absolute -bottom-[70px] -left-[70px] w-60 h-60"
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt=""
                />
              ) : null}
            </div>
          </div>
        </div>

        <div
          id="bottom"
          className="grid grid-cols-3 -mb-20 md:mt-10 mx-auto w-full sm:w-1/2 md:h-28 bg-gray-300 rounded-2xl shadow-lg shadow-amber-500 "
        >
          <div id="feels" className="flex flex-col items-center justify-center">
            <WiBarometer size={35} className="text-amber-500" />
            {data.main ? (
              <h1 className="text-2xl font-extrabold">
                {data.main.pressure} Pa
              </h1>
            ) : null}
            <p className="text-sm font-semibold text-gray-600">Pressure</p>
          </div>
          <div
            id="humidity"
            className="flex flex-col items-center justify-center"
          >
            <WiHumidity size={35} className="text-amber-500" />
            {data.main ? (
              <h1 className="text-2xl font-extrabold">{data.main.humidity}%</h1>
            ) : null}
            <p className="text-sm font-semibold text-gray-600">Humidity</p>
          </div>
          <div id="wind" className="flex flex-col items-center justify-center">
            <WiStrongWind size={35} className="text-amber-500" />
            {data.wind ? (
              <h1 className="text-2xl font-extrabold">
                {data.wind.speed.toFixed()} m/s
              </h1>
            ) : null}
            <p className="text-sm font-semibold text-gray-600">Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
