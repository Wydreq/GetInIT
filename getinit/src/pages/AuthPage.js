import classes from './AuthPage.module.css'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image from '../assets/i1.png';
import { registerActions } from '../store/index';
import {authActions} from "../store/index";
import { useDispatch } from 'react-redux';
const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const dispatch = useDispatch();

    const validationHandler = () => {
            const validator = require('validator');

            if(!validator.isEmail(emailRef.current.value) || !validator.isStrongPassword(passwordRef.current.value)) {
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
            }  
            else {
                if(confirmPasswordRef.current.value !== passwordRef.current.value) {
                    setConfirmPasswordError(true);
                    return;
                }
                else {
                    console.log(confirmPasswordRef.current.value, passwordRef.current.value);
                    setConfirmPasswordError(false);
                    registerHandler();
                }
            }  
    }

    const registerHandler = () => {
            dispatch(registerActions.saveEmailPassword({email: emailRef.current.value, password: passwordRef.current.value, confirmPassword: confirmPasswordRef.current.value}));
            navigate('/completeRegister');
    };

    const signInHandler = () => {
        dispatch(authActions.loginHandler({email: emailRef.current.value, password: passwordRef.current.value}))
    };

    return (
    <div className={classes.container}>
        <div className={classes.leftPanel}>
            <Card className={classes.formContainer}> 
                {!isLogin && <h1 style={{marginBottom: 25, marginTop: 25}}>Register your Company!</h1>}
                {isLogin && <h1 style={{marginBottom: 25, marginTop: 25}}>Log In!</h1>}
                <TextField error={loginError} inputRef={emailRef} id="outlined-basic" label="E-mail*" helperText={loginError && 'Please insert correct email!'} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
                <TextField error={passwordError} inputRef={passwordRef} id="outlined-basic2" label="Password*" helperText={passwordError && 'Please insert correct password!'} type='password' variant="outlined"sx={{mb: 3, width: 4/5}}/>
                {!isLogin && <TextField error={confirmPasswordError} inputRef={confirmPasswordRef} id="outlined-basic2" label="Confirm password*" helperText={confirmPasswordError && 'Passwords are not the same!'} type='password' variant="outlined"sx={{mb: 3, width: 4/5}}/>}
                    {!isLogin && <div className={classes.termsContainer}><Checkbox/> <span>I accept <a href="/#">terms</a> of service *</span></div>}
                {isLogin && <span onClick={()=>{setIsLogin(!isLogin)}} className={classes.changingText}>Dont have an account? Sign up!</span>}
                {!isLogin && <span onClick={()=>{setIsLogin(!isLogin)}} className={classes.changingText}>Already have an account? Sign in!</span>}
                {!isLogin && <Button onClick={validationHandler} variant="contained" sx={{mb: 3}}>Register</Button>}
                {isLogin && <Button onClick={signInHandler} variant="contained" sx={{mb: 3}}>Sign In</Button>}
            </Card>
        </div>
        <div className={classes.rightPanel}>
            <img src={image} alt="img1" className={classes.image}/>
            <h1 className={classes.imageText}>Find your new employee with us!</h1>
        </div>
    </div>
    )
};

export default AuthPage;