import classes from './AuthPage.module.css'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate} from 'react-router-dom';
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
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSignInMode, setIsSignInMode] = useState(true);
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const dispatch = useDispatch();
    const isSnackbarOpen = useSelector(state => state.offerModal.isSnackbarOpen);
    const isSnackbarOpen2 = useSelector(state => state.offerModal.isSnackbarOpen2);
    const registerHandler = () => {
            navigate('/signUp');
            setLoading(false);
    };

    const changeAuthMode = () => {
        setIsSignInMode(!isSignInMode);
    }

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
            signInHandler(emailRef.current.value, passwordRef.current.value);
        }
        else {
            setLoading(false);
        }
    };

    const signUpValidationHandler = () => {
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
        if(firstNameRef.current.value.length <= 1) {
            setFirstNameError(true);
        }
        else {
            setFirstNameError(false);
        }
        if(lastNameRef.current.value.length <= 1) {
            setLastNameError(true);
        }
        else {
            setLastNameError(false);
        }
        if(validator.isEmail(emailRef.current.value) && validator.isStrongPassword(passwordRef.current.value) && firstNameRef.current.value.length > 1 && lastNameRef.current.value.length > 1) {
            registerAccount(firstNameRef.current.value, lastNameRef.current.value,emailRef.current.value, passwordRef.current.value);
        }
        else {
            setLoading(false);
        }
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    async function signInHandler(email, password) {
            const response = await fetch('http://localhost:5099/api/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
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
            navigate('/userPanel');
            window.location.reload();
    };

    async function registerAccount(name, lastName, email, password) {
        const preparedForSending = {
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: password,
            role: 'UserAccount',
        }

        const response = await fetch('http://localhost:5099/api/account/RegisterUserAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preparedForSending),
        });
        if(!response.ok) {
            const text = await response.text();
            if(JSON.parse(text).errors.Email) {
                dispatch(offerModalActions.openSnackbar2());
            }
            else {
                setLoginError(false);
            }
            setLoading(false);
            return;
        }
        setLoading(false);
        setIsSignInMode(true);
        dispatch(offerModalActions.openSnackbar());
    }

    return (
    <div className={classes.container}>
        <div className={classes.leftPanel}>
            <Card className={classes.formContainer}>
                <h1 style={{marginBottom: 25, marginTop: 25}}>{isSignInMode ? 'Sign In!' : 'Sign Up!'}</h1>
                <TextField error={loginError} inputRef={emailRef} id="outlined-basic" label="E-mail*" helperText={loginError && loginErrorMessage} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
                <TextField error={passwordError} inputRef={passwordRef} id="outlined-basic2" label="Password*" helperText={passwordError && passwordErrorMessage} type='password' variant="outlined"sx={{mb: 3, width: 4/5}}/>
                {!isSignInMode && <TextField error={firstNameError} inputRef={firstNameRef} id="outlined-basic" label="First name*" helperText={firstNameError && 'Please insert correct first name'} variant="outlined"  sx={{mb: 3, width: 4/5}}/>}
                {!isSignInMode && <TextField error={lastNameError} inputRef={lastNameRef} id="outlined-basic2" label="Last name*" helperText={lastNameError && 'Please insert correct last name'} variant="outlined"sx={{mb: 3, width: 4/5}}/>}
                <span onClick={()=>{changeAuthMode()}} className={classes.changingText}>{isSignInMode ? 'Dont have an account? Sign up!' : 'Do you have and account? Sign in!'}</span>
                {isSignInMode && <LoginSocialGoogle client_id='519616560661-tlaqndhk5u5rcr3ltbu7riaob0anrh11.apps.googleusercontent.com'
                                   onReject={({error})=>{console.log(error)}}
                                   onResolve={({provider, data})=>{signInHandler(data.email, data.sub)}}
                scope='https://www.googleapis.com/auth/userinfo.email'>
                <GoogleLoginButton><span>Sign in with google</span></GoogleLoginButton>
                </LoginSocialGoogle>}
                {!isSignInMode && <LoginSocialGoogle client_id='519616560661-tlaqndhk5u5rcr3ltbu7riaob0anrh11.apps.googleusercontent.com'
                                                    onReject={({error})=>{console.log(error)}}
                                                    onResolve={({provider, data})=>{registerAccount(data.given_name, data.family_name,data.email, data.sub)}}
                                                    scope='https://www.googleapis.com/auth/userinfo.email'>
                    <GoogleLoginButton><span>Sign up with google</span></GoogleLoginButton>
                </LoginSocialGoogle>}
                { !isSignInMode &&  <Button onClick={()=>{registerHandler()}} variant="contained" sx={{mt: 3}}>Create company account!</Button>}
                {isSignInMode && <Button onClick={signInValidationHandler} variant="contained" sx={{mb: 3, mt: 3}}>{loading ? `Loading...` : `Sign In`}</Button>}
                {!isSignInMode && <Button onClick={signUpValidationHandler} variant="contained" sx={{mb: 3, mt: 3}}>{loading ? `Loading...` : `Sign Up`}</Button>}
            </Card>
        </div>
        <div className={classes.rightPanel}>
            <img src={image} alt="img1" className={classes.image}/>
            <h1 className={classes.imageText}>Find your new employee with us!</h1>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
               Account not found!
            </Alert>
        </Snackbar>
        <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={()=>{dispatch(offerModalActions.closeSnackbar())}}>
            <Alert onClose={()=>{dispatch(offerModalActions.closeSnackbar())}} severity='success' sx={{ width: '100%' }}>
                Account added succesfully!
            </Alert>
        </Snackbar>
        <Snackbar open={isSnackbarOpen2} autoHideDuration={6000} onClose={()=>{dispatch(offerModalActions.closeSnackbar2())}}>
            <Alert onClose={()=>{dispatch(offerModalActions.closeSnackbar2())}} severity='error' sx={{ width: '100%' }}>
                We found account with this email address!
            </Alert>
        </Snackbar>
    </div>
    )
};

export default AuthPage;