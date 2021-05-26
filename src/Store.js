//lib imports
import { configureStore } from '@reduxjs/toolkit';

//reducer imports
import PizzaReducer from 'Components/Pizza/PizzaSlice';
import CartReducer from 'Components/Cart/CartSlice';
import modalReducer from 'UI/Modal/ModalSlice';

export default configureStore(
    {
        reducer:
        {
            pizza: PizzaReducer,
            cart: CartReducer,
            modal: modalReducer
        }
    }
);