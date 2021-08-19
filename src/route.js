const express = require('express')
const router = express.Router()
const fetch= require('node-fetch')




async function get(URL){
    const requestOptions={
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      }
    const res= await fetch(URL, requestOptions);
    const data=await res.json();
    return data

}

let URL=`https://api1.binance.com/api/v3/ticker/24hr`


router.get('/', (req, res) => {
      res.sendFile(__dirname+'/form.html');
})

router.post('/coins', async (req, res) => {
    let data=await get(URL);
    let availability=[...data];
    return res.json(availability)
})

router.post('/priceHist', async (req, res)=>{
  let URL2='https://api.binance.com/api/v1/klines'
  let symb=req.body.symb?req.body.symb:'ETHUSDT'
  let interval=req.body.interval?req.body.interval:'1h'
  URL2+='?symbol=' + symb + '&interval=' + interval
  let data= await get(URL2);
  return res.json(data)
})

router.post('/history', async (req, res)=>{
  let query=req.body;
  console.log(req.body);
  let URL2='https://api.binance.com/api/v1/klines'
  let symb=query.sym?query.sym:'ETHUSDT'
  let interval=query.interval?query.interval:'1h'
  URL2+='?symbol=' + symb + '&interval=' + interval
  let URL3=`https://api.binance.com/api/v1/klines?symbol=${symb}&interval=${interval}`
  let data= await get(URL3);
  return res.json([data,symb,interval])
  
})

module.exports=router;