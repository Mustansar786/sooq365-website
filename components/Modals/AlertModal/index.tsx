import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react';
import styles from './alertModal.module.css';
import { IoAlertCircleSharp as AlertIcon } from 'react-icons/io5';

export type AlertModalHandle = {
    open: (message: string, isOpen: boolean, action?: () => void | undefined) => void,
}

const AlertModal: React.ForwardRefRenderFunction<AlertModalHandle> = (_, ref) => {
    const [state, setstate] = useState<any>({ message: "", isOpen: false, action: undefined });
    useImperativeHandle(ref, () => ({
        open(message: string, isOpen: boolean, action) {
            if (action === undefined) {
                setstate({ ...state, message, isOpen })
            } else {
                setstate({ ...state, message, isOpen, action })
            }
        }
    }));


    const modalActionButton = () => {
        setstate({ ...state, isOpen: false });
        if (state.action) {
            state.action();
        }
    }

    return (
        <Modal
            onClose={() => setstate({ ...state, isOpen: false })}
            onOpen={() => setstate({ ...state, isOpen: true })}
            open={state.isOpen}
        >
            <Header icon='exclamation' color="red" content='' />
            <Modal.Content>
                <Modal.Description>
                    <div className={styles.container}>
                        <p className={styles.align}><AlertIcon size={46} color="red" />{state.message}</p>
                    </div>
                </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
                <Button
                    content="Ok"
                    color="red"
                    labelPosition='right'
                    icon='close'
                    onClick={modalActionButton}
                // positive
                />
            </Modal.Actions>
        </Modal>
    )
};

export default forwardRef(AlertModal);
