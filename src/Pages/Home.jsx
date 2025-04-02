import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Categories from "../components/Categories";

import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";

export default function Home(){

      const { searchValue } = useContext(SearchContext)

      const [items, setItems] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      const [categoryId, setCategoryId] = useState(0);
      const [sort, setSort] = useState({
        name: 'популярности',
        sortProperty: 'rating'
      });
      const [isActiveToggle, setIsActiveToggle] = useState(false);
    
      useEffect(() => {
        setIsLoading(true);
        fetch(`https://67ea3fe134bcedd95f62b761.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sort.sortProperty}&order=${isActiveToggle ? `asc` : `desc`}`)
          .then((res) => res.json())
          .then((data) => setItems(data))
          .finally(() => {
            setIsLoading(false);
          });
        window.scrollTo(0, 0);
      }, [categoryId, sort, isActiveToggle, searchValue]);

      const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

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

    return(
        <div className="container"> 
            <div className="content__top">
            <Categories value={categoryId} onClickCategory={(index)=>{setCategoryId(index)}}/>
            <Sort value={sort} toggle={isActiveToggle} onClickSort={(index)=>{setSort(index)}} onClickToggle={()=>{setIsActiveToggle(!isActiveToggle)}}/>
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
    )
}