import React from 'react';
import classes from './Header.module.css';
import { useHistory } from "react-router-dom";


const Header = ({leftArrow, button}) => {
	const history = useHistory();


	return (
		<header className={classes.header}>
			<div className={classes.headerRightBlock}>
			{leftArrow ? <img src={leftArrow} alt="LeftArrow" className={classes.Arrow} onClick={() => history.goBack()}/> : null}
			<h1 className={classes.title}>Create Internal User</h1>
			</div>
			<button className={classes.btn} onClick={button}><span className={classes.titleBtn}>Save Changes</span></button>
		</header>

	)

}
export default Header;

