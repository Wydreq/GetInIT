import classes from './CompanyAccountsPage.module.css'
import {Box, Modal} from "@mui/material";
import AddNewAccountForm from "../../components/companyPanel/AddNewAccountForm";
import React from "react";

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
const CompanyAccountsPage = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className={classes.container}>
            <div className={classes.addAccountContainer} onClick={handleOpen}>
                Add new company account
            </div>
            <div className={classes.accountsContainer}>

            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddNewAccountForm onModalClose={handleClose}/>
                </Box>
            </Modal>
        </div>
    )
};

export default CompanyAccountsPage;