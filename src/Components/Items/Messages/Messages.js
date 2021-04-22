import React from 'react';
import classes from './Messages.module.css';



const Messages = ({message, styleBox}) => (
<div className={`${classes.mainBox}`}>
	<div className={classes.roundIcon}> </div>
		<p className={classes.message}>{message}</p>
</div>
 )
export default Messages;
