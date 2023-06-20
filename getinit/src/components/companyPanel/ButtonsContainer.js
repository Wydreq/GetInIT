import classes from './ButtonsContainer.module.css';
import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {offerModalActions} from "../../store";

const ButtonsContainer = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deletingManagerAccount = async () => {
        if (window.confirm('Are you sure you want to delete your company account?')) {
            const response = await fetch(`http://localhost:5099/api/account/DeleteAccountAndCompany`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            if(!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(offerModalActions.openDeleteSnackbar());
            localStorage.removeItem('token');
            navigate('/auth');
        }
    }

    const deletingUserAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            const response = await fetch(`http://localhost:5099/api/account/DeleteAccount`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            if(!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(offerModalActions.openDeleteSnackbar());
            localStorage.removeItem('token');
            navigate('/auth');
        }
    }
    return (
        <div className={classes.container}>
            {props.userInfo.role === 'Admin' && <div className={classes.button} role='button-add' onClick={()=>{navigate('/manualPayment', {
                state: {
                    userRole: props.userInfo.role,
                }
            })}}>Add manual payment</div>}
            {props.userInfo.role === 'Admin' && <div className={classes.button} onClick={()=>{navigate('/allPayments', {
                state: {
                    userRole: props.userInfo.role,
                }
            })}}>All payments</div>}
            {props.userInfo.role === 'UserAccount' && <div className={classes.button} role='button-applications' onClick={()=>{navigate('/userApplications', {
                state: {
                    userRole: props.userInfo.role,
                }
            })}}>Your job applications</div>}
            {props.userInfo.role === 'ManagerCompanyAccount' && <div className={classes.button} role='button-offers-manager' onClick={()=>{navigate('/userOffers', {
                state: {
                    userRole: props.userInfo.role,
                }
            })}}>Manage your offers</div>}
            {props.userInfo.role === 'EmployeeAccount' && <div className={classes.button} role='button-offers-employee' onClick={()=>{navigate('/userOffers', {
                state: {
                    userRole: props.userInfo.role,
                }
            })}}>Manage your offers</div>}
            <div className={classes.button} role='button-edit' onClick={()=>{navigate('/editInfo')}}>Edit account info</div>
            {props.userInfo.role === 'ManagerCompanyAccount' && <div className={classes.button} role='button-accounts' onClick={()=>{navigate('/companyAccounts');}}>Manage your company accounts</div>}
            <div className={classes.button} role='button-delete' onClick={()=>{
                if(props.userInfo.role === 'ManagerCompanyAccount') {
                    deletingManagerAccount();
                }
                else {
                    deletingUserAccount();
                }
            }}>Delete your account</div>
        </div>
    )
}

export default ButtonsContainer;