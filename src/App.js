import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Coin from './Coin';
// import Pagination from './Pagination';


function App() {
  const [coins,setCoins] = useState([])
  const [search,setSearch] = useState('')
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
       setCoins(res.data)
       console.log(res.data)
    })
    setInterval(() => {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res=>{
         setCoins(res.data)
         console.log(res.data)
      }).catch(error=>console.log(error))
    }, 10000);
  }, [])
  const handleChange = e =>{
    setSearch(e.target.value)
  }
  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )
  return (
    <div className="coin-app">
      <div className='sticky'>
          <div className="coin-search">
            {/* <h1 className="coin-text">Search your desired coin</h1> */}
            <form action="">
              <input type="text" className="coin-input" placeholder="Provide the coin name" onChange={handleChange}/>
            </form>
        
          </div>
          <div className='row coin-heading coin-heading-css'>
            <div className='head-coin '>
              <h4>Coin Names</h4>
            </div>
            <div className='head-Current'>
              <h4>Current Price</h4>
            </div>
            <div className='head-volume'>
              <h4>Volume</h4>
            </div>
            <div className='head-percentage'>
              <h4>Change in %</h4>
            </div>
            <div className='head-cap'>
              <h4>Market Cap</h4>
            </div>
          </div>
      </div>
      <Card>
      <CardContent>
      <div className='card table-content'>
      {filteredCoins.map(coin=>{
        return(
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          pricechange={coin.price_change_percentage_24h}
           volume={coin.total_volume}
          />
        );
      })}
      </div>
      </CardContent>
      </Card>
    </div>
  );
}

export default App;
