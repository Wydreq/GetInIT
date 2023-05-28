import classes from './AddNewAccountForm.module.css';
import { useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import Button from "@mui/material/Button";
const AddNewAccountForm = (props) => {

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

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
                setLoginError(true);
            }
            else {
                setLoginError(false);
            }
            if(!validator.isStrongPassword(passwordRef.current.value)) {
                setPasswordError(true);
            }
            else {
                setPasswordError(false);
            }

            if(firstNameRef.current.value.length > 1 && lastNameRef.current.value.length > 1 && validator.isEmail(emailRef.current.value) && validator.isStrongPassword(passwordRef.current.value)) {
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
            confirmPassword: passwordRef.current.value,
            role: 'Employee',
        }

        const response = await fetch('http://localhost:5099/api/company/EmployeeAccount/RegisterEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(preparedForSending),
        })
            .then(function (response) {
                setLoading(false);
                props.onModalClose();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={classes.container}>
            <Typography variant="h4" mb={3}>
                Add new company account
            </Typography>
            <TextField error={firstNameError} inputRef={firstNameRef} id="outlined-basic" label="First name*" helperText={firstNameError && 'Please insert correct email!'} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <TextField error={lastNameError} inputRef={lastNameRef} id="outlined-basic1" label="Last name*" helperText={lastNameError && 'Please insert correct password!'} variant="outlined"sx={{mb: 3, width: 4/5}}/>
            <TextField error={loginError} inputRef={emailRef} id="outlined-basic2" label="E-mail*" helperText={loginError && 'Please insert correct email!'} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <TextField error={passwordError} inputRef={passwordRef} id="outlined-basic3" label="Password*" helperText={passwordError && 'Please insert correct password!'} type='password' variant="outlined"sx={{mb: 3, width: 4/5}}/>
            <Button onClick={validationHandler} variant="contained" sx={{mb: 3}}>{loading ? 'Loading...' : 'Add'}</Button>
        </div>
    );
};

export default AddNewAccountForm;