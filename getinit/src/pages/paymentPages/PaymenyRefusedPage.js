import classes from './PaymentConfirmedPage.module.css'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const PaymentRefusedPage = () => {
    const [counter, setCounter] = useState(5);
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
            <span className={classes.title}>Payment failed!</span>
            <span className={classes.text}>Try again... You will be redirected to your panel in {counter} seconds</span>
            <img className={classes.image} src='https://icon-library.com/images/cancel-icon-transparent/cancel-icon-transparent-19.jpg' alt='Payment refused'/>
        </div>
    )
}

export default PaymentRefusedPage;