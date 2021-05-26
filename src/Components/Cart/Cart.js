//lib imports
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//slice imports
import { hideError } from 'Components/Cart/CartSlice';

//reusable components
import CartItem from 'Components/Cart/CartItem';

//constants
import otherConstants from 'Constants/OtherConstants';

//stye imports
import styles from 'Components/Cart/Cart.module.css';



const Cart = () =>
{
    //local variables
    let content;

    //local state
    const [cartItems, setCartItems] = useState( [] );
    const [userMsg, setUserMsg] = useState( null );

    const dispatch = useDispatch();
    const addedToCart = useSelector( state => state.cart.cartItems );
    const error = useSelector( state => state.cart.error );

    useEffect( () =>
    {
        if ( error )
        {
            //error displayed when user tries to edit more than one customized items in the cart of same type
            setUserMsg( <div className={styles.errorDiv}>{error}</div> );
            setTimeout( () =>
            {
                dispatch( hideError( null ) );
            }, otherConstants.TIME_OUT );
        }
        else
        {
            setUserMsg( null );
        }

    }, [error, dispatch] );

    useEffect( () =>
    {
        if ( addedToCart.length === 0 )
        {
            content = otherConstants.ADD_TO_CART;
        }
        else
        {
            setCartItems( addedToCart );
        }
    }, [addedToCart, cartItems] );

    if ( cartItems.length >= 1 )
    {
        content = cartItems.map( pizza =>
        {
            //returning pizza when cart contains with pizza Count >0
            if ( pizza.count > 0 )
            {

                return <CartItem
                    pizza={pizza}
                    title={pizza.name}
                    image={pizza.image}
                    size={pizza.selectedSize}
                    crust={pizza.selectedCrust}
                    customizations={pizza.toppings}
                    description={pizza.description}
                    type={otherConstants.DISPLAY_CART}
                />
            }
        } );
    }
    else if ( cartItems.length === 0 )
    {
        //Cart is empty Msg
        content =
            <div className={styles.userMsg}>
                {otherConstants.ADD_TO_CART}
            </div>;
    }
    return (
        <div>
            {
                userMsg
            }
            <div className={styles.cart}>
                <h4>{otherConstants.CART}</h4>
                {content}
            </div>

        </div>
    );
};

export default Cart;