import React, { useState, useEffect } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import MyLoader from './components/PizzaBlock/PizzaBlockSkeleton';
import axios from 'axios';

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a GET request when the component mounts
    axios
      .get('https://65a17f98600f49256fb1bfc5.mockapi.io/items')
      .then((response) => {
        // Handle the successful response
        setPizzas(response.data);
        //console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors
        alert('Error fetching data', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All the pizzas</h2>
          <div className="content__items">
            {loading
              ? // Render MyLoader for each item in the array
                Array.from({ length: 10 }).map((_, index) => <MyLoader key={index} />)
              : pizzas.map((item) => <PizzaBlock key={item.id} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
