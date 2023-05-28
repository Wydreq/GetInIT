import FilterBar from '../components/FilterBar';
import OffersList from '../components/OffersList';
import classes from './HomePage.module.css'
import {Box, Modal} from "@mui/material";
import React from "react";
import img from "../assets/infover.jpg";
import {useSelector, useDispatch} from "react-redux";
import {offerModalActions} from "../store";
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from "@mui/material/Button";

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
    const offerName = useSelector(state => state.offerModal.offerName);
    const offerImage = useSelector(state => state.offerModal.image);
    const offerSalary = useSelector(state => state.offerModal.salary);
    const offerCompany = useSelector(state => state.offerModal.company);
    const offerDescription = useSelector(state => state.offerModal.description);
    const offerCity = useSelector(state => state.offerModal.city);
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(offerModalActions.openModal())
        console.log(offerImage);
    }
    const handleClose = () => {
        dispatch(offerModalActions.closeModal())
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
                        <img className={classes.companyLogo} src={offerImage} alt='hej'/>
                        <div className={classes.containerTwo}>
                            <span className={classes.offerName}>{offerName}</span>
                            <span className={classes.salary}>{offerSalary}$</span>
                        </div>
                    </div>
                    <div className={classes.containerThree}>
                        <span className={classes.iconsContainer}>
                              <BusinessIcon fontSize='inherit'/>
                        <span className={classes.companyTitle}>{offerCompany}</span>
                        </span>
                        <span className={classes.iconsContainer}>
                            <LocationOnIcon fontSize='inherit'/>
                            <span className={classes.companyTitle}>{offerCity}</span>
                        </span>
                    </div>
                    <div className={classes.containerFour}>
                        <h1>About us</h1>
                        <span>{offerDescription}</span>
                    </div>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Button variant="contained" sx={{mb: 3, mt:8, width: 1/2}}>Send CV</Button>
                    </Box>
                </div>
            </Box>
        </Modal>
    </div>
    );
};

export default HomePage;