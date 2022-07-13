import React from 'react';


function DropDown (props){
    const choosePair=()=>{
        let coin=document.querySelector('#coin').value;
        return coin
    }
    const chooseTime =()=>{
        let timeScale=document.querySelector('#time').value;
        return timeScale;
    }
    return( 
        <div>
            <label for="coin">Choose coin:</label>
            <select id="coin" onChange={e=>props.onChange(choosePair())}>
                
                <option value='BTCUSDT'>BTC</option>
                <option value='ETHUSDT' selected>ETH</option>
                <option value='HNTUSDT'>HNT</option>
                <option value="XRPUSDT">XRP</option>
                <option value='SHIBUSDT'>SHIBU</option>
            </select>
            <label for="time">Time range:</label>
            <select id="time" onChange={e=>props.timeChange(chooseTime())}>
                <option value="1m">1Min</option>
                <option value='5m'>5Min</option>
                <option value='30m'>30Min</option>
                <option value='1h' selected>1Hour</option>
                <option value='6h'>6Hour</option>

            </select>
        </div>
    
    )
}

export default DropDown;
