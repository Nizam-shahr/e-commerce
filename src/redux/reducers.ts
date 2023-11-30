import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";

export const rootReducer = combineReducers({
    cart: cartSlice
})