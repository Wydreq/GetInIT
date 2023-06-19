import classes from './CompanyUserBar.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import StarsIcon from '@mui/icons-material/Stars';

import React from "react";
import {redirect} from "react-router-dom";

const CompanyUserBar = (props) => {

    const employeeDeleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete employee account?')) {
            const response = await fetch(`http://localhost:5099/api/account/manager/DeleteEmployee/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            if(!response.ok) {
                throw new Error('Something went wrong!');
            }
            props.onDelete();
        }
    }

    return(
        <div className={classes.userBarContainer} data-testid='UserBar' >
            <span className={classes.userInfo}>{props.user.firstName}</span>
            <span className={classes.userInfo}>{props.user.lastName}</span>
            <span className={classes.userInfo}>{props.user.email}</span>
            {props.user.role === 'Employee' && <div className={classes.deleteButton} onClick={()=>{employeeDeleteHandler(props.user.id)}}>
                <span className={classes.icon}>
                    <DeleteIcon fontSize='inherit'/>
                </span>
            </div>}
            {props.user.role === 'Manager' && <div className={classes.starContainer}>
                <span className={classes.iconMain}>
                    <StarsIcon fontSize='inherit' data-testid="StarsIcon" />
                </span>
            </div>}
        </div>
    )
}

export default CompanyUserBar;