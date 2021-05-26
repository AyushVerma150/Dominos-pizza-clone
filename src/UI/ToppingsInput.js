//lib imports
import React from 'react';

//constants
import otherConstants from 'Constants/OtherConstants';

const ToppingsInput = ( props ) =>
{
    return (
        <input
            id={props.id}
            className={props.class}
            type={otherConstants.CHECKBOX_INPUT}
            checked={props.checked}
            onChange={props.changed}
        />
    )
};

export default ToppingsInput;