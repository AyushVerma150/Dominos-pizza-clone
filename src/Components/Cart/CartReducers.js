//lib imports
import nextId from 'react-id-generator';

//utility functions
import { searchFromCartWhenAdding, searchFromCartWhenRemoving } from 'Utils/Utils';

//constants
import errorConstants from 'Constants/Error';

export const addToCartReducer = ( state, action ) =>
{
    let Count = 0;
    if ( state.cartItems.length < 1 )
    {
        const updatedItem = {
            ...action.payload,
            added: true,
            count: action.payload.count + 1,
            uniqueKey: nextId(),
        };
        state.orderTotal += ( action.payload.basePrice + action.payload.toppingCost );
        state.cartItems.push( updatedItem );
    }
    else
    {
        //else check if same type of pizza already exists or not 
        state.cartItems.map( ( item, index ) =>
        {

            if ( searchFromCartWhenAdding( item, action.payload ) )
            {
                state.cartItems[index].count++;
                state.orderTotal += ( action.payload.basePrice + action.payload.toppingCost );
            }
            else
            {
                Count++;
            }
        } );
        //if no such pizza exists then we add a new one
        if ( Count === state.cartItems.length )
        {
            const updatedItem = {
                ...action.payload,
                added: true,
                count: action.payload.count + 1,
                uniqueKey: nextId()
            };
            state.orderTotal += ( action.payload.basePrice + action.payload.toppingCost );
            state.cartItems.push( updatedItem );
        }
    }
}

export const removeFromCartReducer = ( state, action ) =>
{
    let changeMade = false;
    //removing from cart covers two cases if pizza has count > 0 then 
    //decrease the count but only from the pizza listing
    state.cartItems.map( ( item, index ) =>
    {
        const [valid, additionalCost] = searchFromCartWhenRemoving( item, action.payload );

        if ( valid )
        {
            changeMade = true;
            state.cartItems[index].count--;
            if ( state.orderTotal > 0 )
            {
                state.orderTotal -= ( action.payload.basePrice + additionalCost );
            }
            if ( state.orderTotal < 0 )
            {
                state.orderTotal = 0;
            }
        }

    } );
    if ( !changeMade )
    {
        state.error = errorConstants.CANNOT_DELETE
    }
};


export const removeFromWithinTheCartReducer = ( state, action ) =>
{
    //removing from within the cart is easy because of the unique key 
    state.cartItems.map( ( item, index ) =>
    {
        if ( item.uniqueKey === action.payload.uniqueKey )
        {
            state.cartItems[index].count--;
            if ( state.orderTotal > 0 )
            {
                state.orderTotal -= ( action.payload.basePrice + action.payload.toppingCost );
            }
            if ( state.orderTotal < 0 )
            {
                state.orderTotal = 0;
            }
        }

    } );
};

export const addFromWithinTheCartReducer = ( state, action ) =>
{
    //adding from within the cart is easy because of the unique key
    state.cartItems.map( ( item, index ) =>
    {
        if ( item.uniqueKey === action.payload.uniqueKey )
        {
            state.cartItems[index].count++;

            state.orderTotal += ( action.payload.basePrice + action.payload.toppingCost );
        }
    } );
}