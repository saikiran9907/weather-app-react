import { useState } from 'react';
import './WeatherApp.css'
import searchIcon from '../../assets/search.png';
import cloudIcon from '../../assets/cloud.png';
import sunnyIcon from '../../assets/clear.png';
import drizleIcon from '../../assets/drizzle.png';
import humidityIcon from '../../assets/humidity.png';
import windIcon from '../../assets/wind.png';
import snowIcon from '../../assets/snow.png';
import rainIcon from '../../assets/rain.png';



export const WeatherApp = () =>{
    const [searchInput, setSearchValue] = useState('');
    const [humidity, setHumidity]= useState('00 %');
    const [windSpeed, setwindSpeed]= useState('0.00 km/h');
    const [temp, setTemp] = useState('00.00° C');
    const [weatherIcon, setweatherIcon] = useState(cloudIcon);
    const [errorMessage, setErrorMessage] = useState('');


    const searchInputChange = async (e) =>{
        setErrorMessage('');
    }
    const search = async () =>{
        const API_KEY = 'ed50a8be01e7a2a72a71dc87909626d9';
        let getValue = document.getElementById('inputElement')
        if(!getValue.value){
          return
        }
        setSearchValue(getValue.value)
        let inputValue = getValue.value;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${API_KEY}`
        let data = await fetch(url);
        let response = await data.json();
        console.log(response);
        if(response.cod===200){
            setHumidity(response.main.humidity+" %");
            setTemp(response.main.temp+"° C");
            setwindSpeed(response.wind.speed+" km/h");
           if(response.weather[0].icon === 'o1d' || response.weather[0].icon === 'o1n'){
               setweatherIcon(sunnyIcon);
           }else if(response.weather[0].icon === '02d' || response.weather[0].icon === '02n'){
            setweatherIcon(cloudIcon);
           }else if(response.weather[0].icon === '03d' || response.weather[0].icon === '03n'){
            setweatherIcon(rainIcon);
           }else if(response.weather[0].icon === '04d' || response.weather[0].icon === '04n'){
            setweatherIcon(rainIcon);
           }else if(response.weather[0].icon === '09d' || response.weather[0].icon === '09n'){
            setweatherIcon(drizleIcon);
           }else if(response.weather[0].icon === '10d' || response.weather[0].icon === '10n'){
            setweatherIcon(drizleIcon);
           }else if(response.weather[0].icon === '13d' || response.weather[0].icon === '13n'){
            setweatherIcon(snowIcon);
           }else{
            setweatherIcon(cloudIcon)
           }

        }else if(response.cod==='404'){
            setErrorMessage(response.message);
        }
    }
    return (
        <div className="container">
          
            <div className='weather-data'>

               <div className='weather-window'>
               <h1>weather app</h1>
                  <div className='search-container'>
                    <input type="text" id='inputElement' placeholder='India' onChange={searchInputChange}/>
                    <div className='search-icon' onClick={search}>
                    <img src={searchIcon} alt="search " />
                    </div>
                  </div>

                  <div className="weather-view">
                    <img src={weatherIcon} alt="currentweatherIcon" />
                    <p>{temp}</p>

                    <p>{searchInput}</p>

                  </div>
                  {errorMessage && <p className='error-message'>{errorMessage}</p>}
                  <div className="weather-other">
                    <div className="humidity">
                        <img src={humidityIcon} alt="humidity"/>
                        <p>{humidity}
                            <br />
                            Humidity
                        </p>
                    </div>
                    <div className="wind">
                        <img src={windIcon} alt="wind" />
                        <p>{windSpeed}
                            <br />
                            Wind speed
                        </p>
                    </div>
                  </div>
               </div>
            </div>
        </div>
    );
}