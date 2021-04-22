import React from 'react';
import classes from './Dropdown2.module.css';


const Dropdown2 = ({required, options, name, onChange},props) => {

	return (

		<div className={classes.customSelectWrapper}>
			<div className={classes.customSelect}>
				<div className={classes.custom_select__trigger}><span>Tesla</span>
					<div className="arrow"></div>
				</div>
				<div className={classes.customOptions}>
					<span className={`${classes.customOption} ${classes.customOption_selected}`} data-value="tesla">Tesla</span>
					<span className={classes.customOption} data-value="volvo">Volvo</span>
					<span className={classes.customOption} data-value="mercedes">Mercedes</span>
				</div>
			</div>
		</div>



	)

}
export default Dropdown2;
