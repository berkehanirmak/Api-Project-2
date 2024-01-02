import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = {
      vs_currency: 'usd', // Döviz cinsi (örneğin: usd, eur, try)
      order: 'market_cap_desc', // Sıralama
      per_page: 10, // Sayfa başına sonuç sayısı
      page: 1, // Sayfa numarası
      sparkline: false, // Sparkline verisi
      price_change_percentage: '24h', // 24 saatlik fiyat değişikliği
    };

    axios.get(apiUrl, { params })
      .then(response => {
        setCryptoData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Crypto Prices</h1>
      <ul>
        {cryptoData.map((crypto, index) => (
          <li key={index}>
            {crypto.name} ({crypto.symbol}): ${crypto.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;