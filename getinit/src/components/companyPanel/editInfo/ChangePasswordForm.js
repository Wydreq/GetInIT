import {TextField} from "@mui/material";
import {useState, useRef} from "react";
import Button from "@mui/material/Button";
import classes from './ChangeEmailForm.module.css'

const ChangePasswordForm = () => {

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const oldPasswordRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const validationHandler = () => {

    }

    return(
        <div className={classes.container}>
            <TextField error={emailError} inputRef={oldPasswordRef} id="outlined-basic" label="Old password*" helperText={emailError && emailErrorMessage} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <TextField error={emailError} inputRef={passwordRef} id="outlined-basic" label="New password*" helperText={emailError && emailErrorMessage} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <TextField error={emailError} inputRef={confirmPasswordRef} id="outlined-basic" label="Confirm new password*" helperText={emailError && emailErrorMessage} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <Button onClick={validationHandler} variant="contained" sx={{mb: 3}}>Confirm</Button>
        </div>
    )
}

export default ChangePasswordForm;