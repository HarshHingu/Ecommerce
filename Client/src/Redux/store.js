import { configureStore } from "@reduxjs/toolkit";
import { productsListReducer } from "./productsList";

export const store = configureStore({
	reducer: {
		productList: productsListReducer,
	},
});
