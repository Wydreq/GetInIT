import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import offerModalSlice from "./modalSlice";
import userRoleSlice from "./userRoleSlice";


const store = configureStore({
    reducer: {offerModal: offerModalSlice.reducer, userRole: userRoleSlice.reducer},
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        }),
    ],
})

export const offerModalActions = offerModalSlice.actions;
export const userRoleActions = userRoleSlice.actions;
export default store;