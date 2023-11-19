import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	cart: [],
};

export const productsList = createSlice({
	name: "productList",
	initialState,
	reducers: {
		setProductList: (state, action) => {
			state.products = action.payload;
		},
		addToCart: (state, action) => {
			const newItem = action.payload;
			state.cart.push(newItem);
		},
		removeFromCart: (state, action) => {
			const itemIdToRemove = action.payload;
			state.cart = state.cart.filter(
				(item) => item.id !== itemIdToRemove,
			);
		},
	},
});

export const { actions: productsListActions, reducer: productsListReducer } =
	productsList;
