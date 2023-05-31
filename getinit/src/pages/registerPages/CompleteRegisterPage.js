import classes from './CompleteRegisterPage.module.css'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import React, {useEffect, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {TailSpin} from "react-loader-spinner";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {offerModalActions} from "../../store";
import {useDispatch} from "react-redux";
import {LoginSocialGoogle} from "reactjs-social-login";
import {GoogleLoginButton} from "react-social-login-buttons";

const CompleteRegisterPage = () => {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const dispatch = useDispatch();
    const mailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const companyNameRef = useRef();
    const urlRef = useRef();
    const nipRef = useRef();
    const regonRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();
    const countryRef = useRef();
    const buildingNumberRef = useRef();

    const [mailError, setMailError] = useState(false);
    const [mailErrorMessage, setMailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [companyNameError,setCompanyNameError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [nipError, setNipError] = useState(false);
    const [regonError, setRegonError] = useState(false);
    const [streetError, setStreetError] = useState(false);
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [buildingNumberError, setBuildingNumberError] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    useEffect(()=>{},[mailError,passwordError,firstNameError,lastNameError,companyNameError,urlError,nipError,regonError,streetError,postalCodeError,cityError,countryError,buildingNumberError])

    const validationHandler = () => {
        setLoading(true);
        const validator = require('validator');
        if(!validator.isEmail(mailRef.current.value)) {
            setMailErrorMessage('Please insert correct email address!');
            setMailError(true);
        }
        else {
            setMailError(false);
        }
        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            setPasswordErrorMessage('Passwords are not the same!');
            setPasswordError(true);
        }
        else {
            setPasswordError(false);
        }
        if(!validator.isStrongPassword(passwordRef.current.value)) {
            setPasswordErrorMessage('Passwords must be strong!');
            setPasswordError(true);
        }

        if(firstNameRef.current.value.length < 2) {
            setFirstNameError(true);
        }
        else {
            setFirstNameError(false);
        }
        if(lastNameRef.current.value.length < 2) {
            setLastNameError(true);
        }
        else {
            setLastNameError(false);
        }
        if(companyNameRef.current.value.length < 3) {
            setCompanyNameError(true);
        }
        else {
            setCompanyNameError(false);
        }
        if(urlRef.current.value.length > 0) {
            if(!validator.isURL(urlRef.current.value)) {
                setUrlError(true);
            }
            else {
                setUrlError(false);
            }
        }
        else {
            setUrlError(false);
        }
        if(nipRef.current.value.length !== 10) {
            setNipError(true);
        }
        else {
            setNipError(false);
        }
        if(regonRef.current.value.length < 8 ) {
            setRegonError(true);
        }
        else {
            setRegonError(false);
        }
        if(streetRef.current.value.length < 3) {
            setStreetError(true);
        }
        else {
            setStreetError(false);
        }
        if(buildingNumberRef.current.value.length < 1) {
            setBuildingNumberError(true);
        }
        else {
            setBuildingNumberError(false);
        }
        if(!validator.isPostalCode(postalCodeRef.current.value,'PL')) {
            setPostalCodeError(true);
        }
        else {
            setPostalCodeError(false);
        }
        if(cityRef.current.value.length < 3) {
            setCityError(true);
        }
        else {
            setCityError(false);
        }
        if(countryRef.current.value.length < 3) {
            setCountryError(true);
        }
        else {
            setCountryError(false);
        }
        if(!mailError && !passwordError && !firstNameError && !lastNameError && !companyNameError && !urlError && !nipError && !regonError && !streetError && !buildingNumberError && !postalCodeError && !cityError && !countryError) {
            registerAccount();
        }
        else {
            setLoading(false);
        }
    }


    async function registerAccount() {
        const preparedForSending = {
            name: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: mailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value,
            role: 'ManagerCompanyAccount',
            createCompanyDto: {
                name: companyNameRef.current.value,
                url: urlRef.current.value,
                nip: nipRef.current.value,
                regon: regonRef.current.value,
                addressDto: {
                    country: countryRef.current.value,
                    city: cityRef.current.value,
                    street: streetRef.current.value,
                    buildingNumber: buildingNumberRef.current.value,
                    postalCode: postalCodeRef.current.value,
                }
            }
        }

        const response = await fetch('http://localhost:5099/api/account/RegisterAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preparedForSending),
        });
        if(!response.ok) {
            const text = await response.text();
            if(JSON.parse(text).errors.Email) {
                setMailErrorMessage('Email is taken, please insert another email address!');
                setMailError(true);
            }
            else {
                setMailError(false);
            }
            setLoading(false);
            throw new Error(text);
            handleOpen();
        }
        setLoading(false);
        dispatch(offerModalActions.openSnackbar());
        navigate('/auth');
    }

    return (
    <div className={classes.container}>
            <Card className={classes.formContainer}> 
                <h1 style={{marginBottom: 25, marginTop: 25}}>Sign Up!</h1>
                <div className={classes.inputsContainer}>
                    <TextField inputRef={mailRef} error={mailError}  helperText={mailError && mailErrorMessage} label="E-mail*" variant="outlined"  sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={passwordRef} error={passwordError} helperText={passwordError && passwordErrorMessage} label="Password*" type='password' variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={confirmPasswordRef} error={passwordError} helperText={passwordError && passwordErrorMessage} label="Confirm password*" type='password' variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={firstNameRef} error={firstNameError}  helperText={firstNameError && 'Please insert correct firstname!'} label="First name*" variant="outlined"  sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={lastNameRef} error={lastNameError} helperText={lastNameError && 'Please insert correct lastname!'} label="Last name*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={companyNameRef} error={companyNameError} helperText={companyNameError && 'Please insert correct company name!'} label="Company name*" variant="outlined"  sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={urlRef} error={urlError} helperText={urlError && 'Please insert correct url!'} label="Company page url" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={nipRef} error={nipError} helperText={nipError && 'Please insert correct nip!'} label="NIP*" type='number' variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={regonRef} error={regonError} helperText={regonError && 'Please insert correct regon!'} label="REGON*" type='number' variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={streetRef} error={streetError} helperText={streetError && 'Please insert correct street name!'} label="Street*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={buildingNumberRef} error={buildingNumberError} helperText={buildingNumberError && 'Please insert correct buildng number!'} type='number' label="Building number*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={postalCodeRef} error={postalCodeError} helperText={postalCodeError && 'Please insert correct postal code (00-000)!'} label="Postal code*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={cityRef} error={cityError} helperText={cityError && 'Please insert correct city!'} label="City*" variant="outlined"sx={{mb: 3, width:2/5, margin: 2}}/>
                    <TextField inputRef={countryRef} error={countryError} helperText={countryError && 'Please insert correct country!'} label="Country*" variant="outlined"sx={{mb: 3, width:2/5, margin: 2}}/>
                </div>
                {!loading && <div>
                    <Button onClick={()=> {navigate('/auth')}} variant="contained" sx={{mb: 3, mt:3, mr: 3}}>Back</Button>
                    <Button onClick={validationHandler} variant="contained" sx={{mb: 3, mt:3}}>Register</Button>
                </div>}
                {loading && <TailSpin
                    height="50"
                    width="50"
                    color="#1976d2"
                    ariaLabel="tail-spin-loading"
                    radius="2"
                    visible={true}
                />}
            </Card>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
                Something went wrong!
            </Alert>
        </Snackbar>
    </div>
    )
};

export default CompleteRegisterPage;