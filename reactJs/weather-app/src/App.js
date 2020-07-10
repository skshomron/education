import React from 'react';
import './App.css';
import WeatherDisplayer from './WeatherDisplayer.js';
import WeatherRequester from './WeatherRequester.js';

const baseurl = 'https://api.openweathermap.org/data/2.5/weather'; 

const APIKEY= '14e2516a643e05405078f5271647d366';
const UNITS='metric';
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
    let url = new URL(baseurl);
    const params = {appid:APIKEY,q:this.state.cityName, units:UNITS};
    url.search = new URLSearchParams(params).toString();
    console.log(url);    
    fetch(url)
    .then(result => result.json())
    .then(data => this.setState({weather:data}))
    .catch(err=> console.error(err));
  }

  onGetWeekWeatherClicked(){
    let url = new URL(baseurl);
    const params = {appid:APIKEY,q:this.state.cityName};
    url.search = new URLSearchParams(params).toString();
    console.log(url.request);
    fetch(url.href)
    .then(result => result.json())
    .then(data => data)
    .catch(err=>console.error(err));
  }

  render(){
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
            <WeatherDisplayer weather={this.state.weather}></WeatherDisplayer>
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
