import React from 'react';
import NavigationBar from './NavigationBar'; // NavigationBar 컴포넌트를 import합니다.
import './App.css';
import { useState, useEffect } from 'react';

const baseURL = "https://panda-market-api.vercel.app"
const page = 1;
const pageSize = 10;


function App() {

  const [products, setProducts] = useState([]);


useEffect(() => {
  fetch(`${baseURL}/products?page=${page}&pageSize=${pageSize}`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.list);
    });
  }, []);

  return (
    <div className="App">
       <NavigationBar /> {/* NavigationBar 컴포넌트를 추가합니다. */}
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.images} />
          <h2>{product.name}</h2>
          <p>{product.price}</p>
        </div>
      ))};
    </div>
  );
}

export default App;
