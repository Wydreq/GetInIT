import classes from './AuthPage.module.css'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate, useLocation } from 'react-router-dom';
import image from '../assets/i1.png';
import {useDispatch, useSelector} from "react-redux";
import {offerModalActions} from "../store";
import {LoginSocialGoogle} from "reactjs-social-login";
import {GoogleLoginButton} from "react-social-login-buttons";

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

const AuthPage = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const isSnackbarOpen = useSelector(state => state.offerModal.isSnackbarOpen);
    const registerHandler = () => {
            navigate('/signUp');
            setLoading(false);
    };

    const signInValidationHandler = () => {
        setLoading(true);
        const validator = require('validator');
        if(!validator.isEmail(emailRef.current.value)) {
            setLoginError(true);
            setLoginErrorMessage('Please insert correct email!');
        }
        else {
            setLoginError(false);
        }
        if(!validator.isStrongPassword(passwordRef.current.value)) {
            setPasswordError(true);
            setPasswordErrorMessage('Please insert strong password!');
        }
        else {
            setPasswordError(false);
        }
        if(validator.isEmail(emailRef.current.value) && validator.isStrongPassword(passwordRef.current.value)) {
            signInHandler();
        }
        else {
            setLoading(false);
        }
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    async function signInHandler() {
            const response = await fetch('http://localhost:5099/api/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                }),
            });
            if(!response.ok) {
                setLoading(false);
                setOpen(true);
                setLoginErrorMessage('');
                setPasswordErrorMessage('');
                setPasswordError(true);
                setLoginError(true);
                setPasswordError(true);
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            localStorage.setItem('token', data);
            setLoading(false);
            navigate('/companyPanel');
            window.location.reload();
    };

    return (
    <div className={classes.container}>
        <div className={classes.leftPanel}>
            <Card className={classes.formContainer}>
                <h1 style={{marginBottom: 25, marginTop: 25}}>Log In!</h1>
                <TextField error={loginError} inputRef={emailRef} id="outlined-basic" label="E-mail*" helperText={loginError && loginErrorMessage} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
                <TextField error={passwordError} inputRef={passwordRef} id="outlined-basic2" label="Password*" helperText={passwordError && passwordErrorMessage} type='password' variant="outlined"sx={{mb: 3, width: 4/5}}/>
                <span onClick={()=>{registerHandler()}} className={classes.changingText}>Dont have an account? Sign up!</span>
                <LoginSocialGoogle client_id='519616560661-tlaqndhk5u5rcr3ltbu7riaob0anrh11.apps.googleusercontent.com'
                                   onReject={({error})=>{console.log(error)}}
                                   onResolve={({provider, data})=>{console.log(provider, data)}}
                scope='https://www.googleapis.com/auth/userinfo.email'>
                <GoogleLoginButton/>
                </LoginSocialGoogle>
                <Button onClick={signInValidationHandler} variant="contained" sx={{mb: 3, mt: 3}}>{loading ? `Loading...` : `Sign In`}</Button>
            </Card>
        </div>
        <div className={classes.rightPanel}>
            <img src={image} alt="img1" className={classes.image}/>
            <h1 className={classes.imageText}>Find your new employee with us!</h1>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
               Incorrect e-mail or password!
            </Alert>
        </Snackbar>
        <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={()=>{dispatch(offerModalActions.closeSnackbar())}}>
            <Alert onClose={()=>{dispatch(offerModalActions.closeSnackbar())}} severity='success' sx={{ width: '100%' }}>
                Account added succesfully!
            </Alert>
        </Snackbar>
    </div>
    )
};

export default AuthPage;