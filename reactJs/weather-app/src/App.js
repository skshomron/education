import React from 'react';
import './App.css';
import WeatherDisplayer from './WeatherDisplayer.js';
import WeatherRequester from './WeatherRequester.js';

const baseUrl = 'https://api.openweathermap.org/data/2.5'; 
const weatherUrlStr = 'https://api.openweathermap.org/data/2.5/weather';
const oneCallUrlStr = 'https://api.openweathermap.org/data/2.5/onecall';
const apiKey= '14e2516a643e05405078f5271647d366';
const units='metric';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cityName:'',         
      weather:undefined,         
    };
    
    this.onCityNameChanged = this.onCityNameChanged.bind(this);
    this.onGetTodayWeatherClicked = this.onGetTodayWeatherClicked.bind(this);
    this.onGetWeekWeatherClicked = this.onGetWeekWeatherClicked.bind(this);    
  }

  onCityNameChanged(newName){
    this.setState({cityName:newName});
  }

  onGetTodayWeatherClicked(cityName){
    
    let weatherUrl = new URL(weatherUrlStr);
    let params = {appid:apiKey,q:this.state.cityName};
    weatherUrl.search = new URLSearchParams(params).toString();   
    fetch(weatherUrl)
    .then(result => result.json())
    .then(weather => {
      const coord = weather.coord;
      this.setState({cityName:weather.name, country:weather.sys.country})
      if(coord){
        let oneCallUrl = new URL(oneCallUrlStr);
        params = {appid:apiKey,lon:coord.lon,lat:coord.lat, units:units,exclude:'minutely,hourly'};
        oneCallUrl.search = new URLSearchParams(params).toString();   
        return  fetch(oneCallUrl);
      }
      return null;
    })      
    .then(result =>{
      if(result){
        return result.json();
      }
    })
    .then(onecall => {
     this.setState({oneCall:onecall});
    })        
    .catch(err=> console.error(err));
  }

  onGetWeekWeatherClicked(){
    let url = new URL(baseUrl);
    const params = {appid:apiKey,q:this.state.cityName};
    url.search = new URLSearchParams(params).toString();
    console.log(url.request);
    fetch(url.href)
    .then(result => result.json())
    .then(data => data)
    .catch(err=>console.error(err));
  }

  render(){
    const {oneCall, cityName, country} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </header>
        <section>
          <h1>BIENVENUE SUR NOTRE APPLICATION DE METEO</h1>
          <div>
            <WeatherRequester onCityNameChanged={this.onCityNameChanged} 
                              onGetTodayWeatherClicked={this.onGetTodayWeatherClicked}
                              onGetWeekWeatherClicked={this.onGetWeekWeatherClicked}></WeatherRequester>
            <WeatherDisplayer oneCall={oneCall} cityName={cityName} country={country}></WeatherDisplayer>
          </div>
        </section>
        <footer >
          <div>
            powered by shomron
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
