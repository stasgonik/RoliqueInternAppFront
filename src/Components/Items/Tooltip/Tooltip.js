import React from 'react';

import classes from './Tooltip.module.css';

const Tooltip = (props) => (
    <div className={classes.tooltipContainer}>
        {/*<img src={props.topArrow} alt="topArrow" className={classes.topArrow}/>*/}
        <img src={props.Arrow} alt="Arrow" className={classes.topArrow}/>
        <div className={classes.wrapTooltip}>
            <div className={`${classes.tooltip}`}>
                <span className={classes.text}>{props.text}</span>
            </div>
        </div>
    </div>

)
export default Tooltip;
