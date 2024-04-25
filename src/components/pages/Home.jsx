import React, { useState, useEffect, useContext, useRef } from 'react';
import Categories from '../Categories';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Sort, { sortList } from '../Sort';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../PizzaBlock/PizzaBlockSkeleton';
import axios from 'axios';
import { AppContext } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setFilters } from '../../redux/slices/filterSlice';

const Home = () => {
  const { categoryId, sort } = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { searchValue } = useContext(AppContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const onChangeCategory = (categoryId) => {
    dispatch(setCategoryId(categoryId));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    const search = searchValue ? `&search=${searchValue}` : '';
    // Make a GET request when the component mounts
    axios
      .get(
        `https://65a17f98600f49256fb1bfc5.mockapi.io/items?${
          categoryId > 0 ? `category=${categoryId}` : ''
        }${search}&sortBy=${sort.sortProperty.sortProperty}&order=desc`,
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
  };
  // If changed params and there was a first rendering
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty]);

  // After first rendering check URL params and save in Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  //If there was a first rendering, then request pizzas
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue]);

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
