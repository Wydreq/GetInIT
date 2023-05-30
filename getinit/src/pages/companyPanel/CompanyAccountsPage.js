import classes from './CompanyAccountsPage.module.css'
import {Box, Modal} from "@mui/material";
import AddNewAccountForm from "../../components/companyPanel/AddNewAccountForm";
import React, {useCallback, useEffect, useState} from "react";
import CompanyUserBar from "../../components/companyPanel/CompanyUserBar";
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
const CompanyAccountsPage = () => {
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSnackbarClose = () => setSnackbarOpen(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [fetchedUsers, setFetchedUsers] = useState([])

    const addAccountNotificationHandler = () => {
        setSnackbarOpen(true);
        fetchCompanyAccounts();
    }

    const fetchCompanyAccounts = useCallback(async () => {
        try{
            const response = await fetch('http://localhost:5099/api/account/manager/GetAllCompanyAccounts', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();

            const loadedUsers = [];

            for(const key in data) {
                loadedUsers.push({
                    id: data[key].id,
                    companyName: data[key].companyName,
                    email: data[key].email,
                    lastName: data[key].lastName,
                    firstName: data[key].name,
                    role: data[key].role,
                })
            }

            setFetchedUsers(loadedUsers);
        } catch(error) {}
    },[])

    useEffect(()=> {
        fetchCompanyAccounts();
    },[fetchCompanyAccounts])
    return (
        <div className={classes.container}>
            <div className={classes.addAccountContainer} onClick={handleOpen}>
                Add new company account
            </div>
            <div className={classes.accountsContainer}>
                {fetchedUsers.map((user) => {
                    return(
                        <CompanyUserBar key={user.id} user={user}/>
                    )
                })}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{position: 'fixed', top: '20%'}}
            >
                <Box sx={style}>
                    <AddNewAccountForm onAddAccountSuccesful={addAccountNotificationHandler} onModalClose={handleClose}/>
                </Box>
            </Modal>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity='success' sx={{ width: '100%' }}>
                    Account has beed added!
                </Alert>
            </Snackbar>
        </div>
    )
};

export default CompanyAccountsPage;