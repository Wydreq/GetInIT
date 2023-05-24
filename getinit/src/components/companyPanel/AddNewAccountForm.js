import classes from './AddNewAccountForm.module.css';
import { useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';

const AddNewAccountForm = () => {

    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    return (
        <div className={classes.container}>
            <h1 style={classes.title}>Input new company account informations</h1>
            <TextField error={loginError} inputRef={emailRef} id="outlined-basic" label="E-mail*" helperText={loginError && 'Please insert correct email!'} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <TextField error={passwordError} inputRef={passwordRef} id="outlined-basic2" label="Password*" helperText={passwordError && 'Please insert correct password!'} type='password' variant="outlined"sx={{mb: 3, width: 4/5}}/>
        </div>
    );
};

export default AddNewAccountForm;