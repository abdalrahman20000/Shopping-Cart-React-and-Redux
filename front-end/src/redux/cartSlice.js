import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: JSON.parse(localStorage.getItem('cart')) || [],
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, change } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantity = Math.max(item.quantity + change, 1);
      }
    },
    setCart(state, action) {
      return action.payload;
    },
    clearDeletedProducts(state, action) {
      return state.filter(item => !action.payload.includes(item.id));
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, setCart, clearDeletedProducts } = cartSlice.actions;
export default cartSlice.reducer;
