import classes from './CompanyUserBar.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import StarsIcon from '@mui/icons-material/Stars';

import React from "react";

const CompanyUserBar = (props) => {
    return(
        <div className={classes.userBarContainer}>
            <span className={classes.userInfo}>{props.user.firstName}</span>
            <span className={classes.userInfo}>{props.user.lastName}</span>
            <span className={classes.userInfo}>{props.user.email}</span>
            {props.user.role === 'Employee' && <div className={classes.deleteButton}>
                <span className={classes.icon}>
                    <DeleteIcon fontSize='inherit'/>
                </span>
            </div>}
            {props.user.role === 'Manager' && <div className={classes.starContainer}>
                <span className={classes.iconMain}>
                    <StarsIcon fontSize='inherit'/>
                </span>
            </div>}
        </div>
    )
}

export default CompanyUserBar;