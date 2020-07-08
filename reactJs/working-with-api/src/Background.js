import React from 'react';
import test from './test.css';

class Background extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            picutures:[],
        };
    }

    componentWillMount(){
                    debugger;
        fetch('https://randomuser.me/api/?results=500&inc=picture').
            then(results=>results.json()).
            then(picts=>{ 
                    let i =1;
                let meds = picts.results.map(x=>{
                    return (                        
                        <div key={i++} className='test'>
                            <img src={x.picture.medium}></img>
                        </div>
                    );
                });
                this.setState({pictures:meds});}).            
            catch(err=>console.error(err));
    }

    render(){
        return (
        <div>
            {this.state.pictures}
        </div>
        );
    }
}

export default Background;
