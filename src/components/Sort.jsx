import React, { useState } from "react";

export const menu = [{name: 'популярности', sortProperty: 'rating'}, {name: 'цене', sortProperty: 'price'}, {name: 'алфавиту', sortProperty: 'title'}];

export default function Sort({value, onClickSort, toggle, onClickToggle}){

  const [isVisible, setIsVisible] = useState(false);

    return(<div className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: isVisible ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out'
            }}
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <span onClick={()=>{setIsVisible(!isVisible)}}>{value.name}</span>
          <div className="sort__toggle" onClick={() => onClickToggle()} >{toggle ? '↑' : '↓'}</div>
        </div>
        <div 
          className="sort__popup" 
          style={isVisible ? { boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.09)' } : {}}
        >
          {
            isVisible && (<ul>
              {
                menu.map((obj, index)=>{
                  return <li onClick={()=>{onClickSort(obj); setIsVisible(false)}} className={value.sortProperty === obj.sortProperty ? "active" : ""} key={index} >{obj.name}</li>
                })
              }
            </ul>)
          } 
        </div>
      </div>)
}