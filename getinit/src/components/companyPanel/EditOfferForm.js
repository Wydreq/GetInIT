import classes from './AddNewOfferForm.module.css';
import { useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import StarIcon from '@mui/icons-material/Star';
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
            >
                <MenuItem value={0}>Select place</MenuItem>
                <MenuItem value={1}>Home</MenuItem>
                <MenuItem value={2}>Office</MenuItem>
                <MenuItem value={3}>Hybrid</MenuItem>
            </Select>
            <TextField defaultValue={fetchedPhoneNumber} error={phoneNumberError} inputRef={phoneNumberRef} id="outlined-basic3" label="Contact phone number*" helperText={phoneNumberError && 'Insert correct phone number'} type='number' variant="outlined"sx={{mb: 3,mr:3, width: 2/5}}/>
            <TextField defaultValue={fetchedEmail} error={emailError} inputRef={emailRef} id="outlined-basic4" label="Contact mail address*" helperText={emailError && 'Please insert correct mail address!'} variant="outlined"sx={{mb: 3,mr:3, width: 2/5}}/>
            <div className={classes.salaryContainer}>
                <TextField defaultValue={fetchedSalaryFrom} error={salaryFromError} inputRef={salaryFromRef} id="outlined-basic3" label="Salary from*" helperText={salaryFromError && 'Insert correct phone number'} type='number' variant="outlined"sx={{mb: 3, width: 2/6}}/>
                <span className={classes.to}>-</span>
                <TextField defaultValue={fetchedSalaryTo} error={salaryToError} inputRef={salaryToRef} id="outlined-basic4" label="Salary to*" helperText={salaryToError && 'Please insert correct mail address!'} type='number' variant="outlined"sx={{mb: 3,mr:3, width: 2/6}}/>
            </div>
            <TextField defaultValue={fetchedDescription} multiline={true} rows='5' error={offerDescriptionError} inputRef={offerDescriptionRef} id="outlined-basic1" label="Offer description*" helperText={offerDescriptionError && 'Please insert correct description! (length > 10)'} variant="outlined"sx={{mb: 3, width: 4/5}}/>
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