import React, { useState, useEffect, useContext } from 'react';
import Categories from '../Categories';
import Sort from '../Sort';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../PizzaBlock/PizzaBlockSkeleton';
import axios from 'axios';
import { AppContext } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice';

const Home = () => {
  const { categoryId, sort } = useSelector((state) => state.filterSlice);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();
  const { searchValue } = useContext(AppContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const onChangeCategory = (categoryId) => {
    dispatch(setCategoryId(categoryId));
  };

  useEffect(() => {
    setIsLoading(true);
    const search = searchValue ? `&search=${searchValue}` : '';
    // Make a GET request when the component mounts
    axios
      .get(
        `https://65a17f98600f49256fb1bfc5.mockapi.io/items?${
          categoryId > 0 ? `category=${categoryId}` : ''
        }${search}&sortBy=${sortType.sortProperty}&order=desc`,
      )
      .then((response) => {
        // Handle the successful response
        setPizzas(response.data);
        //console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors
        console.log('Error fetching data', error);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All the pizzas</h2>
      <div className="content__items">
        {isLoading
          ? // Render PizzaSkeleton for each item in the array
            Array.from({ length: 10 }).map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas
              //   .filter((obj) => {
              //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
              //       return true;
              //     }
              //     return false;
              //   })
              .map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default Home;
