import React from 'react';
import './weatherDisplay.css'


const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class WeatherDisplayer extends React.Component{    

    createDay=(oneCall)=>{
        return oneCall.daily.slice(1,8).map((day)=> {
            const weaDate = new Date(day.dt*1000);
            return (
                <div key={day.weather.id}>
                  <span className='info'>{DAYS[weaDate.getDay()]} </span>  
                <div className='divInline'> 
                    <img src={'http://openweathermap.org/img/wn/'+day.weather[0].icon+'.png'} alt={day.weather[0].icon}></img>
                    <span className='capital-number'>{day.temp.day}</span>
                </div>
                <div>
                    <div>
                        Pressure {day.pressure} 
                    </div>
                    <div>
                        Humidity {day.humidity}
                    </div>
                </div>                        
            </div>

            );}
        )        
    }

    render(){
        if(this.props.oneCall!==undefined){        
            const {oneCall, cityName, country} = this.props;        
            const weaDate = new Date(oneCall.current.dt*1000);
            return  (
                <div>
                    <div>
                        <span className='capital-text'>{cityName} , {country}</span>
                        <span className='info'>{DAYS[weaDate.getDay()]+', '+weaDate.getHours()+' h '+weaDate.getMinutes()} </span>
                    </div>
                    <div>
                        <div className='divInline'> 
                            <img src={'http://openweathermap.org/img/wn/'+oneCall.current.weather[0].icon+'@2x.png'} alt={oneCall.current.weather[0].icon}></img>
                            <span className='capital-number'>{oneCall.current.temp}</span>
                        </div>
                        <div>
                            <div>
                                Pressure {oneCall.current.pressure} 
                            </div>
                            <div>
                                Humidity {oneCall.current.humidity}
                            </div>
                        </div>                        
                    </div>
                    <div className='divInline'>
                        {this.createDay(oneCall)}
                    </div>
                </div>);        
        }
        return null;
    }
}


export default WeatherDisplayer;