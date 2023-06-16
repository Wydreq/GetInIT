import FilterBar from '../components/FilterBar';
import OffersList from '../components/OffersList';
import classes from './HomePage.module.css'
import {Box, Modal} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {offerModalActions} from "../store";
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from "@mui/material/Button";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import StarRateIcon from '@mui/icons-material/StarRate';
import {Link} from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    borderRadius: 15,
    boxShadow: 24,
    p: 4,
};

const HomePage = () => {

    const open = useSelector(state => state.offerModal.isModalOpen);
    const id = useSelector(state => state.offerModal.id);
    const companyName = useSelector(state => state.offerModal.companyName);
    const description = useSelector(state => state.offerModal.description);
    const name = useSelector(state => state.offerModal.name);
    const phoneNumber = useSelector(state => state.offerModal.phoneNumber);
    const email = useSelector(state => state.offerModal.email);
    const city = useSelector(state => state.offerModal.city);
    const level = useSelector(state => state.offerModal.level);
    const salaryFrom = useSelector(state => state.offerModal.salaryFrom);
    const salaryTo = useSelector(state => state.offerModal.salaryTo);
    const technologies = useSelector(state => state.offerModal.technologies); 
    const dispatch = useDispatch();

    const [role, setRole] = useState('');
    const fetchUserInfo = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5099/api/account/AccountProfile', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                // throw new Error("Something went wrong!");
            }

            const data = await response.json();

            setRole(data.role);
        } catch(error) {}
    },[])

    useEffect(()=> {
        fetchUserInfo();
    },[fetchUserInfo])


    const handleOpen = () => {
        dispatch(offerModalActions.openModal())
    }
    const handleClose = () => {
        dispatch(offerModalActions.closeModal())
    }
    const starCounter = number => {
        let stars = [];
        for(let i=0;i<number;i++)
        {
            stars.push(<StarRateIcon fontSize='inherit' />);
        }
        return stars;
    }

    const levelCheck = level => {
        let levelName;
        switch(level){
            case 1: {
                levelName = 'Junior ';
                break;
            }
            case 2: {
                levelName = '';
                break;
            }
            case 3: {
                levelName = 'Senior ';
                break;
            }
            default: {
                levelName = '';
                break;
            } 
        }
        return levelName;
    }

    return (
    <div className={classes.container}>
        <FilterBar/>
        <OffersList onModalOpen={handleOpen}/>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className={classes.modalContainer}>
                    <div className={classes.titleContainer}>
                        <div className={classes.containerTwo}>
                            <span className={classes.offerName}>{levelCheck(level)}  {name}</span>
                            <span className={classes.salary}>{salaryFrom}$ - {salaryTo}$</span>
                        </div>
                    </div>
                    <div className={classes.containerThree}>
                        <span className={classes.iconsContainer}>
                              <BusinessIcon fontSize='inherit'/>
                        <span className={classes.companyTitle}>{companyName}</span>
                        </span>
                        <span className={classes.iconsContainer}>
                            <LocationOnIcon fontSize='inherit'/>
                            <span className={classes.companyTitle}>{city}</span>
                        </span>
                    </div>
                    <div className={classes.containerThree}>
                        <span className={classes.iconsContainer}>
                              <EmailIcon fontSize='inherit'/>
                        <span className={classes.companyTitle}>{email}</span>
                        </span>
                        <span className={classes.iconsContainer}>
                            <LocalPhoneIcon fontSize='inherit'/>
                            <span className={classes.companyTitle}>{phoneNumber}</span>
                        </span>
                    </div>
                    <div className={classes.containerFour}>
                        <h1>About offer</h1>
                        <div className={classes.technologiesContainer}>
                            {technologies.map((technology) => {
                                return (
                                    <div key={Math.floor(Math.random())} className={classes.technologyContainer}>
                                        <span className={classes.technologySkill}>
                                            {technology.skill}
                                        </span>
                                        <span className={classes.stars}>
                                            {starCounter(technology.skillLevel)}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                        <h1>Description</h1>
                        <span>{description}</span>
                    </div>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        {role === 'UserAccount' && <Link to={`/offerApplication/${id}`}> <Button onClick={handleClose} variant="contained" sx={{mb: 3, mt:8, width: 1}}>Send CV</Button></Link>}
                    </Box>
                </div>
            </Box>
        </Modal>
    </div>
    );
};

export default HomePage;