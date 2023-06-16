import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    offerName: '',
    primarySkill: '',
    level: 1,
    place: 2,
    companyName: '',
    city: '',
}

const filterSlice = createSlice({
    name: 'offerModal',
    initialState: initialState,
    reducers: {
        setFilterData (state, action) {
            state.offerName = action.payload.offerName;
            state.companyName = action.payload.companyName;
            state.city = action.payload.city;
            state.level = action.payload.level;
            state.place = action.payload.place;
            state.primarySkill = action.payload.primarySkill;
            console.log(state.place + state.level);
        }
    }
});

export default filterSlice;