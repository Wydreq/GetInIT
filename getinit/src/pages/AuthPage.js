import classes from './AuthPage.module.css'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image from '../assets/i1.png';
import { registerActions } from '../store/index';
import { useDispatch } from 'react-redux'

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();

    const registerHandler = () => {

        if(emailRef.current.value.length < 5 || passwordRef.current.value.length < 5) {
            if(emailRef.current.value.length < 5) {
                setLoginError(true);
            }
            else {
                setLoginError(false);
            }
            if(passwordRef.current.value.length < 5) {
                setPasswordError(true);
            }
            else {
                setPasswordError(false);
            }
        }
        else {
            dispatch(registerActions.saveEmailPassword({email: emailRef.current.value, password: passwordRef.current.value}));
            navigate('/completeRegister');
        }
    };

    const signInHandler = () => {};

    return (
    <div className={classes.container}>
        <div className={classes.leftPanel}>
            <Card className={classes.formContainer}> 
                {!isLogin && <h1 style={{marginBottom: 25, marginTop: 25}}>Register your Company!</h1>}
                {isLogin && <h1 style={{marginBottom: 25, marginTop: 25}}>Log In!</h1>}
                <TextField error={loginError} inputRef={emailRef} id="outlined-basic" label="E-mail*" variant="outlined"  sx={{mb: 3, width: 4/5}}/>
                <TextField error={passwordError} inputRef={passwordRef} id="outlined-basic2" label="Password*" type='password' variant="outlined"sx={{mb: 3, width: 4/5}}/>
                {!isLogin && <div className={classes.termsContainer}><Checkbox/> <span>I accept <a href="/#">terms</a> of service *</span></div>}
                {isLogin && <span onClick={()=>{setIsLogin(!isLogin)}} className={classes.changingText}>Dont have an account? Sign up!</span>}
                {!isLogin && <span onClick={()=>{setIsLogin(!isLogin)}} className={classes.changingText}>Already have an account? Sign in!</span>}
                {!isLogin && <Button onClick={registerHandler} variant="contained" sx={{mb: 3}}>Register</Button>}
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