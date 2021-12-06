import React from 'react';
import './form.css'
import shib  from '../imgs/shibu.jpeg'
import eth from '../imgs/eth.png'
import btc from '../imgs/btc.png'
import hnt from '../imgs/hnt.png'
import xrp from '../imgs/xrp.png'

function Form (props){

    
    return( 
    <form onSubmit={(e)=>props.onSubmit(e)}>
    <div className="coin">
    <h3>Choose coin pair :</h3> <br></br>
    <label><img src={eth}></img>ETH/USDT</label>
    <input type="radio" name="sym" value="ETHUSDT"></input><br></br>
    <label><img src={btc}></img>BTC/USDT</label>
    <input type="radio" name="sym" value="BTCUSDT"></input><br></br>
    <label><img src={hnt}></img>HNT/USDT</label>
    <input type="radio" name="sym" value="HNTUSDT"></input><br></br>
    <label><img src={xrp}></img>XRP/USDT</label>
    <input type="radio" name="sym" value="XRPUSDT"></input><br></br>
    <label><img src={shib}></img>SHIB/USDT</label>
    <input type="radio" name="sym" value="SHIBUSDT"></input><br></br>
    </div>
    <div className="coin">
    <h3>Choose coin pair :</h3> <br></br>
    <label><img src={eth}></img>ETH/GBP</label>
    <input type="radio" name="sym" value="ETHGBP"></input><br></br>
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
