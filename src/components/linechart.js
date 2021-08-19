import React, {Component} from 'react';
import * as d3 from "d3";
import './linechart.css';
import Form from './form'


class LineChart extends Component {
  constructor(props){
    super(props);
    this.state={
      data:"",
      coinpair:null
    }
  }
   async componentDidMount() {
    let obj={}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
            mode:'cors'
        };
          const res= await fetch(`http://localhost:3050/history`,requestOptions)
          const data=await res.json();
          this.setState({data:data[0],coinpair:data[1]})
          console.log(data)
          let nested=this.state.data
          console.log(nested)
          this.shift(nested);
    }

async sendServer(event){
  event.preventDefault();
  const formData = new FormData(document.querySelector('form'))
  let symb="";
  let int="";
  let obj={}
  console.log(formData)
  for (var pair of formData.entries()) {
      //console.log(pair)
      console.log(pair[0] + ': ' + pair[1]);
      obj[pair[0]]=pair[1]
      //console.log(obj)

 }
 console.log(obj)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
};
  
  const res= await fetch(`http://localhost:3050/history`,requestOptions)
  const data=await res.json();
  console.log(data)
  this.setState({data:data[0],coinpair:data[1]})
  let nested=this.state.data;
  console.log(nested)
  this.shift(nested)
  
}

shift =(arr)=> {
    let width=1500;
    let height=900;
    let padding=80;
    d3.select("svg").remove();
    const svg = d3.select("#my_dataviz")
              .append("svg")
              .attr("width",width)
              .attr("height", height);


  const mindate= new Date(d3.min(arr,(d)=>d[0]))
  
  const maxdate= new Date(d3.max(arr,(d)=>d[0])); 
  const Xscale=d3.scaleTime() 
      .domain([mindate,maxdate])
      .range([0+padding,width-padding]);
  const Yscale=d3.scaleLinear()
      .domain([d3.min(arr,(d)=>d[1]),d3.max(arr,(d)=>d[1])])
      .range([height-padding,0+padding]);
  
  const Xscale2=d3.scaleTime() //Change this back??
      .domain([mindate, maxdate])
      .range([0+padding,width-padding]);
  const Yscale2=d3.scaleLinear()
      .domain([d3.min(arr, (d)=>d[1]),d3.max(arr,(d)=>d[1])])
      .range([height-padding,0+padding]);
  

  var x = d3.scaleLinear()
        .domain([d3.min(arr,(d)=> d[0]),d3.max(arr,(d)=>d[0])])
        .range([ 0+padding, width-padding ]);
  var y = d3.scaleLinear()
        .domain([d3.min(arr,(d)=>d[1]),d3.max(arr,(d)=>d[1])])
        .range([height-padding,0+padding]);
   
      // This allows to find the closest X index of the mouse:
      var bisect = d3.bisector(function(d) { return d[0]; }).left;
    
      // Create the circle that travels along the curve of chart
      var focus = svg
        .append('g')
        .append('circle')
          .style("fill", "none")
          .attr("stroke", "black")
          .attr('r', 8.5)
          .style("opacity", 0)
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
  var focusTxt = svg
    .append('g')
    .append('text')
      .style('opacity',0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")
      .attr("class", "textBox")
  var area = d3.area()
                
        .x( function(d) { return x(d[0])} )
        .y( function(d) { return y(d3.min(arr,(d)=>d[1])) } )
        .y1( function(d) { return y(d[1]) } );
  var a= svg.append('path')
      .attr('stroke', 'black')
      .attr('fill', '#69b3a2'); //#69b3a2


    svg
     .on("pointerover",function(){
       a.style("opacity",1)
       focus.style("opacity",1)
       focusTxt.style("opacity",1)
       //h1.style("opacity",1)
       l.style("opacity",1)
     })
     .on("mousemove",function(e){
       //var x0 = x.invert(d3.pointer(this)[0]) ///d3.mouse() not supported in V6;
       var z=d3.pointer(e,this)
       var x1=x.invert(z[0])
       var i=bisect(arr,x1,1)
       var currentData=arr.slice(0,i)
       let xlabel= arr[i]?new Date(arr[i][0]).toString().slice(0,24):null;
       h1.style("font-family",'arial')
       l.attr("x1",x(arr[i][0]))
       l.attr("y1",y(arr[i][1]))
       l.attr("x2",x(arr[i][0]))
       l.attr("y2",y(d3.min(arr,(d)=>d[1])));
       focus.attr("cx",x(arr[i][0]))
       focus.attr("cy",y(arr[i][1]))
       focusTxt.html(`x: ${xlabel} <br> y: ${arr[i][1]}`)
       focusTxt.attr('x',x(arr[i][0])+10)
       focusTxt.attr('y',y(arr[i][1]))
       a.attr("d", area(currentData))
     })
     .on("mouseleave",function(){
       a.style("opacity",0)
       focus.style("opacity",0)
       focusTxt.style("opacity",0)
       //h1.style("opacity",0)
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
  let coin=this.state.coinpair?this.state.coinpair:"Loading";
    return (
    <div>
      <div><h1 className="coinpair">{coin} Price</h1></div>
      <Form onSubmit={(e)=>this.sendServer(e)}></Form>
      <div id="my_dataviz"></div> 

    </div>)
  }


}

export default LineChart;