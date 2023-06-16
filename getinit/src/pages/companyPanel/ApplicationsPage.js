import classes from './ApplicationsPage.module.css'
import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import {TailSpin} from "react-loader-spinner";

const ApplicationsPage = () => {

    const { offerId } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadedUserApplications, setLoadedUserApplication] = useState([]);

    const fetchOfferApplications = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5099/api/JobApplications/SearchApplications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    offerId: offerId
                }),
            });
            if (!response.ok) {
                setLoading(false);
                // throw new Error("Something went wrong!");
            }
            const data = await response.json();
            console.log(data);
            const loadedApplications = [];
            for (const key in data) {
                loadedApplications.push({
                    id: key,
                    firstName: data[key].applicantName,
                    lastName: data[key].lastName,
                    message: data[key].message,
                    resumePath: data[key].resumePath,
                    urlLink: data[key].urlLink,
                    email: data[key].email
                });
            }
            setLoadedUserApplication(loadedApplications);
            setLoading(false);
        } catch(error) {}
    },[offerId])

    useEffect(()=> {
        fetchOfferApplications();
    },[fetchOfferApplications])

    return(
        <div className={classes.container}>
            <div className={!loading ? classes.accountsContainer : classes.accountsContainerLoading}>

                {loading &&
                    <TailSpin
                        height="200"
                        width="200"
                        color="#1976d2"
                        ariaLabel="tail-spin-loading"
                        radius="2"
                        visible={true}
                    />}
                {loadedUserApplications.map((item) => {
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <div className={classes.firstInfoContainer}>
                                    <p className={classes.firstInfoTitle}>{item.firstName} {item.lastName}</p>
                                    <p className={classes.firstInfoTitle}>{item.email}</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                               <div className={classes.accordionShow}>
                                   <span style={{marginRight: 'auto'}}>
                                       <h2 className={classes.title}>About yourself</h2>
                                       <p className={classes.message}>{item.message}</p>
                                        <h2 className={classes.title}>Page url</h2>
                                        <p className={classes.message}>{item.urlLink}</p>
                                   </span>
                                   <Button onClick={() => {}} variant="contained" sx={{justifyContent: 'center'}}>Download CV</Button>
                               </div>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>
        </div>
    )
}

export default ApplicationsPage;