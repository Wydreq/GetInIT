import classes from './ManualPaymentPage.module.css';
import React, {useRef, useState} from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import validator from "validator";

const ManualPaymentPage = () => {

    const mailRef = useRef();
    const amountRef = useRef();

    const [emailError, setEmailError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [loading, setLoading] = useState(false);

    const validationHandler = () => {
        setLoading(true);
        if(!validator.isEmail(mailRef.current.value)) {
            setEmailError(true);
        }
        else {
            setEmailError(false);
        }
        if(amountRef.current.value < 2) {
            setAmountError(true);
        }
        else {
            setAmountError(false);
        }
        if (validator.isEmail(mailRef.current.value) && amountRef.current.value >= 2) {
            addManualPaymentHandler();
        }
        else {
            setLoading(false);
        }
    }

    const addManualPaymentHandler = async () => {
        setLoading(false);
    }

    return(
        <div className={classes.container}>
            <h1 className={classes.title}>Add new manual payment</h1>
            <TextField error={emailError} inputRef={mailRef} id="outlined-basic" label="User email*" helperText={emailError && 'Please insert correct email'} variant="outlined"  sx={{mb: 3,mt:3,mr:3, width: 2/5}}/>
            <TextField error={amountError} inputRef={amountRef} id="outlined-basic2" label="Amount*" helperText={amountError && 'Please insert correct amount > 2'} variant="outlined"  sx={{mb: 3,mt:3,mr:3, width: 2/5}}/>
            <Button onClick={validationHandler} variant="contained" sx={{mt: 3, width: 1/5}}>{loading ? 'Loading...' : 'Add'}</Button>
        </div>
    )
}

export default ManualPaymentPage;