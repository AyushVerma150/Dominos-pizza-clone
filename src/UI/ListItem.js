//lib imports
import React from 'react';

//reusable components
import otherConstants from 'Constants/OtherConstants';
import ToppingsInput from 'UI/ToppingsInput';
import Label from 'UI/Label';

//constants
import OtherConstants from 'Constants/OtherConstants';

//style imports
import styles from 'UI/Modal/Modal.module.css';

const ListItem = ( props ) =>
{
    // a common function for same type of toppings which can be reused again and again
    return (
        <div>
            {
                props.image !== null ?
                    <img
                        src={props.image}
                        className={styles.imageStyle}
                        alt={OtherConstants.NOT_AVAILABLE} >
                    </img>
                    : null
            }
            <div className={styles.displayFlex}>
                {
                    props.id !== otherConstants.CHEESE_TOPPING ?
                        <Label
                            id={props.id}
                            class={styles.marginRight}>{props.name}
                        </Label>
                        : null
                }
                {/*create a checkbox component separately */}
                <ToppingsInput
                    class={styles.checkBoxStyle}
                    id={props.id}
                    checked={props.checked}
                    changed={props.changed}
                />
            </div>
        </div>
    );

}

export default ListItem;

