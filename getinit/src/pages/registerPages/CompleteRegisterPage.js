import classes from './CompleteRegisterPage.module.css'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import { registerActions } from '../../store';
import { useDispatch } from 'react-redux'

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
    const dispatch = useDispatch();

    const registerAccount = () => {
        dispatch(registerActions.createAccount({ 
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            companyName: companyNameRef.current.value,
            url: urlRef.current.value,
            nip: nipRef.current.value,
            regon: regonRef.current.value,
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
                    <TextField inputRef={firstNameRef} id="outlined-basic" label="First name*" variant="outlined"  sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={lastNameRef} id="outlined-basic" label="Last name*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={companyNameRef} id="outlined-basic" label="Company name*" variant="outlined"  sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={urlRef} id="outlined-basic" label="Company page url" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={nipRef} id="outlined-basic" label="NIP*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={regonRef} id="outlined-basic" label="REGON*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={streetRef} id="outlined-basic" label="Street*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={buildingNumberRef} id="outlined-basic" label="Building number*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={postalCodeRef} id="outlined-basic" label="Postal code*" variant="outlined"sx={{mb: 3, width: 2/5, margin: 2}}/>
                    <TextField inputRef={cityRef} id="outlined-basic" label="City*" variant="outlined"sx={{mb: 3, width:2/5, margin: 2}}/>
                    <TextField inputRef={countryRef} id="outlined-basic" label="Country*" variant="outlined"sx={{mb: 3, width:2/5, margin: 2}}/>
                    <TextField
                        id="outlined-multiline-static"
                        label="About company*"
                        multiline
                        rows={5}
                        sx={{mb: 3, width: 4/5, margin: 2}}
                    />
                </div>
                <Button onClick={registerAccount} variant="contained" sx={{mb: 3}}>Complete registration</Button>
            </Card>
    </div>
    )
};

export default CompleteRegisterPage;