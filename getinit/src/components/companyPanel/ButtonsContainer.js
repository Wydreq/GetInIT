import classes from './ButtonsContainer.module.css';
import React from 'react';
import {useNavigate} from "react-router-dom";

const ButtonsContainer = (props) => {
    const navigate = useNavigate();
    return (
        <>
        <div className={classes.container}>
            <div className={classes.button}>Manage your offers</div>
            <div className={classes.button} onClick={()=>{navigate('/editInfo')}}>Edit account info</div>
            {props.userInfo.role === 'CompanyAccount' && <div className={classes.button} onClick={()=>{navigate('/companyAccounts');}}>Manage your company accounts</div>}
            <div className={classes.button}>Delete your account</div>
        </div>
        </>
    )
}

export default ButtonsContainer;