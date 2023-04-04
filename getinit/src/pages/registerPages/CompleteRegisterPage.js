import classes from './CompleteRegisterPage.module.css'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import Button from '@mui/material/Button';

const CompleteRegisterPage = () => {

    const nameRef = useRef();
    const urlRef = useRef();

    return (
    <div className={classes.container}>
            <Card className={classes.formContainer}> 
                <h1 style={{marginBottom: 25, marginTop: 25}}>Compete your registration</h1>
                <TextField inputRef={nameRef} id="outlined-basic" label="Company name*" variant="outlined"  sx={{mb: 3, width: 3/5}}/>
                <TextField inputRef={urlRef} id="outlined-basic" label="Company page url" variant="outlined"sx={{mb: 3, width: 3/5}}/>
                <TextField inputRef={urlRef} id="outlined-basic" label="NIP*" variant="outlined"sx={{mb: 3, width: 3/5}}/>
                <TextField inputRef={urlRef} id="outlined-basic" label="REGON*" variant="outlined"sx={{mb: 3, width: 3/5}}/>
                <TextField
                    id="outlined-multiline-static"
                    label="About company*"
                    multiline
                    rows={5}
                    sx={{mb: 3, width: 3/5}}
                />
                <Button variant="contained" sx={{mb: 3}}>Complete registration</Button>
            </Card>
    </div>
    )
};

export default CompleteRegisterPage;