import React from 'react';
import classes from './Dropdown.module.css';
import Select from 'react-select'


const Dropdown = ({required,options, name, onChange, valid= false, defaultValue, title },props) => {
	// let selectClass = classes.select;
	//  function clickEventHandle() {
	// 	 options.map(item => item)
	//  }

	return (
		 <div className={classes.dropdownContainer}>

			 <Select
				 className={valid ? classes.selectInput_invalid : classes.selectInput}
				 options={options}
				 name={name}
				 onChange={onChange}
			 />
		 	{/*<select*/}
			{/*	className={valid ? classes.selectInput_invalid : classes.selectInput}*/}

			{/*		required={required}*/}
			{/*		name={name}*/}
			{/*		defaultValue={defaultValue}*/}
			{/*		value={props.value}*/}
			{/*		onChange={onChange}>*/}
			{/*		}*/}

			{/*>*/}
			{/*	<option value={'Select'} hidden disabled selected title={title} className={classes.select}>*/}
			{/*		{defaultValue}*/}
			{/*	</option>*/}

			{/*	{*/}
			{/*		options.map((item, index) => <option className={classes.option} key={index}>{item.label}</option>)*/}

			{/*	}*/}
			{/*</select>*/}

		 </div>



	)

}
export default Dropdown;

