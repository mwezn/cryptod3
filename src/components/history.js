
import React, { useState, useEffect } from 'react';
import './history.css'


function History(props){
    const [data,updateData]= useState([])
    const [typed, updateTyped]= useState([])
    const [year, updateYear]= useState({year:'2021'})

    let CBHistory = [
        
            {date: '2019/11/27', asset: 'XRPGBP', trade:'buy', coinprice: 0.17, quantity:23.490233, cost:3.9933396100000005,price_inc_fees: 5.0},
        
            {date: '2020/06/20', asset: 'XRPGBP',trade:'buy', coinprice: 0.15, quantity:217.483916, cost:32.6225874,price_inc_fees: 35.0},
        
            {date: '2021/12/05', asset: 'DOGEGBP', trade:'buy',coinprice: 0.13, quantity:141.67623421, cost:18.4179104473,price_inc_fees: 20.0},
        
            {date: '2022/12/13', asset: 'DOGEGBP',trade:'sell', coinprice: 0.0730, quantity:141.55436326,price_inc_fees: 10.34},

            {date: '2023/04/07', asset: 'DOGEGBP', trade:'buy',coinprice: 0.0668, quantity:141.0, cost:9.42,price_inc_fees: 10.41},

            {date: '2023/08/06', asset: 'HNTGBP', trade:'buy',coinprice: 1.67, quantity:5.40560669, cost:9.01,price_inc_fees: 10},

            {date: '2023/08/15', asset: 'XRPGBP',trade:'sell', coinprice: 0.47, quantity:148.062835,
            total:70.0, price_inc_fees: 67.01},

            {date: '2023/08/20', asset: 'XRPGBP',trade:'sell', coinprice: 0.41, quantity:92.911314,
            total:38.03, price_inc_fees: 36.04},

            {date: '2023/08/27', asset: 'XRPGBP',trade:'buy', coinprice: 0.42, quantity:101.600006, cost:43.01,price_inc_fees: 45.0},

            {date: '2023/10/19', asset: 'SOLGBP',trade:'buy', coinprice: 19.78, quantity:7.293033708, cost:144.24,price_inc_fees: 150.0, current:null},

            {date: '2023/11/06', asset: 'HNTGBP',trade:'buy', coinprice: 1.45, quantity:102.53663957, cost:149.05,price_inc_fees: 155.0},

            {date: '2023/11/19', asset: 'AIOZGBP',trade:'buy', coinprice: 0.0398, quantity:1000, cost:39.80,price_inc_fees: 41.79},
            {date: '2023/12/15', asset: 'SOLGBP',trade:'sell', coinprice: 58.29, quantity:3.5, total:204.02,price_inc_fees: 200.98},
            {date: '2024/01/01', asset: 'SOLGBP',trade:'sell', coinprice: 81.61, quantity:2.205, total:180.00,price_inc_fees: 177.01},
            {date: '2024/05/21', asset: 'SOLGBP',trade:'sell', coinprice: 139.61, quantity:1.636563446, total:228.48,price_inc_fees: 225.08},
            {date: '2024/06/24', asset: 'HNTGBP',trade:'sell', coinprice: 2.54, quantity:107.39050819, total:272.42,price_inc_fees: 268.36},
            {date: '2024/07/03', asset: 'AIOZGBP',trade:'sell', coinprice: 0.41, quantity:550, total:227.02,price_inc_fees: 223.64}



        ]
    function changeYear(yr){
        console.log(year)
        updateYear(()=>{return {year:  yr}})
        console.log(yr)
    }
    
    function renderList(arr){
        return arr.map(d=><li>{
            `Asset:${d.asset} Date:${d.date} Price: ${d.coinprice} Trade ${d.trade} Cost £${d.price_inc_fees} quantity:${d.quantity}`
        }</li>)
    }
    
    return( 
        
        <div>
            
            <h1>Coinbase bought trades</h1>
            <ol>
                {renderList(CBHistory.filter(d=>d.trade=='buy'))}
            </ol>
            <h1>Coinbase sold trades</h1>
            <ul>
                {renderList(CBHistory.filter(d=>d.trade=='sell'))}
            </ul>

            <div className='tradeyear'>
            <select id="dropdown" onChange={(e)=>changeYear(document.getElementById('dropdown').value)}>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
            </select>
            <p>Trades {year.year}:</p>
            <ul> {CBHistory.map(d=>{
                let dt=new Date(d.date)
                return dt.getFullYear()==year.year?<li>{
                    `Asset:${d.asset} Date:${d.date} Price: ${d.coinprice} Trade ${d.trade} Cost £${d.price_inc_fees} quantity:${d.quantity}`
                }</li>:null
                })}
            </ul>
            </div>



            <p> Total bought: £{CBHistory.filter(d=>d.trade=='buy').map(d=>d.price_inc_fees).reduce((a,b)=>a+b)}
            </p>
            
            <p> Total sold: £{CBHistory.filter(d=>d.trade=='sell').map(d=>d.price_inc_fees).reduce((a,b)=>a+b)}
            </p>
            <p> Total profit: £{
            CBHistory.filter(d=>d.trade=='sell').map(d=>d.price_inc_fees).reduce((a,b)=>a+b)-CBHistory.filter(d=>d.trade=='buy').map(d=>d.price_inc_fees).reduce((a,b)=>a+b)
            }</p>
            
        </div>
    
    )
}



export default History;
