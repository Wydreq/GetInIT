import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isSnackbarOpen: false,
    isModalOpen: false,
    id: '',
    offerName: '',
    city: '',
    company: '',
    image: '',
    salary: '',
    description: '',
}

const offerModalSlice = createSlice({
    name: 'offerModal',
    initialState: initialState,
    reducers: {
        openSnackbar (state) {
            state.isSnackbarOpen = true;
        },
        closeSnackbar (state) {
            state.isSnackbarOpen = false;
        },
         openModal (state) {
           state.isModalOpen = true;
        },
        closeModal (state) {
             state.isModalOpen = false;
        },
        setModalContent (state, action) {
             state.id = action.payload.id;
             state.offerName = action.payload.offerName;
             state.city = action.payload.city;
             state.company = action.payload.company;
             state.image = action.payload.image;
             state.salary = action.payload.salary;
             state.description = action.payload.description
        }
    }
});

export default offerModalSlice;