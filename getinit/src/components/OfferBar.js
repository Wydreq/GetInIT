import classes from './OfferBar.module.css'
import {Box, Modal} from "@mui/material";
import AddNewAccountForm from "./companyPanel/AddNewAccountForm";
import React from "react";
import {useDispatch} from "react-redux";
import {offerModalActions} from "../store";

const OfferBar = (props) => {
    const dispatch = useDispatch();
    const handleModal = () => {
        dispatch(offerModalActions.setModalContent({
            id: props.offer.id,
            offerName: props.offer.offerName,
            city: props.offer.city,
            company: props.offer.company,
            image: props.offer.image,
            salary: props.offer.salary,
            description: props.offer.description
        }))
        props.onModalOpen();
    }

    return (
        <div className={classes.offerContainer} onClick={handleModal}>
            <div className={classes.imageContainer}>
                <img className={classes.logoImage} src={props.offer.image} alt='infover'/>
            </div>
            <span className={classes.stack}>{props.offer.offerName}</span>
            <span className={classes.company}>{props.offer.company}</span>
            <span className={classes.salary}>{props.offer.salary}$</span>
        </div>
    )
}

export default OfferBar;