import classes from './PaymentConfirmedPage.module.css'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const PaymentConfirmedPage = () => {
    const [counter, setCounter] = useState(10);
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(() => {
            setCounter(counter-1);
        }, 1000)
        if(counter === 0) {
            navigate('/userPanel');
        }
    },[counter])

    return (
        <div className={classes.container}>
            <span className={classes.title}>Thank you for buying subscription!</span>
            <span className={classes.text}>You will be redirected in {counter} seconds</span>
            <img className={classes.image} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eo_circle_light-green_checkmark.svg/2048px-Eo_circle_light-green_checkmark.svg.png' alt='checkmark'/>
        </div>
    )
}

export default PaymentConfirmedPage;