import { store } from "react-notifications-component";



type Itype = 'success' | 'danger' | 'info' | 'default' | 'warning' | undefined;


export const notification = (type: Itype, title: string, message: string,) => {
    return (
        store.addNotification({
            title,
            message,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        })
    );
}