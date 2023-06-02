import classes from './OfferBar.module.css'
import {Box, Modal} from "@mui/material";
import AddNewAccountForm from "./companyPanel/AddNewAccountForm";
import React from "react";
import {useDispatch} from "react-redux";
import {offerModalActions} from "../store";
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HomeIcon from '@mui/icons-material/Home';

const OfferBar = (props) => {
    const dispatch = useDispatch();
    const handleModal = () => {
        dispatch(offerModalActions.setModalContent({
            id: props.offer.id,
            companyName: props.offer.companyName,
            description: props.offer.description,
            name: props.offer.name,
            phoneNumber: props.offer.phoneNumber,
            email: props.offer.email,
            city: props.offer.city,
            level: props.offer.level,
            place: props.offer.place,
            primarySkill: props.offer.primarySkill,
            salaryFrom: props.offer.salaryFrom,
            salaryTo: props.offer.salaryTo,
            technologies: props.offer.technologies
        }))
        props.onModalOpen();
    }

    const levelCheck = level => {
        let levelName = '';
        switch(level){
            case 1: {
                levelName = 'Junior ';
            }
            case 2: {
                levelName = '';
            }
            case 3: {
                levelName = 'Senior ';
            }
        }
        return levelName;
    }

    return (
        <div className={classes.offerContainer} onClick={handleModal}>
            <div className={classes.container}>
                <span className={classes.offerName}>{levelCheck(props.offer.level)}{props.offer.name}</span>
                <span className={classes.company}>{props.offer.companyName}</span>
                {props.offer.place === 1 && <span className={classes.place}><span className={classes.gap}>Work from</span> <HomeIcon/></span>}
                {props.offer.place === 2 && <span className={classes.place}><span className={classes.gap}>Work from</span> <ApartmentIcon/></span>}
                {props.offer.place === 3 && <span className={classes.place}><span className={classes.gap}>Work from</span> <HomeWorkIcon/></span>}
            </div>
            <span className={classes.salary}>{props.offer.salaryFrom}$ - {props.offer.salaryTo}$</span>
        </div>
    )
}

export default OfferBar;