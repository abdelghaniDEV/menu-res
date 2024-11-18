import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/products.slice";
import categoriesSlice from "./slices/categories.slice";

export const store = configureStore({
    reducer:{
        products : productsSlice,
        categories : categoriesSlice
    }
})
