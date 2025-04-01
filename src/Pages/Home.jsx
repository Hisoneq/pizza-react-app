import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Categories from "../components/Categories";

import { useEffect, useState } from "react";

export default function Home(){
      const [items, setItems] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      const [categoryId, setCategoryId] = useState(0);
      const [sort, setSort] = useState({
        name: 'популярности',
        sortProperty: 'rating'
      });
    
      useEffect(() => {
        setIsLoading(true);
        fetch(`https://67ea3fe134bcedd95f62b761.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sort.sortProperty}&order=desc`)
          .then((res) => res.json())
          .then((data) => setItems(data))
          .finally(() => {
            setIsLoading(false);
          });
        window.scrollTo(0, 0);
      }, [categoryId, sort]);

    return(
        <div className="container"> 
            <div className="content__top">
            <Categories value={categoryId} onClickCategory={(index)=>{setCategoryId(index)}}/>
            <Sort value={sort} onClickSort={(index)=>{setSort(index)}}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : items.map((pizza) => (
                  <PizzaBlock
                    key={pizza.id}
                    title={pizza.title}
                    price={pizza.price}
                    img={pizza.imageUrl}
                    types={pizza.types}
                    sizes={pizza.sizes}
                  />
                ))}
          </div>
        </div>
    )
}