import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const initialState = {
  items: [],
};
const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    itemsAdded: (cart, action) => {
      const { selectedItems } = action.payload;
      selectedItems.id = ++lastId;
      cart.items.push(selectedItems);
    },
    itemRemoved: (cart, action) => {
      const { itemID } = action.payload;
      cart.items = cart.items.filter((c) => c.id !== itemID);
    },
    itemUpdated: (cart, action) => {
      const { itemID, quantityItems, newPrice } = action.payload;
      const item = cart.items.find((c) => c.id === itemID);
      item.quantity = quantityItems;
      item.totalPrice = newPrice;
    },
    cartCleared: (cart, action) => {
      cart.items = initialState.items;
    },
  },
});

//Actions
export const {
  itemsAdded,
  itemUpdated,
  itemRemoved,
  cartCleared,
} = slice.actions;

//Reducer
export default slice.reducer;
