//lib imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


//slice imports
import
{
    removeFromCart,
}
    from 'Components/Cart/CartSlice';

//reusable components 
import { showModal } from 'UI/Modal/ModalSlice';
import DropdownComponent from 'UI/Dropdown';
import ButtonComponent from 'UI/Button';

//constants
import otherConstants from 'Constants/OtherConstants';

//style imports
import styles from 'Components/Pizza/Pizza.module.css';
import CardComponent from 'UI/CardComponent';

const PizzaCard = ( props ) =>
{
    //local variables
    let pizzaCount = 0;
    let pizzaToppings = [];

    //local  state
    const [content, setContent] = useState( null );

    const dispatch = useDispatch();
    const pizzaList = useSelector( state => state.cart.cartItems );

    //Fetching the Amount of pizza from the cart
    useEffect( () =>
    {
        setContent(
            < ButtonComponent
                class={styles.countButton}>
                <strong>{pizzaCount}</strong>
            </ ButtonComponent>
        );
    }, [pizzaList, pizzaCount] );

    //getting the toppings from the pizza in the cart to write in the cart section

    pizzaList.map( pizza =>
    {
        if ( pizza.id === props.id && pizza.count > 0 )
        {
            pizzaCount = pizza.count;
        }
        if ( pizza.id === props.id )
        {
            pizzaToppings = pizza.toppings;
        }
    } );

    return (
        <CardComponent
            image={props.img}
            pizza={props.pizza}
            class={styles.card}
            title={props.title}
            desc={props.description}
            size={
                <DropdownComponent
                    id={props.pizza.id}
                    data={props.size}
                    class={styles.dropDown}
                    title={props.pizza.selectedSize}
                    type={otherConstants.DROPDOWN_SIZE}
                    selectedCrust={props.pizza.selectedCrust}
                />
            }
            crust=
            {
                <DropdownComponent
                    id={props.pizza.id}
                    data={props.crust}
                    class={styles.dropDown}
                    title={props.pizza.selectedCrust}
                    type={otherConstants.DROPDOWN_CRUST}
                    selectedSize={props.pizza.selectedSize}
                />
            }>
            {
                //buttons when the type is pizza listing
                pizzaCount === 0 ?
                    < ButtonComponent
                        class={styles.addToCart}
                        clicked={props.clicked}
                    >
                        {otherConstants.ADD_ITEMS}
                    </ ButtonComponent>
                    :
                    <div className={styles.divWidth}>
                        <ButtonComponent
                            class={styles.cardRemoveFromCart}
                            clicked={() =>
                            {
                                dispatch( removeFromCart( props.pizza ) );
                            }}
                        ><i class={otherConstants.TRASH_BTN}></i>
                        </ButtonComponent>
                        {content}
                        < ButtonComponent
                            class={styles.cardAddToCart}
                            clicked={props.clicked}
                        ><i class={otherConstants.ADD_BTN}></i>
                        </ButtonComponent>
                    </div>
            }
            {/* //when the pizza are listed we always display the base price */}
            < ButtonComponent
                class={styles.cardPriceButton}
            >{otherConstants.BASE_PRICE + ( props.pizza.basePrice )}
            </ ButtonComponent>
            {
                //if the customizations are selected we want the user to know that he/ she has customized the pizza 
                //display the text on button accordingly
                pizzaToppings.length >= 1 ?
                    < ButtonComponent
                        class={styles.cardPriceButton}
                        clicked={() =>
                        {
                            dispatch( showModal( { id: props.id } ) );
                        }}
                    >{otherConstants.CUSTOMIZED}
                    </ ButtonComponent> :
                    < ButtonComponent
                        class={styles.cardPriceButton}
                        clicked={() =>
                        {
                            dispatch( showModal( { id: props.id } ) );
                        }}
                    >{otherConstants.ADD_CUSTOMIZATION}
                    </ ButtonComponent>
            }
            {/* //just a note for the user to see that additional cost is recorded in the cart or at checkout */}
            <p className={styles.fullWidth}>
                <strong >
                    {otherConstants.NOTE}
                </strong>
                <br />
                {otherConstants.USER_NOTE}
            </p>

        </CardComponent >
    )
};

export default PizzaCard;
