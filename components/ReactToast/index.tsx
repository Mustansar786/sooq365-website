import React from 'react'
import ReactNotification from 'react-notifications-component'


type _ReactNotification = {
}

export type options = {
    title: string;
    message: string;
    type: string;
    insert: string;
    container: string;
    animationIn: string[];
    animationOut: string[];
}
function ReactToast({ }:_ReactNotification) {
    return <ReactNotification />
}

ReactToast.propTypes = {

}

export default ReactToast

