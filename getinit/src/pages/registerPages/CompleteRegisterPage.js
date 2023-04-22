import classes from './CompleteRegisterPage.module.css'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { registerActions } from '../../store';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompleteRegisterPage = () => {

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

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [companyNameError,setCompanyNameError] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [nipError, setNipError] = useState(false);
    const [regonError, setRegonError] = useState(false);
    const [streetError, setStreetError] = useState(false);
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [buildingNumberError, setBuildingNumberError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationHandler = () => {
        const validator = require('validator');
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
        if(!firstNameError && !lastNameError && !companyNameError && !urlError && !nipError && !regonError && !streetError && !buildingNumberError && !postalCodeError && !cityError && !countryError) {
            registerAccount();
        }
    }


    const registerAccount = () => {
        dispatch(registerActions.createAccount({ 
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            companyName: companyNameRef.current.value,
            url: urlRef.current.value,
            nip: nipRef.current.value,
            regon: 0,
            country: countryRef.current.value,
            city: cityRef.current.value,
            street: streetRef.current.value,
            buildingNumber: buildingNumberRef.current.value,
            postalCode: postalCodeRef.current.value,
        }))
    }

    return (
    <div className={classes.container}>
            <Card className={classes.formContainer}> 
                <h1 style={{marginBottom: 25, marginTop: 25}}>Complete your registration</h1>
                <div className={classes.inputsContainer}>
                    <TextField inputRef={firstNameRef} error={firstNameError}  helperText={firstNameError && 'Please insert correct firstname!'} id="outlined-basic" label="First name*" variant="outlined"  sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={lastNameRef} error={lastNameError} helperText={lastNameError && 'Please insert correct lastname!'} id="outlined-basic" label="Last name*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={companyNameRef} error={companyNameError} helperText={companyNameError && 'Please insert correct company name!'} id="outlined-basic" label="Company name*" variant="outlined"  sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={urlRef} error={urlError} helperText={urlError && 'Please insert correct url!'} id="outlined-basic" label="Company page url" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={nipRef} error={nipError} helperText={nipError && 'Please insert correct nip!'} id="outlined-basic" label="NIP*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={regonRef} error={regonError} helperText={regonError && 'Please insert correct regon!'} id="outlined-basic" label="REGON*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={streetRef} error={streetError} helperText={streetError && 'Please insert correct street name!'} id="outlined-basic" label="Street*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={buildingNumberRef} error={buildingNumberError} helperText={buildingNumberError && 'Please insert correct buildng number!'} id="outlined-basic" label="Building number*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={postalCodeRef} error={postalCodeError} helperText={postalCodeError && 'Please insert correct postal code (00-000)!'} id="outlined-basic" label="Postal code*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={cityRef} error={cityError} helperText={cityError && 'Please insert correct city!'} id="outlined-basic" label="City*" variant="outlined"sx={{mb: 3, width:2/5, margin: 2}}/>
                    <TextField inputRef={countryRef} error={countryError} helperText={countryError && 'Please insert correct country!'} id="outlined-basic" label="Country*" variant="outlined"sx={{mb: 3, width:2/5, margin: 2}}/>
                </div>
                <div>
                    <Button onClick={()=> {navigate('/auth')}} variant="contained" sx={{mb: 3, mt:3, mr: 3}}>Back</Button>
                    <Button onClick={validationHandler} variant="contained" sx={{mb: 3, mt:3}}>Complete registration</Button>
                </div>
            </Card>
    </div>
    )
};

export default CompleteRegisterPage;