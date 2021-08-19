let PORT=3050
const fs= require('fs')
const express= require('express')
const app =express();
const routes = require('./route') // includes the routes.js file
var path =require('path');
var bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))


app.use(express.json()) 
app.use(routes) 
app.use(express.static(path.join(__dirname, '')))
app.listen(PORT,()=>{
  console.log("The Server is running on port:"+PORT)

})


