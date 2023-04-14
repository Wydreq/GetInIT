import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    url: '',
    industry: 'IT',
    nip: 0,
    regon: 0,
    country: '',
    city: '',
    street: '',
    buildingNumber: '',
    postalCode: '',
 }

const registerSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        saveEmailPassword(state, action) {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        async createAccount(state, action) {
            state.name = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.companyName = action.payload.companyName;
            state.url = action.payload.url;
            state.nip = action.payload.nip;
            state.regon = action.payload.regon;
            state.country = action.payload.country;
            state.city = action.payload.city;
            state.street = action.payload.street;
            state.buildingNumber = action.payload.buildingNumber;
            state.postalCode = action.payload.postalCode;
            
            const response = await fetch('http://localhost:5099/api/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    name: state.name,
                    lastName: state.lastName,
                    email: state.email,
                    password: state.password,
                    companyName: state.companyName,
                    url: state.url,
                    industry: 'IT',
                    nip: state.nip,
                    regon: state.regon,
                    country: state.country,
                    city: state.city,
                    street: state.street,
                    buildingNumber: state.buildingNumber,
                    postalCode: state.postalCode,
                }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

});

const store = configureStore({
    reducer: {register: registerSlice.reducer},
})

export const registerActions = registerSlice.actions;
export default store;