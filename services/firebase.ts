import * as firebase from "firebase/app";
import localforage from "localforage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { notification } from "utils/notification";
import { REGEX_SOCIAL_MEDIA } from 'constants/constants'



if (process.browser) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
    });
}


let messaging: any = {};

const checkUserAgent = async() => {
    const useragent:any  = await localforage.getItem("user-agent");
    if(!useragent?.match(REGEX_SOCIAL_MEDIA)){
        if (process.browser)
            messaging = getMessaging();
    }  
}


checkUserAgent();

const tokenInlocalforage = async () => {
    return await localforage.getItem("fcm_token");
};

export const fetch_fcmToken = async () => {
    const tokenInLocalForage = await tokenInlocalforage();
    //if FCM token is already there just return the token
    if (tokenInLocalForage !== null) {
        return tokenInLocalForage;
    } else {
        try {
           return Notification.requestPermission().then(async (permission) => {
               
                if (permission === 'granted') {
                    return await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAP_ID_KEY }).then((currentToken) => {
                        if (currentToken) {
                            return currentToken
                        } else {
                            return new Error('No registration token available. Request permission to generate one.')
                        }
                    });
                }else{
                    notification("warning","Warning",  "Notifications blocked. Please enable them in your browser.")
                }
            }).catch((err: Error) => {
                return new Error('An error occurred while retrieving token. Error=' + err)
                // ...
            });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}

export const onMessageListener = () => {
    return new Promise(async (resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload)
        })
    })
}

