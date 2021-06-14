import React from 'react';

import classes from './ListLink.module.css';
import path from "../Icons/path.svg";
import {Link} from "react-router-dom";

const ListLink = ({link, message, arrow}) => {

	return 	(
		<Link to={link}>
			<div className={classes.tableBtn}>
				<div className={classes.Test}>
					<div>
						<img src={path} alt='path'/>
					</div>
				</div>
				<div className={classes.tooltipMain}>
					<div className={classes.TooltipText}>
						<p>{message}</p></div>
				</div>
				<img className={classes.ArrowImg} src={arrow} alt={'Right arrow'}/>
			</div>
		</Link>
	)
}
export default ListLink;
