import classes from './RegisterPage.module.css'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/i1.png'

const RegisterPage = () => {

    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const formHandler = () => {
        navigate('/completeRegister');
    };

    return (
    <div className={classes.container}>
        <div className={classes.leftPanel}>
            <Card className={classes.formContainer}> 
                <h1 style={{marginBottom: 25, marginTop: 25}}>Register your Company!</h1>
                <TextField inputRef={emailRef} id="outlined-basic" label="E-mail*" variant="outlined"  sx={{mb: 3, width: 3/5}}/>
                <TextField inputRef={passwordRef} id="outlined-basic" label="Password*" type='password' variant="outlined"sx={{mb: 3, width: 3/5}}/>
                <div className={classes.termsContainer}><Checkbox/> <span>I accept <a href="#">terms</a> of service *</span></div>
                <Button onClick={formHandler} variant="contained" sx={{mb: 3}}>Register</Button>
            </Card>
        </div>
        <div className={classes.rightPanel}>
            <img src={image} alt="img1" className={classes.image}/>
            <h1 className={classes.imageText}>Find your new employee with us!</h1>
        </div>
    </div>
    )
};

export default RegisterPage;