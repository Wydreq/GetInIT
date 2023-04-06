import classes from './FilterBar.module.css'
import { TextField, MenuItem } from '@mui/material';
import { useRef } from 'react';

const currencies = [
    {
      value: '01',
      label: 'Java',
    },
    {
      value: '02',
      label: 'JavaScript',
    },
    {
      value: '03',
      label: 'C#',
    },
    {
      value: '04',
      label: 'C++',
    },
  ];

const FilterBar = () => {
    const keyWordsRef = useRef();
    const cityRef = useRef();
    return (
        <div className={classes.bar}>
             <TextField inputRef={keyWordsRef} id="outlined-basic" label="Company, key words etc..." variant="outlined"  sx={{mb: 3, width: 2/7, margin: 2}}/>
             <TextField
                select
                label="Select"
                defaultValue="Java"
                sx={{mb: 3, width: 2/7, margin: 2}}
                >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
             <TextField inputRef={cityRef} id="outlined-basic" label="City" variant="outlined"  sx={{mb: 3, width: 2/7, margin: 2}}/>
        </div>
    )
}

export default FilterBar;