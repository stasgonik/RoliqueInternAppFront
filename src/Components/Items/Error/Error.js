import React from 'react';


import classes from './Error.module.css';


const Error = (props) => {

	return (
		<div>
			<div className={classes.errorDiv}>{props.message}</div>
		</div>
	)
}
export default Error;

