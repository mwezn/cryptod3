
import React, { useState, useEffect } from 'react';


function PriceChange(props){
    const [data,updateData]= useState([])

    let tradeHistory = [
        
            {date: '2019/11/27', asset: 'XRPGBP', trade:'buy', coinprice: 0.17, quantity:23.490233, cost:3.9933396100000005,price_inc_fees: 5.0},
        
            {date: '2020/06/20', asset: 'XRPGBP',trade:'buy', coinprice: 0.15, quantity:217.483916, cost:32.6225874,price_inc_fees: 35.0},
        
            {date: '2021/12/05', asset: 'DOGEGBP', trade:'buy',coinprice: 0.13, quantity:141.67623421, cost:18.4179104473,price_inc_fees: 20.0},
        
            {date: '2022/12/13', asset: 'DOGEGBP',trade:'sell', coinprice: 0.0730, quantity:141.55436326,price_inc_fees: 10.34}
    ]

    useEffect(()=>{
        async function getPriceByDate(coinpair,date){
            const requestOptions = {
               method: 'GET'
           };
           try {
               await fetch(`/api/v3/ticker/price`,requestOptions)
                  .then(res=>res.json())
                  .then(json=> {
                        updateData(()=> [ ...json])
                   })
            
               console.log(data, !data)
           } 
           catch(err) {
               console.log(err)
           }
         }
           
        let timeToday= new Date()
        getPriceByDate('XRPUSDT',timeToday);
    },[])

    

    function renderList(arr){
        return arr.map(d=><li>{
            `Asset:${d.asset} Date:${d.date} Price: ${d.coinprice}`
        }</li>)
    }

    function renderData(arr){
        return arr.map(d=><li>{
            `Asset:${d.symbol} Price: ${d.price}`
        }</li>)

    }


    return( 
        
        <div>
            
            <h1>This is the price change of your crypto</h1>
            <ul>
                {renderList(tradeHistory)}
            </ul>


            
            <ul>
                {data?renderData(data):<li>Fetching ...</li>}
            </ul>
        </div>
    
    )
}

export default PriceChange;
