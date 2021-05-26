//lib imports
import React from 'react';
import { useDispatch } from 'react-redux';


//slice imports
import
{
    removeFromWithinTheCart,
    addFromWithinTheCart
}
    from 'Components/Cart/CartSlice';

//reusable components 
import ButtonComponent from 'UI/Button';
import CardComponent from 'UI/CardComponent';

//constants
import otherConstants from 'Constants/OtherConstants';

//style imports
import styles from 'Components/Pizza/Pizza.module.css';


const CartItem = ( props ) =>
{
    //local variable
    let customizations = "";
    const price = ( ( props.pizza.basePrice + props.pizza.toppingCost ) * props.pizza.count );

    const dispatch = useDispatch();

    //setting up customization text
    if ( props.pizza.toppings )
    {
        for ( let i = 0; i < props.pizza.toppings.length; i++ )
        {
            if ( props.pizza.toppings[i] !== null && i < props.pizza.toppings.length - 1 )
            {
                customizations += props.pizza.toppings[i] + ", ";
            }
            else
            {
                customizations += props.pizza.toppings[i];
            }
        }
    }

    return (

        <CardComponent
            size={props.size}
            pizza={props.pizza}
            class={styles.card}
            image={props.image}
            title={props.title}
            crust={props.crust}
            desc={props.description}>
            {
                props.pizza.toppings.length >= 1 ?
                    <div className={styles.cartCustomizations}>
                        <strong> {otherConstants.YOUR_CUSTOMIZATIONS} </strong>
                        <br />
                        {customizations}
                        <i
                            className={styles.iconStyle}
                            class={otherConstants.CUSTOM_ICON}>
                        </i>
                    </div>
                    : null
            }
            <div className={styles.fullWidth}>
                < ButtonComponent
                    class={styles.cartButtonWidth}
                    clicked={() =>
                    {
                        dispatch( removeFromWithinTheCart( props.pizza ) );
                    }}
                ><i class={otherConstants.TRASH_BTN}></i>
                </ ButtonComponent>
                <ButtonComponent
                    class={styles.removeFromCart}
                >
                    {props.pizza.count}
                </ButtonComponent>
                < ButtonComponent
                    class={styles.cartButtonWidth}
                    clicked={() =>
                    {
                        dispatch( addFromWithinTheCart( props.pizza ) );
                    }}
                ><i
                    class={otherConstants.ADD_BTN}>
                    </i>
                </ ButtonComponent>
            </div>
            < ButtonComponent
                class={styles.cardPriceButton}
            >
                {otherConstants.SUB_TOTAL + price}
            </ButtonComponent>
        </CardComponent>
    );
};

export default CartItem;