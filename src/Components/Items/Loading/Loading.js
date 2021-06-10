import React from 'react';
import classes from './Loading.module.css';
import loading from "../../../img/Loading.gif";


const Loading = ({message}) => {

	return (
		<div className={classes.loadingDiv}>
			<img alt='Loading' src={loading}/>
			<p>{message}</p>
		</div>
	)
}
export default Loading;
