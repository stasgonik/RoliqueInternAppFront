import React from 'react';
import {useHistory} from "react-router-dom";

import classes from './Header.module.css';

// import arrowUp from "../Icons/arrow-up.svg";

const Header = ({leftArrow, button, title, titleHeader, titleBtn, btnHeader}) => {
    const history = useHistory();


    return (
        <header className={classes.header}>
            <div className={classes.headerRightBlock}>
                {leftArrow ? <img src={leftArrow} alt="LeftArrow" className={classes.Arrow}
                                  onClick={() => history.goBack()}/> : null}
                <h1 className={titleHeader}>{title}</h1>
            </div>
            <button className={btnHeader} onClick={button}><span className={classes.titleBtn}>{titleBtn}</span></button>
        </header>
    )
}
export default Header;

