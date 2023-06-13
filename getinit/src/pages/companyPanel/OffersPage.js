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
import {TailSpin} from "react-loader-spinner";

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
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
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
        setSnackbarMessage('Offer has been added!');
        setSnackbarOpen(true);
        fetchOffers();
    }

    const editOfferSnackbarHandler = () => {
        setSnackbarMessage('Offer has been edited!');
        setSnackbarOpen(true);
        fetchOffers();
    }


    const fetchOffers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5099/api/offer/getOffers`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error("Something went wrong!");
                setLoading(false);
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
            setLoading(false);
        } catch(error) {}
    },[])


    async function deleteOfferHandler(id) {
        const response = await fetch('http://localhost:5099/api/offer/DeleteOffer', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                id: id,
            }),
        });
        if(!response.ok) {
            throw new Error('Something went wrong!');
        }

        fetchOffers();
        setSnackbarMessage("Offer has been deleted!");
        setSnackbarOpen(true);
    }

    const handleEdit = (offer) => {
        console.log(offer);
    }

    useEffect(()=> {
        fetchOffers();
    },[fetchOffers])

    return (
        <div className={classes.container}>
            <div className={classes.addAccountContainer} onClick={()=>{
                setIsAdding(true);
                handleOpen();
            }}>
                Add new offer
            </div>
            <div className={!loading ? classes.offersContainer : classes.offersContainerLoading}>
                {loading &&
                    <TailSpin
                        height="200"
                        width="200"
                        color="#1976d2"
                        ariaLabel="tail-spin-loading"
                        radius="2"
                        visible={true}
                    />}
                {offersList.map((offer)=>{
                    return (
                        <CompanyOfferBar key={offer.id} offer={offer} onDeleteOffer={deleteOfferHandler} onEditSet={()=>{setIsAdding(false)}} onModalOpen={handleOpen} role={state.userRole}/>
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
                        {isAdding ? <AddNewOfferForm onAddAccountSuccesful={addOfferSnackbarHandler} onModalClose={handleClose}/> : <EditOfferForm onEditSuccess={editOfferSnackbarHandler} onModalClose={handleClose}/>}
                    </Box>
                </Modal>
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity='success' sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default OffersPage;