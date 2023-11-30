import { ProductTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type CartState = {
  cart: ProductTypes[];
};

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductTypes | any>) => {
      const foundItem = state.cart?.find(
        (item: ProductTypes) => item.id === action.payload.id
      )?? null;

      if (foundItem) {
        foundItem.count;
      } else {
        state.cart?.push({ ...action.payload, count: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      state.cart = state.cart.filter(
        (item: ProductTypes) => item.id !== action.payload.id
      );
    },
    increment: (state, action: PayloadAction) => {
      state.cart = state.cart.map((item: ProductTypes) => {
        if (item.id === action.payload) {
          item.count++
        }
        return item;
      });
    },
    decrement: (state, action: PayloadAction<any>) => {
      state.cart = state.cart
        .map((item) => {
          if (item.id === action.payload) {
            item.count--;
          }
          return item;
        })
        .filter((item: ProductTypes) => item.count !== 0);
    },
  },
});

export const { addToCart, removeFromCart, decrement, increment } =
  cartSlice.actions;
  export const selectItems = (state: any) => state.items;
export default cartSlice.reducer;
