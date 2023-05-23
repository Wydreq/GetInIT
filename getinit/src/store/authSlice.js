import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: '',
    password: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        async loginHandler(state, action) {
            const response = await fetch('http://localhost:5099/api/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: action.payload.email,
                    password: action.payload.password
                }),
            });
            if(!response.ok) {
                throw new Error('Something went wrong!');

            }
            const data = await response.json();
            localStorage.setItem('token', data);
        }
    }
});

export default authSlice;