import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const initialState = {
  customer: {},
  items: [],
};
const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    customerAdded: (cart, action) => {
      const { customerItem } = action.payload;
      cart.customer = customerItem;
    },
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
      const { itemID, itemtype } = action.payload;
      const item = cart.items.find((c) => c.id === itemID);
      if (itemtype === "plus") {
        item.quantity = item.quantity + 1;
        item.totalPrice = item.price_unit * item.quantity;
      }
      if (itemtype === "minus" && item.quantity > 1) {
        item.quantity = item.quantity - 1;
        item.totalPrice = item.price_unit * item.quantity;
      }
    },
    cartCleared: (cart, action) => {
      cart.items = initialState.items;
    },
  },
});

//Actions
export const {
  customerAdded,
  itemsAdded,
  itemUpdated,
  itemRemoved,
  cartCleared,
} = slice.actions;

//Reducer
export default slice.reducer;
