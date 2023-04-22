import { configureStore } from '@reduxjs/toolkit'
import registerSlice from "./registerSlice";
import authSlice from "./authSlice";


const store = configureStore({
    reducer: {register: registerSlice.reducer, auth: authSlice.reducer},
})

export const registerActions = registerSlice.actions;
export const authActions = authSlice.actions;
export default store;