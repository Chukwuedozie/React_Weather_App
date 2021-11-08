import React, { useState } from "react";
 const api = {
  key: "abb98f7d7db679cf9afc85730978a34f",
  url: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [search, setsearch] = useState("");
  const [weather, setweather] = useState({});

  const handleChange = evt => {
    setsearch(evt.target.value);
  };

 const handleSubmit = async event =>{
    if(event.key === "Enter"){
      const res = await fetch(api.url + "weather?q="+ search +"&units=metric&appid=" + api.key);
      const data = await res.json();
      setweather(data);
      setsearch("");
      
    };
  };

  const DateFn= dateObj => {
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months =["January","February","March","April","May","June","July","August","September","October","November","December"];
  
    let day = days[dateObj.getDay()];
    let date = dateObj.getDate();
    let month = months[dateObj.getMonth()];
    let year = dateObj.getFullYear();

    return `${day} ${date} ${month} ${year}`;
    
  }
  return (
    
    <div className={(typeof weather.main != "undefined") ? (weather.main.temp > 15? "app warm" : "app") : "app"}>
    <main>
    
    <div className="input">
      <input
        className="search-box"
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        onKeyPress={handleSubmit}
        value={search}
      />
    </div>
    {(typeof weather.main != "undefined") ? (
    <div>
    <div className="location-date">
       <div className="city">{weather.name} {weather.sys.country}</div>
       <div className="date">{DateFn(new Date())}</div>
    </div>

    <div className="temp">{Math.round(weather.main.temp)}°C</div>
    <div className="weather">
    <div className="condition">{weather.weather[0].main}</div>
    </div>

    </div>
    ) : ("")}

    
    
    </main>
    </div>
    );
}

export default App;
