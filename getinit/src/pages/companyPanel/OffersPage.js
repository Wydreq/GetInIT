import classes from "./OffersPage.module.css";
import {Box, Modal} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, {useState} from "react";
import MuiAlert from "@mui/material/Alert";
import AddNewOfferForm from "../../components/companyPanel/AddNewOfferForm";

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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSnackbarClose = () => setSnackbarOpen(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const addOfferSnackbarHandler = () => {
        setSnackbarOpen(true);
    }
    return (
        <div className={classes.container}>
            <div className={classes.addAccountContainer} onClick={handleOpen}>
                Add new offer
            </div>
            <div className={classes.accountsContainer}>

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
                        <AddNewOfferForm onAddAccountSuccesful={addOfferSnackbarHandler} onModalClose={handleClose}/>
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

export default OffersPage