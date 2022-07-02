import React, {Component} from 'react';
import * as d3 from "d3";
import './linechart.css';
import DropDown from './dropdown';


class Chart extends Component {
  constructor(props){
    super(props);
    this.state={
      data:null,
      coinpair:'ETHUSDT',
      interval:'1h'
    }
  }
   async componentDidMount() {
    
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
          const res= await fetch(`/api/v1/klines?symbol=${this.state.coinpair}&interval=${this.state.interval}`,requestOptions)
          const data=await res.json();
          this.setState({data:data})
          console.log(data)
          let nested=this.state.data
          console.log(nested)
          this.shift(nested);
    }

    async getCoin(coin){
      
      this.setState(()=>{
        return {coinpair: coin,data:null} 
      })
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
      
      const res= await fetch(`/api/v1/klines?symbol=${coin}&interval=${this.state.interval}`,requestOptions)
      const data=await res.json();
      this.setState({data:data})
      console.log(data)
      let nested=this.state.data
      console.log(nested)
      this.shift(nested);
    }

    async getRange(time){
      
      this.setState(()=>{
        return {interval:time,data:null} 
      })
      console.log(this.state)
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
      
      const res= await fetch(`/api/v1/klines?symbol=${this.state.coinpair}&interval=${time}`,requestOptions)
      const data=await res.json();
      this.setState({data:data})
      console.log(data)
      let nested=this.state.data
      console.log(nested)
      this.shift(nested);
    }




shift =(arr)=> {
    let width=900;
    let height=600;
    let padding=100;


    d3.select("svg").remove();
    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("viewBox", `0 0 900 600`)
    
    const mindate= new Date(d3.min(arr,(d)=>d[0]))
  
    const maxdate= new Date(d3.max(arr,(d)=>d[0])); 
    


  const Xscale=d3.scaleTime() 
      .domain([mindate,maxdate])
      .range([0+padding,width-padding]);
  const Yscale=d3.scaleLinear()
      .domain([d3.min(arr,(d)=>Number(d[1])),d3.max(arr,(d)=>Number(d[1]))])
      .range([height-padding,0+padding]);
  
  const Xscale2=d3.scaleTime() //Change this back??
      .domain([mindate, maxdate])
      .range([0+padding,width-padding]);
  const Yscale2=d3.scaleLinear()
      .domain([d3.min(arr, (d)=>Number(d[1])),d3.max(arr, d=> Number(d[1]))])
      .range([height-padding,0+padding]);
  

  var x = d3.scaleLinear()
        .domain([d3.min(arr,(d)=> d[0]),d3.max(arr,(d)=>d[0])])
        .range([ 0+padding, width-padding ]);
  var y = d3.scaleLinear()
        //.domain([d3.min(arr,(d)=>d[1]),d3.max(arr,(d)=>d[1])])
        .domain([d3.min(arr,(d)=>Number(d[1])),d3.max(arr, d=> Number(d[1]))])
        .range([height-padding,0+padding]);
   
      // This allows to find the closest X index of the mouse:
      var bisect = d3.bisector(function(d) { return d[0]; }).left;
    
      
      var l=svg
        .append('g')
        .append('line')
          .style("stroke","green")
          .style("opacity",0)
      var h1 = d3.select('h1');
      svg
        .append("path")
        .datum(arr)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d[0]) })
          .y(function(d) { return y(d[1]) })
          )
      // Create the circle that travels along the curve of chart
      var focus = svg
        .append('g')
        .append('circle')
          .style("fill", "none")
          .attr("stroke", "black")
          .attr('r', 8.5)
          .style("opacity", 0)
      var focusTxt1 = svg
          .append("foreignObject")
          .attr("class", "tooltip")
          .attr("x", 300)
          .attr("y", 100)
          //.attr("width", 100)
          //.attr("height", 100)
  
  var a= svg.append('path')
      .attr('stroke', 'black')
      .attr('fill', '#69b3a2'); //#69b3a2


    svg
     .on("pointerover",function(){
       a.style("opacity",1)
       focus.style("opacity",1)
       l.style("opacity",1)
       focusTxt1.style("opacity",1)
       
     })
     .on("mousemove",function(e){
       //var x0 = x.invert(d3.pointer(this)[0]) ///d3.mouse() not supported in V6;
       var z=d3.pointer(e,this)
       var x1=x.invert(z[0])
       var i=bisect(arr,x1,1)
       let xlabel= arr[i]?new Date(arr[i][0]).toString().slice(0,24):null;
       h1.style("font-family",'arial')
       l.attr("x1",x(arr[i][0]))
       l.attr("y1",y(arr[i][1]))
       l.attr("x2",x(arr[i][0]))
       l.attr("y2",y(d3.min(arr,(d)=>d[1])));
       focus.attr("cx",x(arr[i][0]))
       focus.attr("cy",y(arr[i][1]))
       focusTxt1.html(arr[i]?'<div class="tooltip">' + 'x:'+ xlabel + '</br>' + 'y: $'+Number(arr[i][1]).toFixed(30) + '</div>':null)
      

       
     })
     .on("mouseleave",function(){
       a.style("opacity",0)
       focus.style("opacity",0)
       focusTxt1.style("opacity",0)
     })
    
      
      

   const xaxis=d3.axisBottom(Xscale);
   const yaxis=d3.axisLeft(Yscale); 
   svg.append("g")
     .attr("class","xa")
     .attr("transform", "translate(0, " + (height - padding) + ")")
     .call(xaxis);
   svg.append("g")
     .attr("transform", `translate(${padding}, ` + 0 + ")")
     .call(yaxis);
   const xaxis2=d3.axisBottom(Xscale2);
   const yaxis2=d3.axisLeft(Yscale2); 
   svg.append("g")
     .attr("transform", "translate(0, " + (height - padding) + ")")
     .call(xaxis2);
   svg.append("g")
     .attr("transform", `translate(${padding}, ` + 0 + ")")
     .call(yaxis2);
  svg.append("g")
     .attr("class","xa")
     .attr("transform", "translate(0, " + (height - padding) + ")")
     .call(xaxis);
   svg.append("g")
     .attr("transform", `translate(${padding}, ` + 0 + ")")
     .call(yaxis);
   
}  
render(){
  let d=this.state.data&&this.state.coinpair?this.state.coinpair.slice(0,3)+"/"+this.state.coinpair.slice(3,7):"Loading";
  
    return (
    <div>
      <div className="title"><h1 className="coinpair">{d} Price</h1></div>
      <h2>{this.state.interval}</h2>
      <DropDown onChange={(e)=>this.getCoin(e)} timeChange={(e)=> this.getRange(e)}/>
      <div id="my_dataviz"></div> 

    </div>)
  }


}

export default Chart;
