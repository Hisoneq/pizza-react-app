import React, { useState } from "react";


export default function Categories({value, onClickCategory}){
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

    return(
        <div className="categories">
              <ul>
                {
                  categories.map((categoryName, index)=>{
                    return <li onClick={()=>{onClickCategory(index)}} className={value === index ? "active" : ''} key={index}>{categoryName}</li>
                  })
                }
              </ul>
        </div>
    )
}