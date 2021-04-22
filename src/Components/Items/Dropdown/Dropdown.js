import React from 'react';
import classes from './Dropdown.module.css';


const Dropdown = ({required, options, name, onChange, valid= false},props) => {

	return (

		 <div className={classes.dropdownContainer}>
		 	<select className={valid ? classes.selectInput_invalid : classes.selectInput}
					required={required}
					name={name}
					value={props.value}
					onChange={onChange}

			>
				<option value={'Select'} hidden disabled selected>
					{'Select...'}
				</option>

				{
					options.map((item, index) => <option className={classes.option} key={index}>{item.label}</option>)

				}
			</select>

		 </div>



	)

}
export default Dropdown;

