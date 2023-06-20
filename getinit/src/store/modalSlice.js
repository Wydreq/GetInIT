import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isSnackbarOpen: false,
    isSnackbarOpen2: false,
    isSnackbarOpenPayment: false,
    isModalOpen: false,
    deleteAccountSnackbar: false,
    isApplicationSnackbar: false,
    id: 0,
    companyName: '',
    description: '',
    name: '',
    phoneNumber: '',
    email: '',
    city: '',
    level: 1,
    place: 1,
    primarySkill: '',
    salaryFrom: 0,
    salaryTo: 0,
    technologies: [],
}

const offerModalSlice = createSlice({
    name: 'offerModal',
    initialState: initialState,
    reducers: {
        openApplicationSnackbar (state) {
            state.isApplicationSnackbar = true;
        },
        closeApplicationSnackbar (state) {
            state.isApplicationSnackbar = false;
        },
        openPaymentSnackbar (state) {
            state.isSnackbarOpenPayment = true;
        },
        closePaymentSnackbar (state) {
            state.isSnackbarOpenPayment = false;
        },
        openDeleteSnackbar (state) {
            state.deleteAccountSnackbar = true;
        },
        deleteCloseSnackbar (state) {
            state.deleteAccountSnackbar = false;
        },
        openSnackbar (state) {
            state.isSnackbarOpen = true;
        },
        closeSnackbar (state) {
            state.isSnackbarOpen = false;
        },
        openSnackbar2 (state) {
            state.isSnackbarOpen2 = true;
        },
        closeSnackbar2 (state) {
            state.isSnackbarOpen2 = false;
        },
         openModal (state) {
           state.isModalOpen = true;
        },
        closeModal (state) {
             state.isModalOpen = false;
        },
        setModalContent (state, action) {
             state.id = action.payload.id;
             state.companyName = action.payload.companyName;
             state.description = action.payload.description;
             state.name = action.payload.name;
             state.phoneNumber = action.payload.phoneNumber;
             state.email = action.payload.email;
             state.city = action.payload.city;
             state.level = action.payload.level;
             state.place = action.payload.place;
             state.primarySkill = action.payload.primarySkill;
             state.salaryFrom = action.payload.salaryFrom;
            state.salaryTo = action.payload.salaryTo;
            state.technologies = action.payload.technologies
        }
    }
});

export default offerModalSlice;