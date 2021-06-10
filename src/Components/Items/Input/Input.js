import React from 'react';

import classes from './Input.module.css';
import Label from '../Label/Label'

const Input = (props) => {

	return 	(
		<div className={classes.mainContainerInput}>
			<Label label={props.label} />
			<input
				className={`${classes.inputMain} ${props.className}`}
				type={props.type}
				name={props.name}
				style={props.style}
				onChange={props.onChange}
				onInput={props.onInput}
				ref={props.ref}
				value={props.value}
				onWheel={props.onWheel}
			/>
		</div>
	)
}
export default Input;
