import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import registerSlice from "./registerSlice";
import authSlice from "./authSlice";
import offerModalSlice from "./modalSlice";


const store = configureStore({
    reducer: {register: registerSlice.reducer, auth: authSlice.reducer, offerModal: offerModalSlice.reducer},
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        }),
    ],
})

export const registerActions = registerSlice.actions;
export const authActions = authSlice.actions;
export const offerModalActions = offerModalSlice.actions;
export default store;