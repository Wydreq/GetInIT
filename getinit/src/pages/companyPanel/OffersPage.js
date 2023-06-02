import classes from "./OffersPage.module.css";
import {Box, Modal} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, {useCallback, useEffect, useState} from "react";
import MuiAlert from "@mui/material/Alert";
import AddNewOfferForm from "../../components/companyPanel/AddNewOfferForm";
import {useLocation} from "react-router-dom";
import OfferBar from "../../components/OfferBar";
import CompanyOfferBar from "../../components/CompanyOfferBar";
import EditOfferForm from "../../components/companyPanel/EditOfferForm";

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
const OffersPage = () => {
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(true);
    const [offersList, setOffersList] = useState([]);
    const { state } = useLocation();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSnackbarClose = () => setSnackbarOpen(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const addOfferSnackbarHandler = () => {
        if(state.userRole === 'EmployeeAccount') {
            fetchOffers('http://localhost:5099/api/offer/GetEmployeeOffers');
        }
        if(state.userRole === 'ManagerCompanyAccount') {
            fetchOffers('http://localhost:5099/api/offer/GetCompanyOffers');
        }
        setSnackbarOpen(true);
    }

    const fetchOffers = useCallback(async (url) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();
            const loadedOffers = [];
            for (const key in data) {
                loadedOffers.push({
                    id: data[key].id,
                    companyName: data[key].companyName,
                    description: data[key].description,
                    name: data[key].name,
                    phoneNumber: data[key].phoneNumber,
                    email: data[key].email,
                    city: data[key].city,
                    level: data[key].level,
                    place: data[key].place,
                    primarySkill: data[key].primarySkill,
                    salaryFrom: data[key].salaryFrom,
                    salaryTo: data[key].salaryTo,
                    technologies: data[key].technologies,
                });
            }
            setOffersList(loadedOffers);
        } catch(error) {}
    },[])


    async function deleteCompanyOffer(id) {
        const response = await fetch('http://localhost:5099/api/offer/DeleteCompanyOffer', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                id: id,
            }),
        });
        if(!response.ok) {
            throw new Error('Something went wrong!');
        }
        if(state.userRole === 'EmployeeAccount') {
            fetchOffers('http://localhost:5099/api/offer/GetEmployeeOffers');
        }
        if(state.userRole === 'ManagerCompanyAccount') {
            fetchOffers('http://localhost:5099/api/offer/GetCompanyOffers');
        }
    }

    async function deleteEmployeeOffer(id) {
        const response = await fetch('http://localhost:5099/api/offer/DeleteEmployeeOffer', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                id: id,
            }),
        });
        if(!response.ok) {
            throw new Error('Something went wrong!');
        }
        if(state.userRole === 'EmployeeAccount') {
            fetchOffers('http://localhost:5099/api/offer/GetEmployeeOffers');
        }
        if(state.userRole === 'ManagerCompanyAccount') {
            fetchOffers('http://localhost:5099/api/offer/GetCompanyOffers');
        }
    }

    const handleEdit = (offer) => {
        console.log(offer);
    }

    useEffect(()=> {
        if(state.userRole === 'EmployeeAccount') {
            fetchOffers('http://localhost:5099/api/offer/GetEmployeeOffers');
        }
        if(state.userRole === 'ManagerCompanyAccount') {
            fetchOffers('http://localhost:5099/api/offer/GetCompanyOffers');
        }
    },[fetchOffers])

    return (
        <div className={classes.container}>
            <div className={classes.addAccountContainer} onClick={()=>{
                setIsAdding(true);
                handleOpen();
            }}>
                Add new offer
            </div>
            <div className={classes.accountsContainer}>
                {offersList.map((offer)=>{
                    return (
                        <CompanyOfferBar key={offer.id} offer={offer} onDeleteCompanyOffer={deleteCompanyOffer} onDeleteEmployeeOffer={deleteEmployeeOffer} onEditSet={()=>{setIsAdding(false)}} onModalOpen={handleOpen} role={state.userRole}/>
                    )
                })}
            </div>
            <div className={classes.modalContainer}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{position: 'fixed', top: '20%'}}
                >
                    <Box sx={style}>
                        {isAdding ? <AddNewOfferForm onAddAccountSuccesful={addOfferSnackbarHandler} onModalClose={handleClose}/> : <EditOfferForm onAddAccountSuccesful={addOfferSnackbarHandler} onModalClose={handleClose}/>}
                    </Box>
                </Modal>
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity='success' sx={{ width: '100%' }}>
                    Offer has been added!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default OffersPage;