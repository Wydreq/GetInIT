import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import offerModalSlice from "./modalSlice";

const store = configureStore({
    reducer: {offerModal: offerModalSlice.reducer},
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        }),
    ],
})

export const offerModalActions = offerModalSlice.actions;
export default store;