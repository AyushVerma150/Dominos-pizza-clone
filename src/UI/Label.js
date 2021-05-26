//lib imports
import React from 'react';

const Label = ( props ) =>
{
    return (
        <label className={props.class} htmlFor={props.id}>{props.children}</label> );
};

export default Label;


