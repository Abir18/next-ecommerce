import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: { cartItems: [] }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      console.log(newItem, 'newItem');
      const existItem = state.cart.cartItems.find(
        item => item.slug === newItem.slug
      );
      console.log(existItem, 'existItem');
      const cartItems = existItem
        ? state.cart.cartItems.map(item =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      console.log(cartItems, 'cartItems');
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
