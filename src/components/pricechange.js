
import React, { useState, useEffect } from 'react';


function PriceChange(props){
    const [data,updateData]= useState([])

    let CBHistory = [
        
            {date: '2019/11/27', asset: 'XRPGBP', trade:'buy', coinprice: 0.17, quantity:23.490233, cost:3.9933396100000005,price_inc_fees: 5.0},
        
            {date: '2020/06/20', asset: 'XRPGBP',trade:'buy', coinprice: 0.15, quantity:217.483916, cost:32.6225874,price_inc_fees: 35.0},
        
            {date: '2021/12/05', asset: 'DOGEGBP', trade:'buy',coinprice: 0.13, quantity:141.67623421, cost:18.4179104473,price_inc_fees: 20.0},
        
            {date: '2022/12/13', asset: 'DOGEGBP',trade:'sell', coinprice: 0.0730, quantity:141.55436326,price_inc_fees: 10.34},

            {date: '2023/04/07', asset: 'DOGEGBP', trade:'buy',coinprice: 0.0668, quantity:141.0, cost:18.4179104473,price_inc_fees: 10.41},

            {date: '2023/08/06', asset: 'HNTGBP', trade:'buy',coinprice: 1.67, quantity:5.40560669, cost:9.01,price_inc_fees: 10},

            {date: '2023/08/15', asset: 'XRPGBP',trade:'sell', coinprice: 0.47, quantity:148.062835,
            total:70.0, price_inc_fees: 67.01},

            {date: '2023/08/20', asset: 'XRPGBP',trade:'sell', coinprice: 0.41, quantity:92.911314,
            total:38.03, price_inc_fees: 36.04},

            {date: '2023/08/27', asset: 'XRPGBP',trade:'buy', coinprice: 0.42, quantity:101.600006, cost:43.01,price_inc_fees: 45.0},

            {date: '2023/10/19', asset: 'SOLGBP',trade:'buy', coinprice: 19.78, quantity:7.293033708, cost:144.24,price_inc_fees: 150.0},

            {date: '2023/11/06', asset: 'HNTGBP',trade:'buy', coinprice: 1.45, quantity:102.53663957, cost:149.05,price_inc_fees: 155.0},

            {date: '2023/11/19', asset: 'AIOZGBP',trade:'buy', coinprice: 0.0398, quantity:1000, cost:39.80,price_inc_fees: 41.79},
        ]

        console.log(CBHistory.filter(d=>d.trade=='buy'))
        console.log(CBHistory.filter(d=>d.trade=='buy').map(d=>d.price_inc_fees).reduce((a,b)=>a+b))
        console.log(CBHistory.filter(d=>d.trade=='sell').map(d=>d.coinprice*d.quantity))

    useEffect(()=>{
        async function getPriceByDate(){
            const requestOptions = {
               method: 'GET'
           };
           try {
               await fetch(`api/v3/ticker/price`,requestOptions)
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
        
        getPriceByDate();
    },[])

    

    function renderList(arr){
        return arr.map(d=><li>{
            `Asset:${d.asset} Date:${d.date} Price: ${d.coinprice} Trade ${d.trade} Cost £${d.price_inc_fees}`
        }</li>)
    }

    function renderData(arr){
        return arr.map(d=><li>{
            `Asset:${d.symbol} Price: ${d.price}`
        }</li>)

    }

   

    function changeSymbol(e){
        console.log(e.target.value)
        let newdata= data.slice();

        const exists= (d)=>{
            if(d.symbol.search(`${e.target.value}`)===-1){
                return false;

            }
            if(d.symbol.search(`${e.target.value}`)===0){
                return true
            }
        }


        updateData((old)=>old.filter(d=>exists(d)))

        //temp=data.filter(d=>exists(d))

        //let result=[...newdata.map(d=>exists(d))]
        //console.log(result)
        //console.log(newdata.filter(d=>d.symbol.search(`${e.target.value}`)==0))
    }
    
    return( 
        
        <div>
            
            <h1>Coinbase bought trades</h1>
            <ul>
                {renderList(CBHistory.filter(d=>d.trade=='buy'))}
            </ul>
            <h1>Coinbase sold trades</h1>
            <ul>
                {renderList(CBHistory.filter(d=>d.trade=='sell'))}
            </ul>
            <p> Total bought: £{CBHistory.filter(d=>d.trade=='buy').map(d=>d.price_inc_fees).reduce((a,b)=>a+b)}
            </p>
            <p> Total sold: £{CBHistory.filter(d=>d.trade=='sell').map(d=>d.price_inc_fees).reduce((a,b)=>a+b)}
            </p>
            <p> Total invested: £{
            CBHistory.filter(d=>d.trade=='buy').map(d=>d.price_inc_fees).reduce((a,b)=>a+b)-CBHistory.filter(d=>d.trade=='sell').map(d=>d.price_inc_fees).reduce((a,b)=>a+b)
            }</p>
            <input type="text" placeholder="start typing symbol" onInput={(e)=>changeSymbol(e)}></input>
            <ul>
                {data[0]?renderData(data):<li>Fetching ...</li>}
            </ul>
        </div>
    
    )
}



export default PriceChange;
