import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userRole: '',
}

const userRoleSlice = createSlice({
    name: 'userRole',
    initialState: initialState,
    reducers: {
        setUserRole (state, action) {
            state.userRole = action.payload.userRole;
        }
    }
});

export default userRoleSlice;