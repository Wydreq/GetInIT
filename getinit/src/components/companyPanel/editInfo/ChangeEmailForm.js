import {TextField} from "@mui/material";
import {useState, useRef} from "react";
import Button from "@mui/material/Button";
import classes from './ChangeEmailForm.module.css'

const ChangeEmailForm = (props) => {

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const emailRef = useRef();
    const confirmEmailRef = useRef();
    const [loading, setLoading] = useState(false);
    const validationHandler = () => {
        setLoading(true);
        const validator = require('validator');
        if(!validator.isEmail(emailRef.current.value) || !validator.isEmail(confirmEmailRef.current.value)) {
            setEmailErrorMessage('Insert correct emails!')
            setEmailError(true);
            setLoading(false);
        }
        if(emailRef.current.value !== confirmEmailRef.current.value) {
            setEmailErrorMessage('Emails are not the same!')
            setEmailError(true);
            setLoading(false);
        }
        if(validator.isEmail(emailRef.current.value) && validator.isEmail(confirmEmailRef.current.value) && emailRef.current.value === confirmEmailRef.current.value) {
            setEmailError(false);
            changingEmailHandler();
            setLoading(false);
        }
    }

    async function changingEmailHandler() {
        const response = await fetch('http://localhost:5099/api/account/ChangeEmail', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                confirmEmail: confirmEmailRef.current.value
            }),
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
        props.onClose();
        props.onChange(true);
    };

    return(
        <div className={classes.container}>
            <TextField error={emailError} inputRef={emailRef} id="outlined-basic" label="New e-mail*" helperText={emailError && emailErrorMessage} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <TextField error={emailError} inputRef={confirmEmailRef} id="outlined-basic" label="Confirm new e-mail*" helperText={emailError && emailErrorMessage} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <Button onClick={validationHandler} variant="contained" sx={{mb: 3}}>{loading ? 'Loading...' : 'Confirm'}</Button>
        </div>
    )
}

export default ChangeEmailForm;