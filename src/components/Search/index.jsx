import React, { useCallback, useContext, useRef, useState } from "react";
import styles from "./search.module.scss";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

export default function Search() {
    const { setSearchValue } = useContext(SearchContext);
    const [value, setValue] = useState('');
    const inputRef = useRef();
    
    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    };

    const updateSearchValue = useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 350),
        [] 
    );

    const onChangeValue = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <div className={styles.root}>
            <svg className={styles.searchIcon} enableBackground="new 0 0 32 32" height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M13,2C6.935,2,2,6.935,2,13s4.935,11,11,11s11-4.935,11-11S19.065,2,13,2z M13,22c-4.962,0-9-4.037-9-9   c0-4.962,4.038-9,9-9c4.963,0,9,4.038,9,9C22,17.963,17.963,22,13,22z"/>
                    <path d="M29.707,28.293l-6.001-6c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l6.001,6C28.488,29.902,28.744,30,29,30   s0.512-0.098,0.707-0.293C30.098,29.316,30.098,28.684,29.707,28.293z"/>
                </g>
            </svg>
            {value && (
                <svg className={styles.cancelIcon} onClick={onClickClear} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                    <path d="M66.83,64,127.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0L64,61.17,3.41.59A2,2,0,0,0,.59.59a2,2,0,0,0,0,2.82L61.17,64,.59,124.59a2,2,0,0,0,0,2.82,2,2,0,0,0,2.82,0L64,66.83l60.59,60.58a2,2,0,0,0,2.82-2.82Z"/>
                </svg>
            )}
            <input 
                ref={inputRef} 
                onChange={onChangeValue} 
                value={value} 
                className={styles.input} 
                placeholder="Найти..." 
                type="text"
            />
        </div>
    );
}