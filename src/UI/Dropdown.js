//lib imports
import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, DropdownButton } from 'react-bootstrap';

//slice imports
import { changePizzaSize, changePizzaCrust } from 'Components/Pizza/PizzaSlice';

//constants
import otherConstants from 'Constants/OtherConstants';


const DropdownComponent = ( props ) =>
{
    const dispatch = useDispatch();
    return (
        <DropdownButton
            variant={otherConstants.BUTTON_TYPE}
            title={props.title}
            className={props.class}>
            {props.type === otherConstants.DROPDOWN_SIZE ?
                props.data.map( ( item, index ) =>
                {
                    return <Dropdown.Item
                        key={index}
                        onClick={
                            () =>
                            {
                                dispatch( changePizzaSize( {
                                    id: props.id,
                                    size: item.type,
                                    cost: item.cost,
                                    currentCrust: props.selectedCrust
                                } ) )
                            }
                        }>
                        {item.type}
                    </Dropdown.Item>;
                } ) :
                props.data.map( ( item, index ) =>
                {
                    return <Dropdown.Item
                        key={index}
                        onClick={() =>
                        {
                            dispatch( changePizzaCrust( {
                                id: props.id,
                                crust: item.type,
                                cost: item.cost,
                                currentSize: props.selectedSize
                            } ) )
                        }} >{item.type
                        }</Dropdown.Item>;
                } )
            }
        </DropdownButton>
    )
};
export default DropdownComponent;