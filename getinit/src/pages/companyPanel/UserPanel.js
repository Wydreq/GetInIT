import AccountInfo from "../../components/companyPanel/AccountInfo";
import classes from './UserPanel.module.css';
import ButtonsContainer from "../../components/companyPanel/ButtonsContainer";
import {useState, useEffect, useCallback} from 'react';
import {TailSpin} from "react-loader-spinner";
import {Alert, AlertTitle} from "@mui/material";
import {Link} from "react-router-dom";


const UserPanel = () => {
    const [isInfoLoaded, setIsInfoLoaded] = useState(false);
    const [user, setUser] = useState({
        firstName: 'Loading...',
        mail: 'Loading...',
        role: 'Loading...'
    });
     const fetchUserInfo = useCallback(async () => {
         try {
             const response = await fetch('http://localhost:5099/api/account/AccountProfile', {
                 headers: {
                     'Authorization': 'Bearer ' + localStorage.getItem('token')
                 }
             });
             if (!response.ok) {
                 throw new Error("Something went wrong!");
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
            <Alert severity="error" sx={{width: '60%', borderRadius: '20px'}}>
                <AlertTitle><strong className={classes.title}>Subscription not found!</strong></AlertTitle>
                <p className={classes.subError}>No active subscription found. If You want to manage your account <Link to={'/subscriptionPayment'}>buy it here!</Link></p>
            </Alert>
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
        </div>
    )
}

export default UserPanel;