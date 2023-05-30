import classes from './EditInfoPage.module.css';
import React, {useState} from "react";
import {Box, Modal} from "@mui/material";
import ChangeEmailForm from "../../components/companyPanel/editInfo/ChangeEmailForm";
import ChangePasswordForm from "../../components/companyPanel/editInfo/ChangePasswordForm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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
const EditInfoPage = () => {
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [mode, setMode] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarClose = () => setSnackbarOpen(false);
    const handleOpenEmail = () => {
        setMode('email');
        setOpen(true);
    };
    const handleOpenPassword = () => {
        setMode('password');
        setOpen(true);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const addAccountNotificationHandler = (isEmail) => {
        if(isEmail) {
            setSnackbarMessage('Email');
        }
        else {
            setSnackbarMessage('Password');
        }
        setSnackbarOpen(true);
    }
    const handleClose = () => setOpen(false);
    return(
        <div className={classes.container}>
            <h1 className={classes.title}>Edit your account info</h1>
            <div className={classes.button} onClick={handleOpenEmail}>Edit email</div>
            <div className={classes.button} onClick={handleOpenPassword}>Edit password</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{position: 'fixed', top: '20%'}}
            >
                <Box sx={style}>
                    <div className={classes.modalContainer}>
                        <h1 className={classes.modalTitle}>{mode === 'email' ? 'Change your email' : 'Change your password'}</h1>
                        {mode === 'email' && <ChangeEmailForm onChange={addAccountNotificationHandler} onClose={handleClose}/>}
                        {mode === 'password' && <ChangePasswordForm onChange={addAccountNotificationHandler} onClose={handleClose}/>}
                    </div>
                </Box>
            </Modal>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity='success' sx={{ width: '100%' }}>
                    {snackbarMessage} has been changed!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default EditInfoPage;