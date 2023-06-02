import classes from './CompanyOfferBar.module.css'
import React from "react";
import {useDispatch} from "react-redux";
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {offerModalActions} from "../store";

const CompanyOfferBar = (props) => {
    const dispatch = useDispatch();

    const deleteHandler = () => {
        if(props.role === 'ManagerCompanyAccount') {
            props.onDeleteCompanyOffer(props.offer.id);
        }
        if(props.role === 'EmployeeAccount') {
            props.onDeleteEmployeeOffer(props.offer.id);
        }
    }

    return (
        <div className={classes.offerContainer}>
            <div className={classes.container}>
                <span className={classes.offerName}>{props.offer.name}</span>
                <span className={classes.company}>{props.offer.companyName}</span>
                {props.offer.place === 1 && <span className={classes.place}><span className={classes.gap}>Work from</span> <HomeIcon/></span>}
                {props.offer.place === 2 && <span className={classes.place}><span className={classes.gap}>Work from</span> <ApartmentIcon/></span>}
                {props.offer.place === 3 && <span className={classes.place}><span className={classes.gap}>Work from</span> <HomeWorkIcon/></span>}
            </div>
            <div className={classes.rightContainer}>
                <div className={classes.contButton} onClick={()=>{
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
                    props.onEditSet();
                    props.onModalOpen();
                }}>
                    <EditIcon fontSize='inherit'/>
                </div>
                <div onClick={deleteHandler} className={classes.contButton}>
                    <DeleteIcon fontSize='inherit'/>
                </div>
                <span className={classes.salary}>{props.offer.salaryFrom}$ - {props.offer.salaryTo}$</span>
            </div>
        </div>
    )
}

export default CompanyOfferBar;