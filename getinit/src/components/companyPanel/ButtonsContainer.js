import classes from './ButtonsContainer.module.css';
import { Modal, Box, Typography } from '@mui/material';
import React from 'react';
import AddNewAccountForm from './AddNewAccountForm';
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    borderRadius: 15,
    boxShadow: 24,
    p: 4,
  };

const ButtonsContainer = () => {
    const navigate = useNavigate();
    return (
        <>
        <div className={classes.container}>
            <div className={classes.button}>Manage your offers</div>
            <div className={classes.button}>Edit account info</div>
            <div className={classes.button} onClick={()=>{navigate('/companyAccounts');}}>Manage your company accounts</div>
            <div className={classes.button}>Delete your account</div>
        </div>
        </>
    )
}

export default ButtonsContainer;