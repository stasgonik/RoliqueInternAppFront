import React from 'react';
import classes from './Header.module.css';
import { useHistory } from "react-router-dom";
import AuthService from "../../../Services/auth.service";
import arrowUp from "../Icons/arrow-up.svg";


const Header = ({leftArrow, upArrow, button, title, titleHeader, titleBtn, btnHeader}) => {
	const history = useHistory();


	return (
		<header className={classes.header}>
			<div className={classes.headerRightBlock}>
			{leftArrow ? <img src={leftArrow} alt="LeftArrow" className={classes.Arrow} onClick={() => history.goBack()}/> : null}
			<h1 className={titleHeader}>{title}</h1>
			</div>
			{(AuthService.getUserRole() === 'admin' || AuthService.getUserRole() === 'manager') ? <button className={btnHeader} onClick={button}><img src={upArrow} alt={upArrow} className={classes.upArrow}/><span className={classes.titleBtn}>{titleBtn}</span></button> : ""}

		</header>

	)

}
export default Header;

