import React from 'react';
import classes from './Search.module.css';
import search from '../Icons/search.svg';

const Search = ({onChangeName}) => {


	return (
		<div className={classes.boxSearch}>
			<img src={search} alt='search' className={classes.searchIcon}/>
			<input
				placeholder="Search"
				className={classes.Search}
				onChange={onChangeName}
			/>
		</div>

	)

}
export default Search;
