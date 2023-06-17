import classes from './AddNewOfferForm.module.css';
import { useRef, useState } from 'react';
import { TextField } from '@mui/material';
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {useSelector} from "react-redux";
const EditOfferForm = (props) => {

    const fetchedId = useSelector(state => state.offerModal.id);
    const fetchedDescription = useSelector(state => state.offerModal.description);
    const fetchedName = useSelector(state => state.offerModal.name);
    const fetchedPhoneNumber = useSelector(state => state.offerModal.phoneNumber);
    const fetchedEmail = useSelector(state => state.offerModal.email);
    const fetchedLevel = useSelector(state => state.offerModal.level);
    const fetchedPlace = useSelector(state => state.offerModal.place);
    const fetchedPrimarySkill = useSelector(state => state.offerModal.primarySkill);
    const fetchedSalaryFrom = useSelector(state => state.offerModal.salaryFrom);
    const fetchedSalaryTo = useSelector(state => state.offerModal.salaryTo);
    const fetchedTechnologies = useSelector(state => state.offerModal.technologies);

    const [offerTitleError, setOfferTitleError] = useState(false);
    const [offerDescriptionError, setOfferDescriptionError] = useState(false);
    const [primaryLanguageError, setPrimaryLanguageError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [salaryFromError, setSalaryFromError] = useState(false);
    const [salaryToError, setSalaryToError] = useState(false);
    const [technologiesError, setTechnologiesError] = useState(false);
    const [levelError, setLevelError] = useState(false);
    const [placeError, setPlaceError] = useState(false);
    const [level, setLevel] = useState(fetchedLevel);
    const [workingPlace, setWorkingPlace] = useState(fetchedPlace);
    const [skillLevel, setSkillLevel] = useState(1);
    const [loading, setLoading] = useState(false);
    const [technologies, setTechnologies] = useState(fetchedTechnologies);
    const offerTitleRef = useRef();
    const offerDescriptionRef = useRef();
    const primaryLanguageRef = useRef();
    const phoneNumberRef = useRef();
    const emailRef = useRef();
    const salaryFromRef = useRef();
    const salaryToRef = useRef();
    const technologyRef = useRef();

    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    };

    const handlePlaceChange = (event) => {
        setWorkingPlace(event.target.value);
    };

    const handleSkillLevelChange = (event) => {
        setSkillLevel(event.target.value);
    };

    const addTechnologyHandler = () => {
        setTechnologies(current => [...current, {
            skill: technologyRef.current.value,
            skillLevel: skillLevel
        }])
        setSkillLevel(1);
        technologyRef.current.value = '';
    }

    const validationHandler = () => {
        setLoading(true);
        const validator = require('validator');
        if(offerTitleRef.current.value.length === 0) {
            setOfferTitleError(true);
        }
        else {
            setOfferTitleError(false);
        }
        if(primaryLanguageRef.current.value.length === 0) {
            setPrimaryLanguageError(true);
        }
        else {
            setPrimaryLanguageError(false);
        }
        if(level === 0) {
            setLevelError(true);
        }
        else {
            setLevelError(false);
        }
        if(workingPlace === 0) {
            setPlaceError(true);
        }
        else {
            setPlaceError(false);
        }
        if(phoneNumberRef.current.value.length !== 9) {
            setPhoneNumberError(true);
        }
        else {
            setPhoneNumberError(false);
        }
        if(!validator.isEmail(emailRef.current.value)) {
            setEmailError(true);
        }
        else {
            setEmailError(false);
        }
        if(salaryFromRef.current.value.length === 0) {
            setSalaryFromError(true);
        }
        else {
            setSalaryFromError(false);
        }
        if(salaryToRef.current.value.length === 0) {
            setSalaryToError(true);
        }
        else {
            setSalaryToError(false);
        }
        if(salaryFromRef.current.value > salaryToRef.current.value) {
            setSalaryToError(true);
            setSalaryFromError(true);
        }
        else {
            if(salaryFromRef.current.value.length === 0) {
                setSalaryFromError(true);
            }
            else {
                setSalaryFromError(false);
            }
            if(salaryToRef.current.value.length === 0) {
                setSalaryToError(true);
            }
            else {
                setSalaryToError(false);
            }
        }
        if(offerDescriptionRef.current.value.length <= 10) {
            setOfferDescriptionError(true);
        }
        else {
            setOfferDescriptionError(false);
        }
        if(technologies.length === 0) {
            setTechnologiesError(true)
        }
        else {
            setTechnologiesError(false);
        }
        if(offerTitleRef.current.value.length > 0 && primaryLanguageRef.current.value.length > 0 && !level !== 0 && !workingPlace !== 0 && phoneNumberRef.current.value.length === 9 && validator.isEmail(emailRef.current.value) && salaryFromRef.current.value.length > 0 && salaryToRef.current.value.length > 0 && !salaryFromError && !salaryToError && offerDescriptionRef.current.value.length > 10 && technologies.length > 0) {
            editOfferHandler();
        }
        else {
            setLoading(false);
            console.log('cos nie tak');
        }
    }

    async function editOfferHandler() {

        const preparedForSending = {
            name: offerTitleRef.current.value,
            description: offerDescriptionRef.current.value,
            primarySkill: primaryLanguageRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            email: emailRef.current.value,
            salaryFrom: salaryFromRef.current.value,
            salaryTo: salaryToRef.current.value,
            level: level,
            place: workingPlace,
            technologies: technologies,
        }
        const response = await fetch(`http://localhost:5099/api/offer/updateOffer/${fetchedId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(preparedForSending),
        });
        if(!response.ok) {
            setLoading(false);
            throw new Error('Something gone wrong!');
        }
        setLoading(false);
        props.onModalClose();
        props.onEditSuccess();
    }

    const clearTechnologyHandler = () => {
        setTechnologies([]);
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Edit existing offer</h1>
            <TextField defaultValue={fetchedName} error={offerTitleError} inputRef={offerTitleRef} id="outlined-basic" label="Offer title*" helperText={offerTitleError && 'Please insert correct offer title (length > 5)'} variant="outlined"  sx={{mb: 3,mt:3,mr:3, width: 2/5}}/>
            <TextField defaultValue={fetchedPrimarySkill} error={primaryLanguageError} inputRef={primaryLanguageRef} id="outlined-basic2" label="Primary language*" helperText={primaryLanguageError && 'Please insert correct primary language'} variant="outlined"  sx={{mb: 3,mt:3,mr:3, width: 2/5}}/>
            <Select
                id="demo-simple-select"
                value={level}
                onChange={handleLevelChange}
                sx={{mb: 3,mr:3, width: 2/5}}
                error={levelError}
            >
                <MenuItem value={0}>Select level</MenuItem>
                <MenuItem value={1}>Junior</MenuItem>
                <MenuItem value={2}>Mid</MenuItem>
                <MenuItem value={3}>Senior</MenuItem>
            </Select>
            <Select
                id="demo-simple-select2"
                value={workingPlace}
                onChange={handlePlaceChange}
                sx={{mb: 3,mr:3, width: 2/5}}
                error={placeError}
            >
                <MenuItem value={0}>Select place</MenuItem>
                <MenuItem value={1}>Home</MenuItem>
                <MenuItem value={2}>Office</MenuItem>
                <MenuItem value={3}>Hybrid</MenuItem>
            </Select>
            <TextField defaultValue={fetchedPhoneNumber} error={phoneNumberError} inputRef={phoneNumberRef} id="outlined-basic3" label="Contact phone number*" helperText={phoneNumberError && 'Insert correct phone number'} type='number' variant="outlined" sx={{mb: 3,mr:3, width: 2/5}}/>
            <TextField defaultValue={fetchedEmail} error={emailError} inputRef={emailRef} id="outlined-basic4" label="Contact mail address*" helperText={emailError && 'Please insert correct mail address!'} variant="outlined" sx={{mb: 3,mr:3, width: 2/5}}/>
            <div className={classes.salaryContainer}>
                <TextField defaultValue={fetchedSalaryFrom} error={salaryFromError} inputRef={salaryFromRef} id="outlined-basic3" label="Salary from*" helperText={salaryFromError && 'Insert correct amount!'} type='number' variant="outlined" sx={{mb: 3, width: 2/6}}/>
                <span className={classes.to}>-</span>
                <TextField defaultValue={fetchedSalaryTo} error={salaryToError} inputRef={salaryToRef} id="outlined-basic4" label="Salary to*" helperText={salaryToError && 'Please insert correct amount!'} type='number' variant="outlined" sx={{mb: 3,mr:3, width: 2/6}}/>
            </div>
            <TextField defaultValue={fetchedDescription} multiline={true} rows='5' error={offerDescriptionError} inputRef={offerDescriptionRef} id="outlined-basic1" label="Offer description*" helperText={offerDescriptionError && 'Please insert correct description! (length > 10)'} variant="outlined" sx={{mb: 3, width: 4/5}}/>
            <div className={classes.technologiesContainer}>
                <TextField error={technologiesError} inputRef={technologyRef} id="outlined-basic3" label="Technology" helperText={phoneNumberError && 'Insert correct technology'} variant="outlined" sx={{mb: 1, width: 2/6}}/>
                <Select
                    id="demo-simple-select3"
                    value={skillLevel}
                    onChange={handleSkillLevelChange}
                    sx={{mb: 1, width: 2/6}}
                >
                    <MenuItem value={1}>Begginer</MenuItem>
                    <MenuItem value={2}>Basic</MenuItem>
                    <MenuItem value={3}>Intermediate</MenuItem>
                    <MenuItem value={4}>Advanced</MenuItem>
                    <MenuItem value={5}>Expert</MenuItem>
                </Select>
                <Button onClick={addTechnologyHandler} variant="contained">Add technology</Button>
                <Button onClick={clearTechnologyHandler} variant="contained">Clear</Button>
            </div>
            <div className={classes.btnContainer}>
                <div className={classes.technologiesList}>
                    {technologies.map((item, index) => {
                        return (
                            <div key={index} className={classes.itemContainer}>
                                <p className={classes.skillItem}>{item.skill} - {item.skillLevel}</p>
                            </div>
                        )
                    })}
                </div>
                <Button onClick={validationHandler} variant="contained" sx={{mb: 3}}>{loading ? 'Loading...' : 'Edit'}</Button>
            </div>
        </div>
    );
};

export default EditOfferForm;