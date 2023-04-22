import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    url: '',
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
            state.confirmPassword = action.payload.confirmPassword;
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

            const preparedForSending = {
                name: state.name,
                lastName: state.lastName,
                email: state.email,
                password: state.password,
                confirmPassword: state.confirmPassword,
                role: 'Manager',
                createCompanyDto: {
                    name: state.companyName,
                    url: state.url,
                    nip: state.nip,
                    regon: state.regon,
                    addressDto: {
                        country: state.country,
                        city: state.city,
                        street: state.street,
                        buildingNumber: state.buildingNumber,
                        postalCode: state.postalCode,
                    }
                }
            }

            const response = await fetch('http://localhost:5099/api/account/RegisterAccountCompany', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preparedForSending),
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

export default registerSlice;