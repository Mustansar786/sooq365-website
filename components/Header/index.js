import React, { useState, useEffect, useRef } from 'react';
import styles from './header.module.css';
import { _loginUserOptions, _authenticatedUserOption, _languageOptions } from 'constants/header.const';
import Link from 'next/link'
import { useTranslation } from 'react-i18next';
import Icon from 'utils.js/icon';
import { useRouter } from 'next/router';


import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Auth from 'components/auth';
import { Modal,Dropdown ,Label,Transition} from 'semantic-ui-react'
import PhoneVerification from 'components/auth/PhoneVerification';
import { useSelector } from 'react-redux'
import { customNotification, getUserToken, localforageClear } from 'utils/lib';
import { MY_PROFILE_QUERY, MYFAVOURITES ,SYNCTODB,CITY_WISE_AREA} from 'graphql/query';
// import { Modal, Label, Transition } from 'semantic-ui-react'
// import PhoneVerification from 'components/auth/PhoneVerification';
// import { useSelector } from 'react-redux'
// import { customNotification, getUserToken, localforageClear } from 'utils/lib';
// import { MY_PROFILE_QUERY, MYFAVOURITES, SYNCTODB } from 'graphql/query';
//import { useLazyQuery } from '@apollo/client';
import { useQuery, useApolloClient, useMutation } from '@apollo/client';

import { useDispatch } from 'react-redux';
import * as types from 'redux/action/type/user';

import {  Sidebar, NotificationModal,} from 'components';
 import Downshift from 'downshift';
// import { getRecentSearches, getSelectedCategoryId, setCurrentLocation } from "utils/lib";
 import { getRecentSearches, setRecentSearch, getSelectedCategoryId, setCurrentLocation, getCurrentLocation } from "utils/lib";
import { VEHICLES_SEARCH_INCOUNTS } from 'graphql/query';
import { LOGOUT } from 'graphql/mutation';
import { fetch_fcmToken } from 'services/firebase';
import { DateRangePicker } from 'rsuite';
import moment from 'moment';
import SidebarLanguageComponent from 'components/Sidebar-Language';
import { LogoutWebEngage,EventsWebEngage, AllEvents } from 'components/Webengage';
//import Flags from "country-flag-icons/react/3x2";
import Flag from 'react-flagkit';

