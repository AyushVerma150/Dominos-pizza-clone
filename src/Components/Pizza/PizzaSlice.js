//lib imports
import { createSlice } from '@reduxjs/toolkit';

//utility functions
import
{
    changePizzaSizeReducer,
    ChangePizzaCrustReducer,
    addCustomizationsReducer,
} from 'Components/Pizza/PizzaReducers';

//constants
import otherConstants from 'Constants/OtherConstants';
import
{
    initialPizzaState,
} from 'Components/Pizza/PizzaReducers';


//setting up initial state
const initialState = initialPizzaState;

export const pizzaSlice = createSlice(
    {
        name: otherConstants.PIZZA_SLICE_NAME,
        initialState,
        reducers:
        {
            changePizzaSize: ( state, action ) =>
            {
                changePizzaSizeReducer( state, action );
            },
            changePizzaCrust: ( state, action ) =>
            {
                ChangePizzaCrustReducer( state, action );
            },
            AddCustomizations: ( state, action ) =>
            {
                addCustomizationsReducer( state, action );
            }
        }
    }
);

export const {
    changePizzaSize,
    changePizzaCrust,
    AddCustomizations } = pizzaSlice.actions;
export default pizzaSlice.reducer;



