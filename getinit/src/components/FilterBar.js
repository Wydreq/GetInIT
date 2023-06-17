import classes from './FilterBar.module.css'
import { TextField, MenuItem, Button } from '@mui/material';
import React, {useRef, useState} from 'react';
const levels = [
    {
        value: 0,
        label: 'Choose level',
    },
    {
      value: 1,
      label: 'Junior',
    },
    {
      value: 2,
      label: 'Mid',
    },
    {
      value: 3,
      label: 'Senior',
    },
  ];

const places = [
    {
        value: 0,
        label: 'Choose place',
    },
    {
        value: 1,
        label: 'Home',
    },
    {
        value: 2,
        label: 'Office',
    },
    {
        value: 3,
        label: 'Hybrid',
    },
];
const FilterBar = (props) => {
    const offerNameRef = useRef();
    const primarySkillRef = useRef();
    const companyNameRef = useRef();
    const cityRef = useRef();
    const [place, setPlace] = useState();
    const [level, setLevel] = useState();
    const handleFilter = () => {
        if(level === 0) {
            setLevel('');
        }
        if(place === 0) {
            setPlace('');
        }
       props.onFilterSave({
            companyName: companyNameRef.current.value,
            offerName: offerNameRef.current.value,
            city: cityRef.current.value,
            level: level,
            place: place,
            primarySkill: primarySkillRef.current.value,
        })
    }


    return (
        <div className={classes.bar}>
             <TextField inputRef={offerNameRef} id="outlined-basic" label="Offer name" variant="outlined"  sx={{mb: 3, width: 2/7, margin: 2}}/>
            <TextField inputRef={primarySkillRef} id="outlined-basic" label="Primary skill" variant="outlined"  sx={{mb: 3, width: 2/7, margin: 2}}/>
             <TextField
                inputProps={{"data-testid":"level"}}
                 onChange={(event) => {
                     setLevel(event.target.value);
                    }
                }
                select
                defaultValue="0"
                sx={{mb: 3, width: 2/7, margin: 2}}
                >
                {levels.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                inputProps={{"data-testid":"place"}}
                onChange={(event) => {
                    setPlace(event.target.value);
                }
                }
                select
                defaultValue="0"
                sx={{mb: 3, width: 2/7, margin: 2}}
            >
                {places.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField inputRef={companyNameRef} id="outlined-basic" label="Company name" variant="outlined"  sx={{mb: 3, width: 2/7, margin: 2}}/>
             <TextField inputRef={cityRef} id="outlined-basic" label="City" variant="outlined"  sx={{mb: 3, width: 2/7, margin: 2}}/>
            <Button variant="contained" sx={{mb: 3, mt:2, width: 1/4}} onClick={handleFilter}>Filter</Button>
        </div>
    )
}

export default FilterBar;