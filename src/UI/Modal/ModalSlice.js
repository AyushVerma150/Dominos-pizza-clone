//lib imports
import { createSlice } from "@reduxjs/toolkit";

//constants
import otherConstants from "Constants/OtherConstants";


export const modalSlice = createSlice(
    {
        name: otherConstants.MODAL_SLICE_NAME,
        //Adding a pizza id for storing whose toppings are being added
        initialState: {
            value: false,
            pizzaId: null,
        },
        reducers:
        {
            //show modal stores the pizza id for customization
            showModal: ( state, action ) =>
            {
                state.value = true;
                state.pizzaId = action.payload.id;
            },
            hideModal: ( state ) =>
            {
                state.value = false;
                state.pizzaId = null;
            }
        }
    }
);

export const { showModal, hideModal } = modalSlice.actions;
export const getModalState = ( state ) => state.modal.value;
export default modalSlice.reducer;