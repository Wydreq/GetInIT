import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    firstName: 'Loading...',
    lastName: '',
    email: 'Loading...',
    role: 'Loading...',
}

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: initialState,
    reducers: {
        async fetchUserInfo(state) {
            const response = await fetch('http://localhost:5099/api/account/AccountProfile', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();
            state.firstName = data.name;
            state.lastName = data.lastName;
            state.email = data.email;
            state.role = data.role;
        }
    }
});

export default userInfoSlice;