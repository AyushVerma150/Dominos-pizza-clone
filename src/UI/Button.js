//lib imports
import React from 'react';
import { Button } from 'react-bootstrap';

//constants
import otherConstants from 'Constants/OtherConstants';

const ButtonComponent = ( props ) =>
{

    return (
        <Button
            className={props.class}
            onClick={props.clicked}
            variant={otherConstants.BUTTON_TYPE}>
            {props.children}
        </Button>
    )
};


export default ButtonComponent;