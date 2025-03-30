import React, { useState } from "react";

export default function Categories(){
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

  const [activeIndex, setActiveIndex] = useState(0);


    return(
        <div className="categories">
              <ul>
                {
                  categories.map((value, index)=>{
                    return <li onClick={()=>{setActiveIndex(index)}} className={activeIndex === index ? "active" : ''}>{value}</li>
                  })
                }
              </ul>
        </div>
    )
}