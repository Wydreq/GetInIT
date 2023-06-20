import classes from './ManualPaymentPage.module.css';
import React, {useRef, useState} from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import validator from "validator";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {offerModalActions} from "../../store";

const ManualPaymentPage = () => {

    const emailRef = useRef();
    const lastnameRef = useRef();
    const amountRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [emailError, setEmailError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [loading, setLoading] = useState(false);

    const validationHandler = () => {
        setLoading(true);
        if(!validator.isEmail(emailRef.current.value)) {
            setEmailError(true);
        }
        else {
            setEmailError(false);
        }
        if(lastnameRef.current.value.length === 0) {
            setLastNameError(true);
        }
        else {
            setLastNameError(false);
        }
        if(amountRef.current.value < 2) {
            setAmountError(true);
        }
        else {
            setAmountError(false);
        }
        if (validator.isEmail(emailRef.current.value) && lastnameRef.current.value.length !== 0 && amountRef.current.value >= 2) {
            addManualPaymentHandler();
        }
        else {
            setLoading(false);
        }
    }

    const addManualPaymentHandler = async () => {
        const preparedForSending = {
            email: emailRef.current.value,
            name: lastnameRef.current.value,
            amount: amountRef.current.value,
        }
        const response = await fetch('http://localhost:5099/CreateCheckoutSession/OfflinePayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(preparedForSending),
        });
        if (!response.ok) {
            setLoading(false);
        }
        dispatch(offerModalActions.openPaymentSnackbar());
        navigate('/userPanel');
        setLoading(false);
    }
    return(
        <div className={classes.container}>
            <h1 className={classes.title}>Add new manual payment</h1>
            <TextField error={emailError} inputRef={emailRef} id="outlined-basic" label="Email*" helperText={emailError && 'Please insert correct email!'} variant="outlined"  sx={{mb: 3,mt:3,mr:3, width: 2/5}}/>
            <TextField error={lastNameError} inputRef={lastnameRef} id="outlined-basic" label="Name*" helperText={lastNameError && 'Please insert correct last name!'} variant="outlined"  sx={{mb: 3,mt:3,mr:3, width: 2/5}}/>
            <TextField error={amountError} inputRef={amountRef} id="outlined-basic2" label="Amount*" helperText={amountError && 'Please insert correct amount > 2'} variant="outlined"  sx={{mb: 3,mt:3,mr:3, width: 2/5}}/>
            <Button onClick={validationHandler} variant="contained" sx={{mt: 3, width: 1/5}}>{loading ? 'Loading...' : 'Add'}</Button>
        </div>
    )
}

export default ManualPaymentPage;