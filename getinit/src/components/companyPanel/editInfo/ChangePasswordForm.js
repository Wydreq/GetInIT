import {TextField} from "@mui/material";
import {useState, useRef} from "react";
import Button from "@mui/material/Button";
import classes from './ChangeEmailForm.module.css'

const ChangePasswordForm = (props) => {

    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const oldPasswordRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [loading, setLoading] = useState(false);
    const validationHandler = () => {
        setLoading(true);
        const validator = require('validator');
        if(!validator.isStrongPassword(passwordRef.current.value)){
            setPasswordErrorMessage('Passwords must be strong!');
            setOldPasswordError('Passwords must be strong!');
            setPasswordError(true);
            setLoading(false);
        }
        else {
            setPasswordError(false);
            setLoading(false);
        }
        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            setPasswordErrorMessage('Passwords are not the same!');
            setPasswordError(true);
            setLoading(false);
        }
        if(passwordRef.current.value === confirmPasswordRef.current.value && validator.isStrongPassword(passwordRef.current.value)) {
            changePasswordHandler();
        }
    }

    async function changePasswordHandler() {
        const response = await fetch('http://localhost:5099/api/account/ChangePassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                password: passwordRef.current.value,
                confirmPassword: confirmPasswordRef.current.value,
            }),
        });
        if(!response.ok) {
            throw new Error("Something went wrong!");
        }
        setLoading(false);
        props.onClose();
        props.onChange(false);
    }

    return(
        <div className={classes.container}>
            <TextField error={oldPasswordError} inputRef={oldPasswordRef} id="outlined-basic" label="Old password*" helperText={oldPasswordError && 'Please insert correct current password!'} variant="outlined" type='password'  sx={{mb: 3, width: 4/5}}/>
            <TextField error={passwordError} inputRef={passwordRef} id="outlined-basic2" label="New password*" helperText={passwordError && passwordErrorMessage} variant="outlined" type='password' sx={{mb: 3, width: 4/5}}/>
            <TextField error={passwordError} inputRef={confirmPasswordRef} id="outlined-basic3" label="Confirm new password*" helperText={passwordError && passwordErrorMessage} variant="outlined" type='password' sx={{mb: 3, width: 4/5}}/>
            <Button onClick={validationHandler} variant="contained" sx={{mb: 3}}>{loading ? 'Loading...' : 'Confirm'}</Button>
        </div>
    )
}

export default ChangePasswordForm;