//lib imports 
import React from 'react';

//reusable component
import { Modal } from 'react-bootstrap';

//style imports
import styles from 'UI/Modal/Modal.module.css';

const CustomModal = ( props ) =>
{
    //prevent closing the modal when user clicks inside the modal
    const preventPropagation = ( event ) =>
    {
        event.stopPropagation()
    }

    return (
        //close the modal on click outside of the modal
        <div
            onClick={() =>
            {
                props.resetModal();
            }}>
            {/* stopPropagation prevents the modal close on click inside of the modal */}
            <Modal
                show={props.show}
                onClick={( event ) => preventPropagation( event )}>
                <Modal.Header
                    className={styles.modalHeader}>
                    <Modal.Title
                        className={styles.floatRight}>
                        {props.title}
                    </Modal.Title>
                    {props.escapeIcon}
                </Modal.Header>
                <Modal.Body>
                    {
                        props.children
                    }
                </Modal.Body>
            </Modal>
        </div >
    );
};

export default CustomModal;