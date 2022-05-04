import React from 'react';
import shib  from '../imgs/shibu.jpeg'
import eth from '../imgs/eth.png'
import btc from '../imgs/btc.png'
import hnt from '../imgs/hnt.png'
import xrp from '../imgs/xrp.png'

function DropDown (props){
    const choosePair=()=>{
        let coin=document.querySelector('#coin').value;
        return coin
    }
    return( 
        <div>
            <label for="coin">Choose coin</label>
            <select id="coin" onChange={e=>props.onChange(choosePair())}>
                <option value='BTCUSDT'>BTC</option>
                <option value='HNTUSDT'>HNT</option>
                <option value="XRPUSDT">XRP</option>
                <option value='SHIBUSDT'>SHIBU</option>
            </select>
            <label for="coin">Time range</label>
            <select id="coin" onChange={e=>props.onChange(choosePair())}>
                <option value="1m">1Min</option>
                <option value='5m'>10Min</option>
                <option value='30m'>30Min</option>
                <option value='1h'>1Hour</option>
                <option value='6h'>6Hour</option>
                <option value='1d'>1Day</option>
                <option value='1y'>1Week</option>

            </select>
        </div>
    
    )
}

export default DropDown;
