import React from 'react';

import classes from './Messages.module.css';

const Messages = ({message, color, colorRound}) => (
    <>
        <div className={`${classes.mainBox}`} style={color}>
            <div className={colorRound}>!</div>
            <p className={classes.message}>{message} </p>
        </div>

        {/*<div className={`${classes.mainBox} ${classes.Warning}`}>*/}
        {/*	<div className={`${classes.roundIcon} ${classes.WarningRound}`}>!</div>*/}
        {/*	<p className={classes.message}>{message}</p>*/}
        {/*</div>*/}

        {/*<div className={`${classes.mainBox} ${classes.Error}`}>*/}
        {/*	<div className={`${classes.roundIcon} ${classes.ErrorRound}`}>!</div>*/}
        {/*	<p className={classes.message}>{message} </p>*/}
        {/*</div>*/}

        {/*<div className={`${classes.mainBox} ${classes.Info}`}>*/}
        {/*	<div className={`${classes.roundIcon} ${classes.InfoRound}`}>!</div>*/}
        {/*	<p className={classes.message}>{message}</p>*/}
        {/*</div>*/}
    </>
)
export default Messages;
