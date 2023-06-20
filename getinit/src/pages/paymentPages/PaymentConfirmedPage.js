import classes from './PaymentConfirmedPage.module.css'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const PaymentConfirmedPage = () => {
    const [counter, setCounter] = useState(3);
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(() => {
            setCounter(counter-1);
        }, 1000)
        if(counter === 0) {
            paymentHandler();
            navigate('/userPanel');
        }
    },[counter])


    const paymentHandler = async () => {
        const response = await fetch('http://localhost:5099/CreateCheckoutSession/PaymentToDataBase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
        if (!response.ok) {
            console.log("ERROR");
        }
    }


    return (
        <div className={classes.container}>
            <span className={classes.title}>Thank you for donating us!</span>
            <span className={classes.text}>You will be redirected in {counter} seconds</span>
            <img className={classes.image} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eo_circle_light-green_checkmark.svg/2048px-Eo_circle_light-green_checkmark.svg.png' alt='checkmark'/>
        </div>
    )
}

export default PaymentConfirmedPage;