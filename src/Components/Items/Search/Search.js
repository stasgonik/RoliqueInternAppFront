import React from 'react';
import classes from './Search.module.css';
import search from '../Icons/search.svg';

const Search = ({onChangeName, placeholder, widthSearch}) => {

    return (
        <div className={`${classes.boxSearch} ${widthSearch}`}>
            <img src={search} alt='search' className={classes.searchIcon}/>
            <input
                placeholder={placeholder}
                className={classes.Search}
                onChange={onChangeName}
            />
        </div>
    )
}
export default Search;
