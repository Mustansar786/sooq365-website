importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCwqXe7pVm0S2Yw2b38wmtr80i90d1q4i8",
    authDomain: "urent-242005.firebaseapp.com",
    projectId: "urent-242005",
    storageBucket: "urent-242005.appspot.com",
    messagingSenderId: "866007792401",
    appId: "1:866007792401:web:9432e24c45e73f949faab0",
    measurementId: "G-G-2VJPZGG6F3"
});

const messaging = firebase.messaging();

// [END background_handler]

messaging.onBackgroundMessage((payload) => {
    const {title, body} = payload.notification;
    
    const notificationTitle = title;
    const notificationOptions = {
        body: body,
        icon: '/assets/header/logo-blue.svg'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});


