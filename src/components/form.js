import React from 'react';
import './form.css'

function Form (props){

    
    return( 
    <form onSubmit={(e)=>props.onSubmit(e)}>
    <div className="coin">
    <h3>Choose coin pair :</h3> <br></br>
    <label>ETH/USDT</label>
    <input type="radio" name="sym" value="ETHUSDT"></input>
    <label>BTC/USDT</label>
    <input type="radio" name="sym" value="BTCUSDT"></input><br></br>
    <label>HNT/USDT</label>
    <input type="radio" name="sym" value="HNTUSDT"></input><br></br>
    <label>XRP/USDT</label>
    <input type="radio" name="sym" value="XRPUSDT"></input><br></br>
    <label>SHIB/USDT</label>
    <input type="radio" name="sym" value="SHIBUSDT"></input><br></br>
    </div>
    <div className="duration">
    <h3>Choose time interval :</h3>
    <label>1min</label>
    <input type="radio" name="interval" value="1m"></input><br></br>
    <label>5min</label>
    <input type="radio" name="interval" value="5m"></input><br></br>
    <label>30m</label>
    <input type="radio" name="interval" value="30m"></input><br></br>
    <label>1hour</label>
    <input type="radio" name="interval" value="1h"></input><br></br>
    <label>6hour</label>
    <input type="radio" name="interval" value="6h"></input><br></br>
    <label>1day</label>
    <input type="radio" name="interval" value="1d"></input><br></br>
    </div>
    <input type="submit" value="Submit"></input>
    </form>)
}

export default Form;
