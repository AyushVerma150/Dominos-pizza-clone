//lib imports
import { createSlice } from '@reduxjs/toolkit';

//reducer functions
import
{
    addFromWithinTheCartReducer,
    addToCartReducer,
    removeFromCartReducer,
    removeFromWithinTheCartReducer
} from 'Components/Cart/CartReducers';

//constants
import OtherConstants from 'Constants/OtherConstants';

const initialState = {
    cartItems: [],
    orderTotal: 0,
    error: null
};

export const cartSlice = createSlice(
    {
        name: OtherConstants.CART_SLICE_NAME,
        initialState,
        reducers:
        {
            addToCart: ( state, action ) =>
            {
                addToCartReducer( state, action );
            },
            removeFromCart: ( state, action ) =>
            {
                removeFromCartReducer( state, action );
            },
            hideError: ( state ) =>
            {
                state.error = null;
            },
            removeFromWithinTheCart: ( state, action ) =>
            {
                removeFromWithinTheCartReducer( state, action );
            },
            addFromWithinTheCart: ( state, action ) =>
            {
                addFromWithinTheCartReducer( state, action );
            }
        }
    }
);

export const {
    addToCart,
    removeFromCart,
    hideError,
    removeFromWithinTheCart,
    addFromWithinTheCart
} = cartSlice.actions;
export default cartSlice.reducer;



