import React, { useEffect, useState, useRef } from 'react'
import HomeLayout from 'Layouts/homeLayout';
import styles from './home.module.css';
import { Footer, ReactLoader } from 'components';
// import { useUserAgent } from 'next-useragent'
//import vehicleStyles from '../vehicles/vehicles.module.css';
import { VehicleCard, FlexableVehicleCard } from 'components';
// import { slide as FilterMenu } from 'react-burger-menu';
import Spinner from '../utils.js/Loader'
//import { useRouter } from 'next/router';
//Aslam testing
//import { useLazyQuery} from '@apollo/client';
import { RECENT_VEHICLES, GET_VEHICLES, CATEGORIES, TOPRATEDHOSTS, APPCONFIG, TOP_REVIEWS, CITY_WISE_AREA, MOST_SEARCHED } from 'graphql/query';
import { ReactCarousel } from 'components';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
//import { FilterBox } from 'components';
//import client from 'graphql/apollo-client';
//import IcoMoon from "../utils.js/icon";
import localforage from "localforage";
import { ImagePrefix, display_image, setSpeedSizeEnabled } from 'constants/constants';
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next';
import { analytic_first_open } from 'utils/seo_functions';
import { onMessageListener } from 'services/firebase';
import { useSelector } from 'react-redux';
import { RootStateI } from 'redux/reducer';
import { LoginWebEngage, UserCustomAttributesWebEngage, UserCustomAttributesWebEngageHash } from "components/Webengage";


//import { Grid,Image } from 'semantic-ui-react';

import { Rating } from 'react-simple-star-rating';
import { Card, Image, Grid, 
    Icon, 
    Divider
} from 'semantic-ui-react';
import moment from 'moment';
import FrequentlyAskedQuestions from 'components/StaticCom/FrequentlyAskedQuestions';
import { EventsWebEngage, AllEvents } from "components/Webengage";
import { useDispatch } from 'react-redux';

export interface IHome {
    i18n: any
}
const Home = ({ i18n }: IHome) => {

    // if (process.browser) {
    //     onMessageListener().then((payload: any) => {
    //         //     payload?.notification && dispatch({
    //         //     type: notificationtypes.SET_NOTIFICATION_COUNT,
    //         //     payload: {
    //         //         count : notification.count + 1
    //         //     }
    //         //   })
    //         const { title, body } = payload?.notification;
    //         if ('Notification' in window) {
    //             if (window.Notification.permission === 'granted') {
    //                 new window.Notification(title, { body, icon: "/assets/header/logo-blue.svg" });
    //             }
    //         }
    //     })
    // }
    const { t } = useTranslation();
    const dispatch = useDispatch();

    //const router = useRouter();

    const [isMobile, setIsMobile] = useState(false);
    const [europCarEnabled, setEuropCarEnabled] = useState(false);
    const isMobileRef = useRef(isMobile)
   
    const [downShiftIsOpen, setdownShiftIsOpen] = useState(false);

    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);


   

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


   
    return (
        <div id="home-page">
            {/* for SEO */}
            <h1 style={{display:"none"}}>HOME</h1>
            {/* <ChatOption label={"Live Chat"} onClick={gotoMessages} /> */}
            <HomeLayout isMobile={isMobile} downShiftIsOpen={downShiftIsOpen}title="Home"  pageScript={
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "AutoRental",
                            "name": "Urent",
                            "image": "https://urent.com/assets/header/logo-white.svg",
                            "@id": "",
                            "url": "https://urent.com",
                            "telephone": "+971 4 570 4555",
                            "priceRange": "25-5000",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Tameem House Office Building - Barsha Heights, Unit 2707 - 27th floor",
                                "addressLocality": "Dubai",
                                "postalCode": "",
                                "addressCountry": "AE"
                            },
                            "openingHoursSpecification": {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday"
                                ],
                                "opens": "09:00",
                                "closes": "21:00"
                            },
                            "sameAs": [
                                "https://www.facebook.com/URENTUAE/",
                                "https://twitter.com/urentapp",
                                "https://www.instagram.com/urent/"
                            ]
                        })
                    }}
                />
            }>
                
            </HomeLayout>
            <div className="main-body-container">
            {showTopBtn &&  
        <>
            {i18n.language === "ar" ? 
           ( <div style={{position: "fixed", right: 35, bottom: 70, zIndex: 2, backgroundColor: "rgb(86, 195, 197)", width: 45, height: 45, borderRadius: "50%", display: "flex", paddingRight: "2px", paddingTop: "7.5px"}} onClick={goToTop}>
            <Icon name='chevron up' size='big' style={{color:'white'}} />
            </div>)
            :
            (<div style={{position: "fixed", right: 35, bottom: 70, zIndex: 2, backgroundColor: "rgb(86, 195, 197)", width: 45, height: 45, borderRadius: "50%", display: "flex", paddingLeft: "6px", paddingTop: "7.5px"}} onClick={goToTop}>
            <Icon name='chevron up' size='big' style={{color:'white'}} />
            </div>)
            }
            </>
            }

            <div>
                <hr/><span className='orSpan'>Prime Deals</span>
            </div>
               
            </div>
            <Footer />
          
        </div>
    )
}


export default Home;