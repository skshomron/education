import React from 'react';

class WeatherRequester extends React.Component{
    constructor(props){
        super(props);        
        this.onCityNameChanged =this.onCityNameChanged.bind(this);        
        this.onGetWeekWeatherClicked = this.onGetWeekWeatherClicked.bind(this);
        this.onGetTodayWeatherClicked = this.onGetTodayWeatherClicked.bind(this);        
    }

    onCityNameChanged(e){
        this.props.onCityNameChanged(e.target.value);
    }
    onGetWeekWeatherClicked(){
        this.props.onGetWeekWeatherClicked();
    }
    onGetTodayWeatherClicked(){
        this.props.onGetTodayWeatherClicked();
    }
    render(){
        return (
            <div>               
                <label>Enter city: 
                    <input type='text' name="cityName" onChange={(e)=>this.onCityNameChanged(e)}></input>
                </label> 
                <button onClick={()=>this.onGetTodayWeatherClicked()}>today</button>
                <button onClick={()=>this.onGetWeekWeatherClicked()}>Week</button>               
            </div>
        );
    }
}

export default WeatherRequester;