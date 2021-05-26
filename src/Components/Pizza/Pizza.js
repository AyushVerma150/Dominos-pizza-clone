//lib imports
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

//slice imports
import { addToCart } from 'Components/Cart/CartSlice';
import { getModalState, hideModal } from 'UI/Modal/ModalSlice';
import { toppingPresent, FindToppings } from 'Utils/Utils';
import { AddCustomizations } from 'Components/Pizza/PizzaSlice';

//reusable components
import PizzaCard from 'Components/Pizza/PizzaCard';
import CustomModal from 'UI/Modal/CustomModal';
import otherConstants from 'Constants/OtherConstants';
import Label from 'UI/Label';
import ListItem from 'UI/ListItem';
import ButtonComponent from 'UI/Button';

//style imports
import stylesForModal from 'UI/Modal/Modal.module.css';
import styles from 'Components/Pizza/Pizza.module.css';

const Pizza = () =>
{
    //introduced local state to capture the selected customizations
    const [pizzaToppings, setPizzaToppings] = useState( [] );
    const [tomatoChecked, setTomatoChecked] = useState( false );
    const [onionChecked, setOnionChecked] = useState( false );
    const [capsicumChecked, setCapsicumChecked] = useState( false );
    const [jalapenoChecked, setJalapenoChecked] = useState( false );
    const [extraCheeseChecked, setExtraCheeseChecked] = useState( false );

    //use state and use dispatch
    const dispatch = useDispatch();
    const pizzaListing = useSelector( state => state.pizza.pizzaTypes );
    const masterData = useSelector( state => state.pizza.masterData );
    const show = useSelector( getModalState );
    const pizzaId = useSelector( state => state.modal.pizzaId );
    const pizzaList = useSelector( state => state.cart.cartItems );

    useEffect( () =>
    {
        pizzaList.map( pizza =>
        {
            if ( pizza.id === pizzaId )
            {
                setPizzaToppings( pizza.toppings );
            }
        } );
    }, [pizzaId] );

    useEffect( () =>
    {
        for ( let i = 0; i < pizzaToppings.length; i++ )
        {
            //code to set the local state which reflects the selected / pre-existed toppings
            if ( toppingPresent( pizzaToppings[i], otherConstants.TOMATO_TOPPING ) )
            {
                setTomatoChecked( true );
            }
            if ( toppingPresent( pizzaToppings[i], otherConstants.CAPSICUM_TOPPING ) )
            {
                setCapsicumChecked( true );
            }
            if ( toppingPresent( pizzaToppings[i], otherConstants.ONION_TOPPING ) )
            {
                setOnionChecked( true );
            }
            if ( toppingPresent( pizzaToppings[i], otherConstants.JALAPENO_TOPPING ) )
            {
                setJalapenoChecked( true );
            }
            if ( toppingPresent( pizzaToppings[i], otherConstants.CHEESE_TOPPING ) )
            {
                setExtraCheeseChecked( true );
            }
        }

    }, [pizzaList, pizzaToppings] );

    //local variable
    let finalToppings = [];
    let component = null;
    const escapeIcon = <i
        className={styles.floatLeft}
        onClick={() => resetAndClose()}
        class={otherConstants.CROSS_ICON}>
    </i>;
    const toppingsMasterData = [
        {
            name: otherConstants.ONION_TOPPING,
            image: otherConstants.ONION_IMG,
            checked: onionChecked,
            changed: ( event ) =>
            {
                setOnionChecked( event.target.checked );
            }
        },
        {
            name: otherConstants.CAPSICUM_TOPPING,
            image: otherConstants.CAPSICUM_IMG,
            checked: capsicumChecked,
            changed: ( event ) =>
            {
                setCapsicumChecked( event.target.checked );
            }
        },
        {
            name: otherConstants.JALAPENO_TOPPING,
            image: otherConstants.JALAPENO_IMG,
            checked: jalapenoChecked,
            changed: ( event ) =>
            {
                setJalapenoChecked( event.target.checked );
            }
        },
        {
            name: otherConstants.TOMATO_TOPPING,
            image: otherConstants.TOMATO_IMG,
            checked: tomatoChecked,
            changed: ( event ) =>
            {
                setTomatoChecked( event.target.checked );
            }
        }
    ];

    //functions
    const resetToppings = () =>
    {
        //resetting the state.
        setTomatoChecked( false );
        setCapsicumChecked( false );
        setOnionChecked( false );
        setJalapenoChecked( false );
        setExtraCheeseChecked( false );
        setPizzaToppings( [] );
    }

    const resetAndClose = () =>
    {
        resetToppings();
        dispatch( hideModal() );
    }

    const addCustomizations = () =>
    {
        finalToppings = FindToppings( tomatoChecked, otherConstants.TOMATO_TOPPING, finalToppings );
        finalToppings = FindToppings( jalapenoChecked, otherConstants.JALAPENO_TOPPING, finalToppings );
        finalToppings = FindToppings( onionChecked, otherConstants.ONION_TOPPING, finalToppings );
        finalToppings = FindToppings( capsicumChecked, otherConstants.CAPSICUM_TOPPING, finalToppings );
        finalToppings = FindToppings( extraCheeseChecked, otherConstants.CHEESE_TOPPING, finalToppings );
        dispatch( AddCustomizations( { toppings: finalToppings, id: pizzaId } ) );
        resetAndClose();
    }

    //if no elements exists then we display a user message
    if ( pizzaListing.length < 1 )
    {
        component = otherConstants.WORKING_ON_IT;
    }
    else
    {
        //displaying all the pizza card with all the prior information from the masterData
        component = pizzaListing.map( pizza =>
        {
            return <PizzaCard
                id={pizza.id}
                pizza={pizza}
                img={pizza.image}
                title={pizza.name}
                size={masterData.size}
                crust={masterData.crust}
                description={pizza.description}
                type={otherConstants.DISPLAY_CARD}
                clicked={() =>
                {
                    dispatch( addToCart( pizza ) );
                }}
            />
        } );
    }

    return (
        <div className={styles.pizzaDiv}>
            {/* adding a modal for adding customization... */}
            <CustomModal
                resetModal={resetAndClose}
                show={show}
                title={otherConstants.ADD_CUSTOMIZATION}
                escapeIcon={escapeIcon}
            >
                <strong className={stylesForModal.marginLeft}>
                    {otherConstants.ADD_CHEESE_COST}
                </strong>
                <div className={stylesForModal.displayFlex}>
                    {/* Cheese item toppings */}
                    <Label
                        id={otherConstants.CHEESE_TOPPING}
                        class={stylesForModal.cheeseLabel}>
                        {otherConstants.ADD_CHEESE}
                    </Label>
                    <ListItem
                        image={null}
                        pizzaId={pizzaId}
                        checked={extraCheeseChecked}
                        id={otherConstants.CHEESE_TOPPING}
                        name={otherConstants.CHEESE_TOPPING}
                        changed={( event ) =>
                        {
                            setExtraCheeseChecked( event.target.checked );
                        }} />
                </div>
                <strong className={stylesForModal.marginLeft}>
                    {otherConstants.ADD_VEG_TOPPINGS}
                </strong>
                <div className={stylesForModal.toppingBox} >
                    {/* Getting same type of toppings.. */}
                    {
                        toppingsMasterData.map( data =>
                        {
                            return <ListItem
                                id={data.name}
                                name={data.name}
                                pizzaId={pizzaId}
                                image={data.image}
                                checked={data.checked}
                                changed={data.changed}
                            />
                        } )
                    }
                </div>
                {/* updating a finalToppings data when toppings change */}
                <ButtonComponent
                    clicked={() => addCustomizations()}>
                    {otherConstants.ADD_CUSTOMIZATION}
                </ButtonComponent>
                {/* reset the toppings once user closes the modal */}
                <ButtonComponent
                    clicked={() => resetAndClose()}>
                    {otherConstants.DELETE_CUSTOMIZATION}
                </ButtonComponent>
            </CustomModal >
            {
                component
            }
        </div >
    );
};

export default Pizza;