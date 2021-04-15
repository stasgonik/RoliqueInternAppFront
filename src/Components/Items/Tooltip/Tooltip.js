import React from 'react';
import classes from './Tooltip.module.css';
import topArrow from '../Icons/top-arrow-black.svg'


const Tooltip = (props) => (
	<div className={classes.tooltipContainer}>
		<img src={topArrow} alt="topArrow" className={classes.topArrow}/>
		<div className={`${classes.tooltip}`}>
			<span className={classes.text}>{props.text}</span>
		</div>
	</div>

)
export default Tooltip;
