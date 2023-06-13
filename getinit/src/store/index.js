import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import offerModalSlice from "./modalSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
    reducer: {offerModal: offerModalSlice.reducer, filter: filterSlice.reducer},
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        }),
    ],
})

export const offerModalActions = offerModalSlice.actions;
export const filterActions = filterSlice.actions;
export default store;