const Header = (props) => {
    const { t } = useTranslation();
    const router = useRouter();
    const ref = useRef();
    const IconRef = useRef();
    const [state, setState] = useState({
        userLoggedOptions: _loginUserOptions,
        activeItem: 'Home',
        languageOptions: _languageOptions,
        sidebar_visible: false,
    })

    const { i18n } = useTranslation();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [openPhonVerificationModal, setOpenPhoneVerificationModal] = useState(false);
    const [language, setLanguage] = useState(_languageOptions[0].text);
    const [bgColor, setBgColor] = useState(router.pathname === '/' ? 'transparent' : 'white')
    const [imageWidth] = useState(45)
    const [isScrolling, setIsScrolling] = useState(false)
    const { userLoggedOptions, languageOptions } = state;
    

    const [device, setDevice] = useState()
    const [isMobile, setIsMobile] = useState(false)
    const [isHome, setIsHome] = useState(false);
    const [showSideBarLanguage, setshowSideBarLanguage] = useState(false);
    const [showSideBar, setshowSideBar] = useState(false);
    const [showNotifyModal, setshowNotifyModal] = useState(false);


    // Redux selectors
    const userSelector = useSelector((state) => state.user);
    // const _filterSelectorFormatted = JSON.parse(filterSelector);
    const dispatch = useDispatch();





    

    const appoloClient = useApolloClient();

    // ----------------------------------------------------QUERIES----------------------------------------------------

    

     /***************** Areas Based On selected City ************/
   
    



    const [logout_mutation] = useMutation(LOGOUT, {
        onCompleted: async() => {
           await LogoutWebEngage();
            customNotification("Logout");
            localforageClear();
            dispatch({
                type: types.LOGOUT__
            });
            appoloClient.cache.reset().then(() => {
                router.push('/');
            });
        },
        onError:(err)=>{
            if(err?.message==="Token expired"){
                localforageClear();
                dispatch({
                    type: types.LOGOUT__
                });
                appoloClient.cache.reset().then(() => {
                    router.push('/');
                });
            }
        }
    });


    // ----------------------------------------------------QUERIES----------------------------------------------------


    useEffect(() => {
        languageOptions.map(item => {
            if (item.value === i18n.language) {
                setLanguage(item.text)
            }
        })
    }, [i18n.language])

    useEffect(() => {
        if (userSelector?.openPhoneVerificationModal) {
            setOpenAuthModal(false);
            openModalPhoneVerification(true)
        }

    }, [userSelector.openPhoneVerificationModal])

    useEffect(() => {
        const getAuthenticate = async () => {
            let token = await getUserToken()
            if (userSelector.user.userid || token) {
                const activeRecord = userSelector?.user.profile?.residing_in?.length > 0 ? userSelector?.user.profile?.residing_in?.find((val) => val.active === true) : {};
                setState({ ...state, userLoggedOptions: _authenticatedUserOption(userSelector.user.userType,activeRecord?.countryId?.is_peer_enabled), openAuthModal: false })
            } else if (userSelector.user.userid === undefined || userSelector.user.userid === null || userSelector.user.userid === '') {
                setState({ ...state, userLoggedOptions: _loginUserOptions });
                setshowNotifyModal(false);
            }
        }
        getAuthenticate();

    }, [userSelector.user.userid])


    

    useEffect(() => {
        userSelector.user.verified_phone === true && setOpenPhoneVerificationModal(false)
    }, [userSelector.user.verified_phone])


    useEffect(() => {
        setDevice(require("current-device").default);
    }, [])

    useEffect(() => {
        device != undefined && setIsMobile(device.mobile() || device.ipad())
    }, [device])

    useEffect(() => {
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((positions) => {
        //         const coordinates = {
        //             lat: positions.coords.latitude,
        //             lng: positions.coords.longitude
        //         };
        //         setCurrentLocation(coordinates);

        //     });
        // }
    }, []);

    useEffect(() => {
        const checkIfClickedOutside = e => {

            if (ref.current && !ref.current.contains(e.target) && IconRef.current && !IconRef.current.contains(e.target)) {
                setshowNotifyModal(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [ref, IconRef])


    // const gotoOptions = (e, item) => {
    //     i18n.changeLanguage(e.value);
    //     setLanguage(item.text)
    //     const { pathname, asPath, query } = router;
    //     router.push({ pathname, query }, asPath, { locale: e.value })
    // }

    const gotoOptionsProfile = async (_, item) => {
        if (item.value === 'signup/login')
            setOpenAuthModal(true)
        else if (item.value === 'vehicles') {
            router.push('/vehicles')
        } else if (item.value === 'profile') {
            router.push('/profile')
        } else if (item.value === 'trips') {
            router.push('/trips')
        } else if (item.value === 'inbox') {
            router.push('/messages')
        } else if (item.value === 'transaction_history') {
              await EventsWebEngage(AllEvents.TransactionHistory)
            router.push('/transaction-history')
        } else if (item.value === 'saved') {
            await EventsWebEngage(AllEvents.FavoritesViewed)
            router.push('/saved')
        } else if (item.value === 'tell-a-friend') {
            await EventsWebEngage(AllEvents.Tell_a_Friend)
            router.push('/tell-a-friend')
        } else if (item.value === 'garage') {
            router.push('/garage')
        } else if (item.value === 'international_license') {
            await EventsWebEngage(AllEvents.InternationalLicense)
            router.push('/international-license')
        } else if (item.value === 'logout') {
            dispatch({
                type: countryTypes.REMOVE_COUNTRY_PARAMS
            });
            dispatch({
                type: citiestypes.REMOVE_CITY_SELECTED
              });

            let fcm = await fetch_fcmToken();
            logout_mutation({
                variables: {
                    fcm_token: fcm ? fcm : "fcm_" + new Date().toISOString()
                }
            })
        }
        else {
            router.push('/' + item.value);
        }
   } 

    const listenScrollEvent = () => {
        if (window.scrollY > 22) {
            setIsScrolling(true)
            setBgColor('white')
        } else {
            setIsScrolling(false)
            if (router.pathname === '/') {
                setBgColor('transparent')
            }
            // setImageWidth(40)
        }
    }

    const openModalAuth = (val) => {
        setOpenAuthModal(val)
    }

   

    const OpenSideBarMenu = () => {
        setshowSideBar(!showSideBar);
    }

    const OpenSideBarLanguageMenu = () => {
        setshowSideBarLanguage(!showSideBarLanguage);
    }



    // const isMinWidth=router.pathname==="/[location_slug]"||router.pathname==="/vehicles";
    const handleClick=(menu)=>{
        EventsWebEngage(AllEvents.TopMenuClicked,{menu_name:menu})
    }
    return (
        <div className="main-header-container"
        style={{ 
            background: "white", boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 10px' , transition:"background-color 0.6s", position: 'fixed'}}
        >
        <div className="sub-container">
            
            {/* {<CountryChangeModal showModal={showCountryChangeModal} onClose={closeChangeCountryModal}></CountryChangeModal>} */}
            {/* {isMobile ? <SearchModal showModal={ShowModal} onClose={closeSearchModal} categoryIcon={props?.categoryIcon ? props.categoryIcon:categoryIcon}></SearchModal> : null} */}

            {/* {(!isMobile && loactionSearchModal )? <SearchLocationModal showModal={loactionSearchModal} onClose={closeLocationSearchModal} rentingCity={countrySelector?.data?.cityName || "Dubai"}></SearchLocationModal> : null} */}
            {/* {isMobile ? <FilterModal showModal={showFilterModal} onClose={closeFilterModal} i18n={i18n}></FilterModal> : null} */}
            {isMobile ? <Sidebar visible={showSideBar} setVisible={() => setshowSideBar(false)} languageOptions={languageOptions}></Sidebar> : null}
            {!isMobile ? <div ref={ref}> <NotificationModal  isOpen={showNotifyModal} lang_code={i18n.language}></NotificationModal> </div> : null}
            {!isMobile ? <SidebarLanguageComponent visible={showSideBarLanguage} setVisible={() => setshowSideBarLanguage(false)} languageOptions={languageOptions}></SidebarLanguageComponent> : null}

            <div className={styles.headerMobile} >
                {isMobile &&
                    <div className={styles.mainMenu}>

                        <div style={{ display: 'flex', justifyContent: 'space-between' ,alignItems:"baseline"}}>
                            <Link href="/" passHref >
                                <img src={((isScrolling && isHome) || !isHome) ? "/assets/header/logo-blue.svg" : "/assets/header/logo-white.svg"} className={styles._urentLogo} alt="urent-logo" style={{ width: imageWidth, cursor: "pointer" }} />
                            </Link>
                            {/* <div style={{display:"flex"}}>
                                <div style={{display:"flex",alignItems:"center"}}> 
                                <Flag country={countrySelector.data.countryCode} size={20} style={{marginRight:5}} /> */}
                                {/* <img src="https://icons.iconarchive.com/icons/wikipedia/flags/32/AE-United-Arab-Emirates-Flag-icon.png" style={{marginRight:5}} /> */}
                                    {/* <span onClick={openChangeCountryModal} style={{cursor:isHome?"pointer":"unset"}}>
                                                <div style={{ color: (!isScrolling && isHome) ? 'white' : 'black' }}><span>{countrySelector.data.countryCode}</span> , <span style={{marginRight:3}}>{countrySelector.data.cityName}</span> 
                                               {<Icon icon='expand-button' size={9}  color={(!isScrolling && isHome) ? 'white' : 'black' }/> }
                                                </div>
                                    </span>
                                </div>
                            </div> */}

                            <div style={i18n.dir() === 'rtl' ? { display: 'flex', height: 25, marginLeft: -20, marginTop: '0.15rem', marginBottom: ' 0.75rem' } : { display: 'flex', height: 25, marginTop: '0.15rem', marginBottom: ' 0.75rem' }}>
                               
                               {/* {props.categoryIcon == 'car' && 
                                  <div className={styles.filterMenu} onClick={openSearchModal}>
                                    <Icon icon='magnifying-glass' size={15} color={`var(--dark_theme_color)`} />
                                 </div>
                                }

                                <div className={filterSelector.length > 1&&router.pathname!=="/" ? styles.filterMenu_selected : styles.filterMenu} onClick={openFilterModal}>
                                    <Icon icon='equalizer, settings, options' size={15} color={filterSelector.length > 1 && router.pathname!=="/" ? `var(--light_theme_color)` : `var(--dark_theme_color)`} />
                                </div>

                                <div className={router.pathname ==="/location" ? styles.filterMenu_selected : styles.filterMenu} onClick={openLocation}>
                                    <Icon icon='pin' size={15} color={router.pathname ==="/location" ? `var(--light_theme_color)` : `var(--dark_theme_color)`} />
                                </div> */}

                                <div style={{ marginTop: '1.2em' }} onClick={OpenSideBarMenu}>
                                    <Icon icon='menu-1' size={20} color={(!isScrolling && isHome) ? 'white' : 'var(--theme_color)'} />

                                </div>
                            </div>
                        </div>

                    </div>
                }

            </div>


            {/* Web view */}
            <div className={styles._header_container} style={{ paddingTop: (isScrolling && isMobile) ? '1%' : 'unset' }}>
                <div className={styles._header} >
                    <div style={{display:"flex",alignItems:"flex-end"}}>
                        <Link href="/">
                            <img src={((isScrolling && isHome) || !isHome) ? "/assets/header/logo-blue.svg" : "/assets/header/logo-white.svg"} className={styles._urentLogo} alt="urent-logo" style={{ width: imageWidth, cursor: "pointer" }} />
                        </Link>
                        {/* <div style={{display:"flex",position:"relative",left:"30px", right: i18n.language === "ar" ? "20px" : "0px" }}>
                          <div style={{display:"flex",height:20,marginLeft:10}}> 
                          <Flag country={countrySelector.data.countryCode} size={20} style={{marginRight:5}} /> */}
                          {/* <img src="https://icons.iconarchive.com/icons/wikipedia/flags/32/AE-United-Arab-Emirates-Flag-icon.png" style={{marginRight:5}} /> */}
                              {/* <span onClick={openChangeCountryModal} style={{cursor:"pointer"}}>
                                        <div style={{ color: (!isScrolling && isHome) ? 'white' : 'black' }}><span>{countrySelector.data.countryCode}</span> , <span style={{marginRight:3}}>{countrySelector.data.cityName}</span> 
                                         {<Icon icon='expand-button' size={9}  color={(!isScrolling && isHome) ? 'white' : 'black' }/> }
                                        </div>
                             </span>
                          </div> 
                        </div> */}
                    </div>

                    {/* <div style={{ display: 'flex' }}>
                        <Link href="/" passHref >
                            <a onClick={()=>handleClick("Home")}className={cx({ [styles.activeItem]: router.pathname === '/' })} style={{ color: (!isScrolling && isHome) ? 'black' : 'black' }}>{t('Home')}</a>
                        </Link>
                        <Link href="/about" passHref>
                            <a onClick={()=>handleClick("About Us")}className={cx({ [styles.activeItem]: router.pathname === '/about' })} style={{ color: (!isScrolling && isHome) ? 'black' : 'black' }} >{t('About Us')}</a>
                        </Link>
                         <Link  href={{
                                pathname: '/[location_slug]',
                                query: { location_slug: 'rent-a-car' }
                                }}
                                asPath ='/rent-a-car'
                                >
                            <a 
                            onClick={()=>{
                                  dispatch({
                                    type: filterTypes.REMOVE_FILTER_PARAMS,
                                })
                                handleClick("Car Rental")
                                }}className={cx({ [styles.activeItem]: router.query.location_slug === 'rent-a-car'})} style={{ color: (!isScrolling && isHome) ? 'black' : 'black' }}>{t('Car Rental')}</a>
                        </Link>
                       
                        <Link href={{
                                pathname: '/[location_slug]',
                                query: { location_slug: 'rent-a-yacht' }
                                }}>
                            <a onClick={()=>{
                                dispatch({
                                    type: filterTypes.REMOVE_FILTER_PARAMS,
                                })
                                handleClick("Yacht Rental")
                                }}className={cx({ [styles.activeItem]: router.query.location_slug === 'rent-a-yacht'})} style={{ color: (!isScrolling && isHome) ? 'black' : 'black' }}>{t('Yacht Rental')}</a>
                        </Link>
                        
                       
                    </div> */}
                    <div style={{display:"flex",justifyContent:"center", alignItems: "center"}}>
                    <a onClick={()=>handleClick("Language")}className="item" style={{ color: 'black', cursor: 'pointer' }}>
                            <div onClick={OpenSideBarLanguageMenu} style={{ color: isHome ? 'black' : 'black', display: "flex", justifyContent: "center" }}>
                                <div>
                                    <img src={"/assets/header/globe.svg"} alt="Language" height="17" style={{ marginRight: 5 }} />
                                    </div>
                                <div>{language}</div>
                            </div>
                        </a>
                    {/* <div style={{ display: 'flex', alignItems: 'center' }}>

                        {
                            userSelector.user.userid ?
                                <>
                                    <div ref={IconRef}>
                                        <Icon icon='notifications_none' size={25} color={(!isScrolling && isHome) ? 'white' : 'var(--theme_color)'} onClick={openNotificationModal} style={{ cursor: 'pointer' }} />
                                    </div>
                                    {notificationSelector?.count > 0 && <Label circular color={"red"} style={i18n.language === "ar" ? { position:"relative", left:"40px", top:"-16px"}
                                    : 
                                    { marginTop: -30, marginLeft: -9 }
                                }>
                                        {notificationSelector.count}
                                    </Label>}
                                </>
                                : null
                        }
                        </div> */}
                      
                        <div>
                        <a className="item" style={{ color: !isScrolling ? 'white' : 'black',paddingRight:"0px" }}>
                            <Menu
                                menuButton={
                                    <MenuButton id="menu_popup">
                                        <div style={{ padding: '8px 14px', background: `var(--theme_color)`, display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderRadius: 6 ,cursor:"pointer"}}>
                                            <Icon icon='menu-1' size={15} color="white"/>
                                            <div className={styles.menuicon} style={i18n.dir() === 'rtl' ? {marginRight:10}:{marginLeft:10}}>
                                                <Icon icon='emp-user' size={15} color={`var(--theme_color)`} />
                                            </div>

                                        </div>

                                    </MenuButton>
                                } transition>
                                {userLoggedOptions.map((item, index) => {
                                    return (
                                        item ?<MenuItem key={index} id={item.hasOwnProperty('id') ? item.id : 'menu_' + index} value={item.value} onClick={(e) => gotoOptionsProfile(e, item)} >{t(item.text)}</MenuItem>:""
                                    )
                                })}
                            </Menu>
                        </a>
                    </div>
                    </div>
                </div>
                {/*Search Box*/}

                </div>
            <Modal
                onClose={() => openModalAuth(false)}
                onOpen={() => openModalAuth(true)}
                open={openAuthModal}
                closeOnDimmerClick={false}
            >
                <Auth openModal={openModalAuth} />
            </Modal>

            
            </div>
            </div>
       
    )
}

export default React.memo(Header);
