import classes from './AddNewOfferForm.module.css';
import { useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import StarIcon from '@mui/icons-material/Star';
const AddNewOfferForm = (props) => {

    const [offerTitleError, setOfferTitleError] = useState(false);
    const [offerDescriptionError, setOfferDescriptionError] = useState(false);
    const [primaryLanguageError, setPrimaryLanguageError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [salaryFromError, setSalaryFromError] = useState(false);
    const [salaryToError, setSalaryToError] = useState(false);
    const [technologiesError, setTechnologiesError] = useState(false);
    const [level, setLevel] = useState(0);
    const [workingPlace, setWorkingPlace] = useState(0);
    const [skillLevel, setSkillLevel] = useState(1);
    const [loading, setLoading] = useState(false);
    const [technologies, setTechnologies] = useState([]);
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
        console.log(technologies);
    }

    const validationHandler = () => {
        addNewOfferHandler();
    }

    async function addNewOfferHandler() {
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

        const response = await fetch('http://localhost:5099/api/offer/createOffer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(preparedForSending),
        });
        if(!response.ok) {
           throw new Error('Something went wrong!');
        }
        props.onAddAccountSuccesful();
        props.onModalClose();
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
                onChange={handleLevelChange}
                sx={{mb: 3, width: 4/5}}
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
                sx={{mb: 3, width: 4/5}}
            >
                <MenuItem value={0}>Select place</MenuItem>
                <MenuItem value={1}>Home</MenuItem>
                <MenuItem value={2}>Office</MenuItem>
                <MenuItem value={3}>Hybrid</MenuItem>
            </Select>
            <TextField error={phoneNumberError} inputRef={phoneNumberRef} id="outlined-basic3" label="Contact phone number*" helperText={phoneNumberError && 'Insert correct phone number'} type='number' variant="outlined"sx={{mb: 3, width: 4/5}}/>
            <TextField error={emailError} inputRef={emailRef} id="outlined-basic4" label="Contact mail address*" helperText={emailError && 'Please insert correct mail address!'} variant="outlined"sx={{mb: 3, width: 4/5}}/>
            <div className={classes.salaryContainer}>
                <TextField error={salaryFromError} inputRef={salaryFromRef} id="outlined-basic3" label="Salary from*" helperText={salaryFromError && 'Insert correct phone number'} type='number' variant="outlined"sx={{mb: 3, width: 2/6}}/>
                <span className={classes.to}>-</span>
                <TextField error={salaryToError} inputRef={salaryToRef} id="outlined-basic4" label="Salary to*" helperText={salaryToError && 'Please insert correct mail address!'} type='number' variant="outlined"sx={{mb: 3, width: 2/6}}/>
            </div>
            <TextField multiline={true} rows='5' error={offerDescriptionError} inputRef={offerDescriptionRef} id="outlined-basic1" label="Offer description*" helperText={offerDescriptionError && 'Please insert correct description! (length > 10)'} variant="outlined"sx={{mb: 3, width: 4/5}}/>
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
            </div>
            <div className={classes.technologiesList}>
                {technologies.map((item) => {
                    return (
                        <p className={classes.skillItem}>{item.skill} - {item.skillLevel}</p>
                    )
                })}
            </div>
            <Button onClick={validationHandler} variant="contained" sx={{mb: 3}}>{loading ? 'Loading...' : 'Add'}</Button>
        </div>
    );
};

export default AddNewOfferForm;