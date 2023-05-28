import { configureStore } from '@reduxjs/toolkit'
import registerSlice from "./registerSlice";
import authSlice from "./authSlice";
import userInfoSlice from "./userInfoSlice";
import offerModalSlice from "./modalSlice";


const store = configureStore({
    reducer: {register: registerSlice.reducer, auth: authSlice.reducer, userInfo: userInfoSlice.reducer, offerModal: offerModalSlice.reducer},
})

export const registerActions = registerSlice.actions;
export const authActions = authSlice.actions;
export const userInfoActions = userInfoSlice.actions;
export const offerModalActions = offerModalSlice.actions;
export default store;