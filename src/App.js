
import './App.css';
import React from 'react'
import Chart from './components/frontfetch';
import PriceChange from './components/pricechange'
//import LineChart from './components/linechart2'

function App() {
  return (
    <div className="App">
      <PriceChange></PriceChange>
      <Chart></Chart>
    </div>
  );
}

export default App;
