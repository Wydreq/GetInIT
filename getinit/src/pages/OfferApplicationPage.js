import classes from './OfferApplicationPage.module.css'
import {useParams} from "react-router-dom";
import {TextField} from "@mui/material";
import React, {useRef, useState} from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import validator from "validator";

const OfferApplicationPage = () => {
    const params = useParams();
    const [file, setFile] = useState();
    const [repoUrlError, setRepoUrlError] = useState(false);
    const repoRef = useRef();
    const noteRef = useRef();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    const filesChangeHandler = (e) => {
        if(e.target.files) {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
        }
    }

    const validationHandler = () => {
        const validator = require('validator');
        if(repoRef.current.value.length > 0) {
            if(!validator.isURL(repoRef.current.value)) {
                setRepoUrlError(true);
            }
            else {
                setRepoUrlError(false);
            }
        }
        else {
            setRepoUrlError(false);
        }
        if(file === undefined) {
            setOpen(true);
        }
        if(repoRef.current.value.length > 0) {
            if(validator.isURL(repoRef.current.value)) {
                sendCvHandler();
            }
        }
        else {
            if(file !== undefined) {
                sendCvHandler();
            }
        }
    }

    const sendCvHandler = () => {
        //http request for send application
    }

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <p className={classes.title}>Send an application</p>
                    <TextField error={repoUrlError} helperText={repoUrlError && 'Please insert correct url address!'} inputRef={repoRef} id="outlined-basic" label="Repository url" variant="outlined"  sx={{mt: 3, width: 1}}/>
                    <TextField multiline={true} rows='10' inputRef={noteRef} id="outlined-basic1" label="Why we should choose you?" variant="outlined"sx={{mb: 3,mt: 3, width:1}}/>
                <div className={classes.inputContainer}><input type='file' onChange={filesChangeHandler} accept='application/pdf'/><span className={classes.star}>*</span></div>
                <Button onClick={validationHandler} variant="contained" sx={{mb: 3, mt: 4}}>Send</Button>
            </div>
            <Snackbar open={open} autoHideDuration={4000} onClose={()=>{handleClose()}}>
                <Alert severity='error' sx={{ width: '100%' }}>
                    CV not found!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default OfferApplicationPage;