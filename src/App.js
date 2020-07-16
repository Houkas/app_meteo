import React, { useState } from 'react';

import { openWeather } from './api/openWeather';
import './App.css';

function getCardinal(angle) {
    
    
    /** 
     * Customize by changing the number of directions you have
     * We have 8
     */
    const degreePerDirection = 360 / 8;
  
    /** 
     * Offset the angle by half of the degrees per direction
     * Example: in 4 direction system North (320-45) becomes (0-90)
     */
    const offsetAngle = angle + degreePerDirection / 2;
  
    return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
      : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
        : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
          : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
            : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
              : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
                : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                  : "NW";
}


function addFav(){

    /*on récupère les données et on prend que le texte*/
    
    var cityName = document.getElementById('city-name').textContent;

    var cityCountry = document.getElementById('country').textContent;

    var cityTemp = document.getElementById('city-temp').textContent;

    var cityMinTemp = document.getElementById('city-temp-min').textContent;

    var cityMaxTemp = document.getElementById('city-temp-max').textContent;

    var cityWind = document.getElementById('wind').textContent;

    var cityWindDeg = document.getElementById('wind-dir').textContent;

    /*Objet info temps en fav */
    var fav = {
        name:cityName,
        country:cityCountry,
        temp:cityTemp,
        min_temp:cityMinTemp,
        max_temp:cityMaxTemp,
        wind:cityWind,
        wind_dir:cityWindDeg
    }

   if(localStorage.getItem('key_fav') === null){

    /* Initialisaton du tableau */
    var key_fav = [];

    /* Ajout de données */
    key_fav.push(fav);

    /* Placer les données dans le local storage du navigateur - convertit le js en json*/
    localStorage.setItem('key_fav', JSON.stringify(key_fav));

   }else{
        /* Sinon prend la key_fav du storage navigateur */
        var key_fav = JSON.parse(localStorage.getItem('key_fav'));

        /*Ajoute fav au tableau */
        key_fav.push(fav);

        /* Re place les infos au storage navigateur */
        localStorage.setItem('key_fav',JSON.stringify(key_fav));
   }

}

const App = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const angle = document.getElementById('value-wind-dir');
    
    const search = async (e) => {
        if(e.key === 'Enter'){
            const data = await openWeather(query);
            setWeather(data);
            setQuery('');
        }
        var mainContainer = document.getElementById("main-container");
        mainContainer.style.justifyContent="unset";
    }
    return(
        
        <div className="main-container" id="main-container">

            <h1>Quel temps fait-il à</h1>

            <input 
            type="text"
            className="search"
            placeholder="Rechercher..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress = {search}
            />

            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span id="city-name">{weather.name}</span>
                        <sup id="country">{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp" id="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    
                    <div className="column_info">
                        <div className="column" id="city-temp-min">
                            <span>Min </span><br></br>
                            {Math.round(weather.main.temp_min)}
                            <sup>&deg;C</sup>
                        </div>
                    </div>
                    <div className="column_info">
                        <div className="column" id="city-temp-max">
                            <span>Max </span><br></br>
                            {Math.round(weather.main.temp_max)}
                            <sup>&deg;C</sup>
                        </div>
                    </div>
                    <div className="column_info">
                        <div className="column" id="wind">
                            <span>Vent </span><br></br>
                            {Math.round(weather.wind.speed)}
                            <sup>Km/h</sup>
                        </div>
                    </div>
                    <div className="column_info">
                        <div className="column" id="wind-dir">
                            <span>Direction </span><br></br>
                            <span className="hidden" id="value-wind-dir">{weather.wind.deg}</span>
                            <sup className="hidden">&deg;</sup>
                            {getCardinal(angle)}
                        </div>
                    </div>
                    
                    <div className="info">
                        <img className="" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>
                        <p>{weather.weather[0].description}</p>
                    </div>
                    <button type="button" className="btn btn-dark" onClick={addFav}>Ajouter aux favoris</button>
                </div>
            )}

            

        </div>
    );
}







export default App;