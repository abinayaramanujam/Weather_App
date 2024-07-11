import { useEffect, useState } from 'react'
import './App.css'
import proptypes from"prop-types";
// Image
import searchIcon from"./assets/search.png";
import clearIcon from"./assets/clear.png";
import cloudIcon from"./assets/cloud.png";
import drizzelIcon from"./assets/drizzel.png";
import rainIcon from"./assets/rain.png";
import windIcon from"./assets/wind.png";
import snowIcon from"./assets/snow.png";
import humidityIcon from"./assets/humidity.png";


const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
  return(
  <>
  <div className='image'>
    <img src={icon} alt='Image'/>
  </div>
  <div className='temp'>{temp}°C   </div>
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
    <div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className='data-container'>
    <div className='element'>
      <img src={humidityIcon} alt='huminity'
      className='icon'/>
      <div className='data'>
        <div className='humidity-percent'>{humidity}%</div>
        <div className='text'>Humidity</div>
      </div>
    </div>

  <div className='element'>
      <img src={windIcon} alt='wind'
      className='icon'/>
      <div className='data'>
        <div className='wind-percent'>{wind}km/h</div>
        <div className='text'>Wind Speed</div>
      </div>
    </div>
    </div>
      </>
  );
}
WeatherDetails.proptypes ={
  icon: proptypes.string.isRequired,
  temp: proptypes.number.isRequired,
  city: proptypes.string.isRequired,
  country: proptypes.string.isRequired,
  humidity: proptypes.number.isRequired,
  wind: proptypes.number.isRequired,
  lat: proptypes.number.isRequired,
  log: proptypes.number.isRequired,
}
function App() {
  let api_key = "7db7f4dc24f41ff2956b0ddce4ddf5da";
  const[text,setText]=useState("Chennai")
  const[icon,setIcon]=useState(clearIcon);
  const[temp,setTemp]=useState(0);
  const[city,setCity]=useState("chennai");
  const[country,setCountry]=useState("IN");
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);
const[cityNotFound,setCityNotFound]=useState(false);
const[loading,setLoading]=useState(false);
const[error,setError]=useState(null);

const weatherIconMap = {
  "01d" :clearIcon,
  "01n" :clearIcon,
  "02d" :cloudIcon,
  "02n" :cloudIcon,
  "03d" :drizzelIcon,
  "03n" :drizzelIcon,
  "04d" :drizzelIcon,
  "04n" :drizzelIcon,
  "09d" :rainIcon,
  "09n" :rainIcon,
  "10d" :rainIcon,
  "10n" :rainIcon,
  "13d" :snowIcon,
  "13n" :snowIcon,
  };

const search = async()=>{
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  try{
let res= await fetch(url);
let data=await res.json()
if(data.cod ==="404"){
  console.error("city not found");
setCityNotFound(true);
setLoading(false);
return;
  }
setHumidity(data.main.humidity);
setWind(data.wind.speed);
setTemp(Math.floor(data.main.temp));
setCity(data.name);
setCountry(data.sys.country);
setLat(data.coord.lat);
setLog(data.coord.lon);
const weatherIconCode = data.weather[0].icon;
setIcon( weatherIconMap[weatherIconCode] || clearIcon);
setCityNotFound(false);


}catch(error){
console.error("An error occurred:" ,error.message);  
setError("An error Occurred  while fetching weather data.");
}
finally{
setLoading(false);  }
  };
  const handleCity=(e)=>{
    setText(e.target.value);
  };
  const handleKeyDown=(e)=>{
    if (e.key ==="Enter"){
search();
    }
  };

  useEffect(function() {
    search();
  },[]);
  return (
    <>
      <div className='container'>
<div className='inputcontainer'>
  <input type='text'  className='cityInput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
  <div className='search-icon' onClick={()  => search()}>
  <img src={searchIcon}  alt='search'/>
  </div>
  
</div>   
 
{ loading && <div className='loading-message'>Loading........</div>}
   {error && <div className='error-message'>{error}</div>}
   {cityNotFound &&<div className='city-not-found'>city not found</div>}

{! loading &&  !cityNotFound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />}
  
   <p className='copyright'>
    Designed by <span>Abinaya</span>
   </p>
    </div>
      
    </>
  )
}

export default App
