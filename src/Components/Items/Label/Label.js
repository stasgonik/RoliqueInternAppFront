import React from 'react';

import classes from './Label.module.css';

const Label = (props) => {

	return 	(
			<label className={classes.titleOverInput}>{props.label}</label>
	)
}
export default Label;
