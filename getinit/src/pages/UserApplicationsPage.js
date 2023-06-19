import classes from './UserApplicationsPage.module.css'
import React, {useCallback, useEffect, useState} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import {TailSpin} from "react-loader-spinner";

const UserApplicationsPage = () => {

    const [loading, setLoading] = useState(false);
    const [loadedUserApplications, setLoadedUserApplication] = useState([]);

    const fetchOfferApplications = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5099/api/JobApplications/GetAllApplications`, {
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
                    email: data[key].email,
                    companyName: data[key].companyName,
                    offerName: data[key].offerName,
                    level: data[key].level,
                });
            }
            console.log(loadedApplications);
            setLoadedUserApplication(loadedApplications);
            setLoading(false);
        } catch(error) {}
    },[])

    useEffect(()=> {
        fetchOfferApplications();
    },[fetchOfferApplications])

    const downloadCVHandler = async (resumePath, firstName, lastName) => {
        const response = await fetch('http://localhost:5099/api/JobApplications/DownloadFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                relativePathFromDb: resumePath
            }),
        });
        if(!response.ok) {
            throw new Error("Something gone wrong!");
        }
        const filename = `CV_${firstName}_${lastName}`;

        const blob = await response.blob();

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = filename;

        downloadLink.click();

        URL.revokeObjectURL(downloadLink.href);
        downloadLink.remove();
    }


    return(
        <div className={classes.container}>
            <div className={!loading && loadedUserApplications.length !== 0 ? classes.accountsContainer : classes.accountsContainerLoading}>

                {!loading && loadedUserApplications.length === 0 && <p className={classes.notFound}>Applications not found!</p>}
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
                                    <p className={classes.firstInfoTitle}>{item.level === 1 && 'Junior'}{item.level === 2 && 'Mid'}{item.level === 3 && 'Senior'} {item.offerName}</p>
                                    <p className={classes.firstInfoTitle}>{item.companyName}</p>
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
                                    <Button onClick={() => {
                                        downloadCVHandler(item.resumePath, item.firstName, item.lastName);
                                    }} variant="contained" sx={{justifyContent: 'center'}}>Download CV</Button>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>
        </div>
    )
}

export default UserApplicationsPage;