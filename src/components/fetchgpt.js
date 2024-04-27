import React, { useState, useEffect } from 'react';

const CoinbasePrices = () => {
  const [assets, setAssets] = 
  useState(['DOGEGBP','HNTUSDT','XRPGBP', 'SOLGBP'

]); // Add more assets as needed
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const pricesData = await Promise.all(
          assets.map(async (asset) => {
            //const response = await fetch(`https://api.pro.coinbase.com/products/${asset}/ticker`);
            const response = await fetch(`https://api.coingecko.com/coins`)
            const data = await response.json();
            
            console.log(data)
            //return data
          })
        );

        const newPrices = Object.assign({}, ...pricesData);
        console.log(newPrices)
        setPrices(newPrices);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
  }, [assets]);

  return (
    <div>
      <h1>Current Prices</h1>
      <ul>
        {Object.entries(prices).map(([asset, price]) => (
          <li key={asset}>
            {asset}: £{price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinbasePrices;
