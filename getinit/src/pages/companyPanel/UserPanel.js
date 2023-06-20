import AccountInfo from "../../components/companyPanel/AccountInfo";
import classes from './UserPanel.module.css';
import ButtonsContainer from "../../components/companyPanel/ButtonsContainer";
import React, {useState, useEffect, useCallback} from 'react';
import {TailSpin} from "react-loader-spinner";
import {useDispatch, useSelector} from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {offerModalActions} from "../../store";
import MuiAlert from "@mui/material/Alert";
const UserPanel = () => {
    const [isInfoLoaded, setIsInfoLoaded] = useState(false);
    const dispatch = useDispatch();
    const open = useSelector(state => state.offerModal.isSnackbarOpenPayment);
    const [user, setUser] = useState({
        firstName: 'Loading...',
        mail: 'Loading...',
        role: 'Loading...'
    });

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    const fetchUserInfo = useCallback(async () => {
         try {
             const response = await fetch('http://localhost:5099/api/account/AccountProfile', {
                 headers: {
                     'Authorization': 'Bearer ' + localStorage.getItem('token')
                 }
             });
             if (!response.ok) {
                 // throw new Error("Something went wrong!");
             }

             const data = await response.json();

             setUser({
                 firstName: data.name,
                 lastName: data.lastName,
                 mail: data.email,
                 role: data.role,
             })
             setIsInfoLoaded(true);
         } catch(error) {}
     },[])

    useEffect(()=> {
        fetchUserInfo();
    },[fetchUserInfo])

    return (
        <div className={isInfoLoaded ? classes.container : classes.container2}>
            {isInfoLoaded && <AccountInfo userInfo={user}/>}
            {isInfoLoaded && <ButtonsContainer userInfo={user}/>}
            {!isInfoLoaded &&
                <TailSpin
                height="200"
                width="200"
                color="#1976d2"
                ariaLabel="tail-spin-loading"
                radius="2"
                visible={true}
            />}
            <Snackbar open={open} autoHideDuration={6000} onClose={()=>{
                dispatch(offerModalActions.closePaymentSnackbar())
            }}>
                <Alert onClose={()=>{
                    dispatch(offerModalActions.closePaymentSnackbar())
                }} severity='success' sx={{ width: '100%' }}>
                    Payment succesfull!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default UserPanel;