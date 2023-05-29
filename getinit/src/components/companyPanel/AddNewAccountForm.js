import classes from './AddNewAccountForm.module.css';
import { useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import Button from "@mui/material/Button";
const AddNewAccountForm = (props) => {

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const validationHandler = () => {
        const validator = require('validator');
            if(firstNameRef.current.value.length < 2) {
                setFirstNameError(true);
            }
            else {
                setFirstNameError(false);
            }
            if(lastNameRef.current.value.length < 2) {
                setLastNameError(true);
            }
            else {
                setLastNameError(false);
            }
            if(!validator.isEmail(emailRef.current.value)) {
                setEmailError(true);
                setEmailErrorMessage('Please insert correct email address!');
            }
            else {
                setEmailError(false);
            }
            if(!validator.isStrongPassword(passwordRef.current.value)) {
                setPasswordError(true);
                setPasswordErrorMessage('Password is not strong!')
            }
            else {
                setPasswordError(false);
            }
            if(confirmPasswordRef.current.value !== passwordRef.current.value) {
                setPasswordError(true);
                setPasswordErrorMessage('Passwords are not the same!')
            }
            if(firstNameRef.current.value.length > 1 && lastNameRef.current.value.length > 1 && validator.isEmail(emailRef.current.value) && validator.isStrongPassword(passwordRef.current.value) && passwordRef.current.value === confirmPasswordRef.current.value) {
                addNewAccountHandler();
                props.onModalClose();
            }
    }

    async function addNewAccountHandler() {
        setLoading(true);
        const preparedForSending = {
            name: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value,
            role: 'EmployeeAccount',
        }

        const response = await fetch('http://localhost:5099/api/account/manager/RegisterEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(preparedForSending),
        });
        if(!response.ok) {
            const text = await response.text();
            if(JSON.parse(text).errors.Email) {
                setEmailErrorMessage('Email is taken, please insert another email address!');
                setEmailError(true);
                setLoading(false);
            }
            else {
                setEmailError(false);
                setLoading(false);
            }
            throw new Error(text);
        }
        props.onAddAccountSuccesful();
        props.onModalClose();
    }

    return (
        <div className={classes.container}>
            <Typography variant="h4" mb={3}>
                Add new company account
            </Typography>
            <TextField error={firstNameError} inputRef={firstNameRef} id="outlined-basic" label="First name*" helperText={firstNameError && 'Please insert correct first name (length > 1)'} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <TextField error={lastNameError} inputRef={lastNameRef} id="outlined-basic1" label="Last name*" helperText={lastNameError && 'Please insert correct last name! (length > 1)'} variant="outlined"sx={{mb: 3, width: 4/5}}/>
            <TextField error={emailError} inputRef={emailRef} id="outlined-basic2" label="E-mail*" helperText={emailError && emailErrorMessage} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <TextField error={passwordError} inputRef={passwordRef} id="outlined-basic3" label="Password*" helperText={passwordError && passwordErrorMessage} type='password' variant="outlined"sx={{mb: 3, width: 4/5}}/>
            <TextField error={passwordError} inputRef={confirmPasswordRef} id="outlined-basic4" label="Confirm password*" helperText={passwordError && 'Please insert correct password!'} type='password' variant="outlined"sx={{mb: 3, width: 4/5}}/>
            <Button onClick={validationHandler} variant="contained" sx={{mb: 3}}>{loading ? 'Loading...' : 'Add'}</Button>
        </div>
    );
};

export default AddNewAccountForm;