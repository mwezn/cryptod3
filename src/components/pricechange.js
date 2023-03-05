import React from 'react';


function PriceChange (props){

    let tradeHistory = [
        
            {date: '2019/11/27', asset: 'XRP', trade:'buy', coinprice: 0.17, quantity:23.490233, cost:3.9933396100000005,price_inc_fees: 5.0},
        
            {date: '2020/06/20', asset: 'XRP',trade:'buy', coinprice: 0.15, quantity:217.483916, cost:32.6225874,price_inc_fees: 35.0},
        
            {date: '2021/12/05', asset: 'DOGE', trade:'buy',coinprice: 0.13, quantity:141.67623421, cost:18.4179104473,price_inc_fees: 20.0},
        
            {date: '2022/12/13', asset: 'DOGE',trade:'sell', coinprice: 0.0730, quantity:141.55436326,price_inc_fees: 10.34}
    ]
    async function getPriceByDate(date){
      
        
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
      };
        
        const res= await fetch(`api/v3/aggTrades?symbol=BTCUSDT&startTime=${new Date(date).getTime()}`,requestOptions)
        const data=await res.json();
        console.log(data,data[0]);
        return data[0]
      }


    function renderList(arr){
        return arr.map(d=><li>{d.coinprice}</li>)
    }
    function renderPrice(arr){
        return arr.map(d=><li>{getPriceByDate(d.date)}</li>)
    }

    //https://api.binance.com/api/v3/aggTrades?symbol=BTCUSDT&startTime=1671235200000
    //https://api.binance.com/api/v3/aggTrades?symbol=BTCUSDT&startTime=`${new Date(json).getTime()}`
    return( 
        <div>
            <h1>This is the price change of your crypto</h1>
            <ul>
                {renderList(tradeHistory)}
            </ul>
            <ul>
                {renderPrice(tradeHistory)}
            </ul>
        </div>
    
    )
}

export default PriceChange;
