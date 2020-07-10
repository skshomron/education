import React from 'react';
import './weatherDisplay.css'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class WeatherDisplayer extends React.Component{
 
    render(){
        let result = null;
        if(this.props.weather!==undefined){
        const wea = this.props.weather;
        const weaDate = new Date(wea.dt*1000);
        result = (
        <div>
            <div>
                <span className='capital-text'>{wea.name} , {wea.sys.country}</span>
                <span className='info'>{DAYS[weaDate.getDay()]+', '+weaDate.getHours()+' h '+weaDate.getMinutes()} </span>
                <span className='info'>{wea.weather[0].main}</span>
            </div>
            <div className='divInline'>
                <div className='divInline'> 
                    <img src={'http://openweathermap.org/img/wn/'+wea.weather[0].icon+'@2x.png'} alt={wea.weather.icon}></img>
                    <span className='capital-number'>{wea.main.temp}</span>
                </div>
                <div className='alignright'>
                    <div>
                        Pressure {wea.main.pressure} 
                    </div>
                    <div>
                        Humidity {wea.main.humidity}
                    </div>
                </div>
            </div>
        </div>
        );}
        return result;
    }
}

export default WeatherDisplayer;