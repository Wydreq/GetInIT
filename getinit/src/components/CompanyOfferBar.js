import classes from './CompanyOfferBar.module.css'
import React from "react";
import {useDispatch} from "react-redux";
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import {offerModalActions} from "../store";
import {useNavigate} from "react-router-dom";

const CompanyOfferBar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteHandler = () => {
            props.onDeleteOffer(props.offer.id);
    }

    const levelCheck = level => {
        let levelName;
        switch(level){
            case 1: {
                levelName = 'Junior ';
                break;
            }
            case 2: {
                levelName = 'Mid ';
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
        <div className={classes.offerContainer}>
            <div className={classes.container}>
                <span className={classes.offerName}>{levelCheck(props.offer.level)}{props.offer.name}</span>
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
                <div onClick={()=>{
                    navigate(`applications/${props.offer.id}`);
                }} className={classes.contButton}>
                    <DocumentScannerIcon fontSize='inherit'/>
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