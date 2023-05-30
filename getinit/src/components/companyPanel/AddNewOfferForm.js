import classes from './AddNewOfferForm.module.css';
import { useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
const AddNewOfferForm = (props) => {

    const [offerTitleError, setOfferTitleError] = useState(false);
    const [offerDescriptionError, setOfferDescriptionError] = useState(false);
    const [primaryLanguageError, setPrimaryLanguageError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [salaryFromError, setSalaryFromError] = useState(false);
    const [salaryToError, setSalaryToError] = useState(false);
    const [level, setLevel] = useState(0);

    const [loading, setLoading] = useState(false);
    const offerTitleRef = useRef();
    const offerDescriptionRef = useRef();
    const primaryLanguageRef = useRef();
    const phoneNumberRef = useRef();
    const emailRef = useRef();
    const salaryFromRef = useRef();
    const salaryToRef = useRef();

    const handleChange = (event) => {
        setLevel(event.target.value);
        console.log(level);
    };

    const validationHandler = () => {

    }

    async function addNewAccountHandler() {
    }

    return (
        <div className={classes.container}>
            <Typography variant="h4" mb={3}>
                Add new offer
            </Typography>
            <TextField error={offerTitleError} inputRef={offerTitleRef} id="outlined-basic" label="Offer title*" helperText={offerTitleError && 'Please insert correct offer title (length > 5)'} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <TextField error={primaryLanguageError} inputRef={primaryLanguageRef} id="outlined-basic2" label="Primary language*" helperText={primaryLanguageError && 'Please insert correct primary language'} variant="outlined"  sx={{mb: 3, width: 4/5}}/>
            <Select
                id="demo-simple-select"
                value={level}
                onChange={handleChange}
                sx={{mb: 3, width: 4/5}}
            >
                <MenuItem value={0}>Select level</MenuItem>
                <MenuItem value={1}>Junior</MenuItem>
                <MenuItem value={2}>Mid</MenuItem>
                <MenuItem value={3}>Senior</MenuItem>
            </Select>
            <TextField error={phoneNumberError} inputRef={phoneNumberRef} id="outlined-basic3" label="Contact phone number*" helperText={phoneNumberError && 'Insert correct phone number'} type='number' variant="outlined"sx={{mb: 3, width: 4/5}}/>
            <TextField error={emailError} inputRef={emailRef} id="outlined-basic4" label="Contact mail address*" helperText={emailError && 'Please insert correct mail address!'} variant="outlined"sx={{mb: 3, width: 4/5}}/>
            <div className={classes.salaryContainer}>
                <TextField error={salaryFromError} inputRef={salaryFromRef} id="outlined-basic3" label="Salary from*" helperText={salaryFromError && 'Insert correct phone number'} type='number' variant="outlined"sx={{mb: 3, width: 2/6}}/>
                <span className={classes.to}>-</span>
                <TextField error={salaryToError} inputRef={salaryToRef} id="outlined-basic4" label="Salary to*" helperText={salaryToError && 'Please insert correct mail address!'} type='number' variant="outlined"sx={{mb: 3, width: 2/6}}/>
            </div>
            <TextField multiline={true} rows='5' error={offerDescriptionError} inputRef={offerDescriptionRef} id="outlined-basic1" label="Offer description*" helperText={offerDescriptionError && 'Please insert correct description! (length > 10)'} variant="outlined"sx={{mb: 3, width: 4/5}}/>
            <Button onClick={validationHandler} variant="contained" sx={{mb: 3}}>{loading ? 'Loading...' : 'Add'}</Button>
        </div>
    );
};

export default AddNewOfferForm;