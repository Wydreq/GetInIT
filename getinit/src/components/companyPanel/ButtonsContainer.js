import classes from './ButtonsContainer.module.css';
import { Modal, Box, Typography } from '@mui/material';
import React from 'react';
import AddNewAccountForm from './AddNewAccountForm';

const style = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    borderRadius: 15,
    boxShadow: 24,
    p: 4,
  };

const ButtonsContainer = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
        <div className={classes.container}>
            <div className={classes.button}>Add new offer</div>
            <div className={classes.button}>Check your offers</div>
            <div className={classes.button}>Edit account info</div>
            <div className={classes.button} onClick={handleOpen}>Add new company account</div>
        </div>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <AddNewAccountForm/>
        </Box>
        </Modal>
        </>
    )
}

export default ButtonsContainer;