import {TextField} from "@mui/material";
import {useState, useRef} from "react";
import Button from "@mui/material/Button";
import classes from './ChangeEmailForm.module.css'

const ChangeEmailForm = () => {

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const emailRef = useRef();
    const confirmEmailRef = useRef();

    const validationHandler = () => {
        const validator = require('validator');
        if(!validator.isEmail(emailRef.current.value) || !validator.isEmail(confirmEmailRef.current.value)) {
            setEmailErrorMessage('Insert correct emails!')
            setEmailError(true);
        }
        if(emailRef.current.value !== confirmEmailRef.current.value) {
            setEmailErrorMessage('Emails are not the same!')
            setEmailError(true);
        }
        if(validator.isEmail(emailRef.current.value) && validator.isEmail(confirmEmailRef.current.value) && emailRef.current.value === confirmEmailRef.current.value) {
            setEmailError(false);
            //changing email
        }
    }

    return(
        <div className={classes.container}>
            <TextField error={emailError} inputRef={emailRef} id="outlined-basic" label="New e-mail*" helperText={emailError && emailErrorMessage} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <TextField error={emailError} inputRef={confirmEmailRef} id="outlined-basic" label="Confirm new e-mail*" helperText={emailError && emailErrorMessage} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <Button onClick={validationHandler} variant="contained" sx={{mb: 3}}>Confirm</Button>
        </div>
    )
}

export default ChangeEmailForm;