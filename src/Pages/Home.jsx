import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Categories from "../components/Categories";

import { useEffect, useState } from "react";

export default function Home(){
      const [items, setItems] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
    
      useEffect(() => {
        fetch("https://67ea3fe134bcedd95f62b761.mockapi.io/items")
          .then((res) => res.json())
          .then((data) => setItems(data))
          .finally(() => {
            setIsLoading(false);
          });
        window.scrollTo(0, 0);
      }, []);

    return(
        <div className="container"> 
            <div className="content__top">
            <Categories />
            <Sort />
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