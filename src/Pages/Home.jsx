import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { menu } from "../components/Sort";
import Categories from "../components/Categories";
import axios from "axios";
import qs from "qs"

import { useContext, useEffect } from "react";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setSort, toggleSortOrder, setFilters } from "../redux/slices/filterSlice";
import { setItems, setIsLoading } from "../redux/slices/pizzasSlice"
import { useNavigate } from "react-router-dom";
 
export default function Home() {

  const navigate = useNavigate();

  const { categoryId, sort, isActiveToggle } = useSelector(state => state.filter);
  const { items, isLoading } = useSelector(state => state.pizza);

  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1)); //without "?"

      const sort = menu.find((obj) => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
    }
  }, [])

  useEffect(() => {

    axios.get(`https://67ea3fe134bcedd95f62b761.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sort.sortProperty}&order=${isActiveToggle ? 'asc' : 'desc'}`)
    .then(res => {
      dispatch(setItems(res.data));
      dispatch(setIsLoading(false));
    })

    window.scrollTo(0, 0);
  }, [categoryId, sort, isActiveToggle, searchValue, dispatch]);

  useEffect(() => {

    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      isActiveToggle,
    });

    navigate(`?${queryString}`);

  }, [categoryId, sort, isActiveToggle, dispatch]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const filteredPizzas = items.filter(obj => {
    return obj.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  const pizzas = filteredPizzas.map((pizza) => (
    <PizzaBlock
      key={pizza.id}
      title={pizza.title}
      price={pizza.price}
      img={pizza.imageUrl}
      types={pizza.types}
      sizes={pizza.sizes}
    />
  ));

  return (
    <div className="container"> 
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory}/>
        <Sort 
          value={sort} 
          toggle={isActiveToggle} 
          onClickSort={(sortObj) => dispatch(setSort(sortObj))}
          onClickToggle={() => dispatch(toggleSortOrder())}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeletons 
          : filteredPizzas.length > 0 
          ? pizzas 
          : <p className="content__items_notFound">Нет пицц, соответствующих вашему запросу</p>
        }
      </div>
    </div>
  );
}