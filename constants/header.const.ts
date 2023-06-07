export const _loginUserOptions = [
    {
        key: 'Sign Up / Log in',
        text: 'Sign up / Log in',
        value: 'signup/login',
        id: 'signup_login'
        // image: { avatar: true, src: '/assets/user/default_user.png' },
    },
    {
        key: 'Vehicles',
        text: 'Vehicles',
        value: 'vehicles',
        id   : 'vehicles'
        // image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
    },
]

export const _authenticatedUserOption = (userType: string,peer_enabled:boolean) => {
    if (userType === 'NORMAL' || userType==="HOST") {

          return (
            [
                {
                    key: 'Profile',
                    text: 'Profile',
                    value: 'profile',
                    // image: { avatar: true, src: '/assets/user/default_user.png' },
                },
                {
                    key: 'Saved',
                    text: 'Favorites',
                    value: 'saved'
                },
                {
                    key: 'Inbox',
                    text: 'Inbox',
                    value: 'inbox'
                },
                {
                    key: 'Tell a Friend',
                    text: 'Tell a Friend',
                    value: 'tell-a-friend'
                },
                {
                    key: 'Transaction History',
                    text: 'Transaction History',
                    value: 'transaction_history',
                    // image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
                },
                {
                    key: 'Trips',
                    text: 'Trips',
                    value: 'trips',
                    // image: { avatar: true, src: '/assets/user/default_user.png' },
                },
                peer_enabled && {
                    key: 'Garage',
                    text: 'Garage',
                    value: 'garage',
                    // image: { avatar: true, src: '/assets/user/default_user.png' },
                },
                peer_enabled && {
                    key: 'Insurance Categories',
                    text: 'Insurance Categories',
                    value: 'insurance-categories',
                    // image: { avatar: true, src: '/assets/user/default_user.png' },
                },
                peer_enabled && {
                    key: 'Transaction History',
                    text: 'Transaction History',
                    value: 'transaction_history',
                    // image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
                },
                {
                    key: 'International License',
                    text: 'International License',
                    value: 'international_license',
                    // image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
                },
                {
                    key: 'Logout',
                    text: 'Logout',
                    value: 'logout',
                    // image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
                },
            ]
        )



    } else {
        return (
            [
                {
                    key: 'Profile',
                    text: 'Profile',
                    value: 'profile',
                    // image: { avatar: true, src: '/assets/user/default_user.png' },
                },
                {
                    key: 'Saved',
                    text: 'Favorites',
                    value: 'saved'
                },
                {
                    key: 'Inbox',
                    text: 'Inbox',
                    value: 'inbox'
                },
                {
                    key: 'Tell a Friend',
                    text: 'Tell a Friend',
                    value: 'tell-a-friend'
                },
                {
                    key: 'Trips',
                    text: 'Trips',
                    value: 'trips',
                    // image: { avatar: true, src: '/assets/user/default_user.png' },
                },
                {
                    key: 'Garage',
                    text: 'Garage',
                    value: 'garage',
                    // image: { avatar: true, src: '/assets/user/default_user.png' },
                },
                {
                    key: 'Host Activity',
                    text: 'Host Actitvity',
                    value: 'host-activity',
                },
                {
                    key: 'Insurance Categories',
                    text: 'Insurance Categories',
                    value: 'insurance-categories',
                    // image: { avatar: true, src: '/assets/user/default_user.png' },
                },
                {
                    key: 'Preferences',
                    text: 'Preferences',
                    value: 'preferences',
                    // image: { avatar: true, src: '/assets/user/default_user.png' },
                },
                {
                    key: 'Transaction History',
                    text: 'Transaction History',
                    value: 'transaction_history',
                    // image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
                },
                {
                    key: 'International License',
                    text: 'International License',
                    value: 'international_license',
                    // image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
                },
                {
                    key: 'Logout',
                    text: 'Logout',
                    value: 'logout',
                    // image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
                },
            ]
        )
    }

}



export const _languageOptions = [
    {
        key: 'en',
        text: 'English',
        value: 'en',
        lang_name: 'United Kingdom'
    },
    {
        key: 'zh',
        text: '语言',
        value: 'zh',
        lang_name: 'China'
    },
    {
        key: 'ru',
        text: 'Язык',
        value: 'ru',
        lang_name: 'Russia'
    },
    {
        key: 'ar',
        text: 'العربية',
        value: 'ar',
        lang_name: 'United Arab Emirates'
    },
    {
        key: 'th',
        text: 'ภาษาไทย',
        value: 'th',
        lang_name: 'Thailand'
    },
    {
        key: 'si',
        text: 'Slovenščina',
        value: 'si',
        lang_name: 'Slovenia'
    },
]