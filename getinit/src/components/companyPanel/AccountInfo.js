import classes from './AccountInfo.module.css';
import {useEffect} from "react";
import {userInfoActions} from "../../store";
import { useDispatch } from 'react-redux';
import {useSelector} from "react-redux";


const AccountInfo = () => {

    const dispatch = useDispatch();
    const firstName = useSelector((state)=>state.userInfo.firstName);
    const lastName = useSelector((state)=>state.userInfo.lastName);
    const email = useSelector((state)=>state.userInfo.email);
    const role = useSelector((state)=>state.userInfo.role);
    useEffect(()=> {
        dispatch(userInfoActions.fetchUserInfo());
    },[])

    return (
        <div className={classes.container}>
            <h1>Your name: {firstName} {lastName}</h1>
            <p>Your mail: {email}</p>
            <p>Role: {role}</p>
        </div>
    )
}

export default AccountInfo;