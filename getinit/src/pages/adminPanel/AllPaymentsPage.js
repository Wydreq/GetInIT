import classes from './AllPaymentsPage.module.css'
import React, {useCallback, useEffect, useState} from "react";
import {TailSpin} from "react-loader-spinner";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";

const AllPaymentsPage = () => {

    const [loading, setLoading] = useState(false);
    const [loadedPayments, setLoadedPayments] = useState([]);

    const fetchPayments = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5099/CreateCheckoutSession/GetEveryPayment`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            if (!response.ok) {
                setLoading(false);
                // throw new Error("Something went wrong!");
            }
            const data = await response.json();
            const loadedPaymentss = [];
            for (const key in data) {
                const paymentDate = new Date(data[key].paymentDate).toLocaleDateString();
                loadedPaymentss.push({
                    id: key,
                    name: data[key].name,
                    email: data[key].email,
                    paymentDate: paymentDate,
                    amount: data[key].amount,
                    stripePaymentId: data[key].stripePaymentId,
                    paymentStatus: data[key].paymentStatus,
                });
            }
            console.log(loadedPaymentss);
            setLoadedPayments(loadedPaymentss);
            setLoading(false);
        } catch(error) {}
    },[])

    useEffect(()=> {
        fetchPayments();
    },[fetchPayments])

    return(
        <div className={classes.container}>
            <div className={!loading && loadedPayments.length !== 0 ? classes.accountsContainer : classes.accountsContainerLoading}>

                {!loading && loadedPayments.length === 0 && <p className={classes.notFound}>Payments not found!</p>}
                {loading &&
                    <TailSpin
                        height="200"
                        width="200"
                        color="#1976d2"
                        ariaLabel="tail-spin-loading"
                        radius="2"
                        visible={true}
                    />}
                {loadedPayments.map((item) => {
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <div className={classes.firstInfoContainer}>
                                    <p className={classes.firstInfoTitle}>{item.name} {item.email}</p>
                                    <p className={classes.firstInfoTitle}>{item.paymentDate}</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={classes.accordionShow}>
                                   <span style={{marginRight: 'auto'}}>
                                       <h2 className={classes.title}>Amount</h2>
                                       <p className={classes.message}>{item.amount}PLN</p>
                                        <h2 className={classes.title}>Status</h2>
                                        <p className={classes.message}>{item.paymentStatus === 'Paid' ? 'Paid by stripe' : 'Offline paid'}</p>
                                   </span>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>
        </div>
    )

}

export default  AllPaymentsPage;