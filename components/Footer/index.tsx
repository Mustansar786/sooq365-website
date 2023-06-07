import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Grid } from 'semantic-ui-react';
import styles from './footer.module.css';
import { useRouter } from "next/router";
import { ProfileModal } from "components";
import { RootStateI } from '../../redux/reducer';
import Icon from 'utils.js/icon';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { AllEvents, EventsWebEngage } from '../../components/Webengage';

export default function Footer() {
    const { t } = useTranslation();
    const router = useRouter();
    const [device, setDevice] = useState<any>()
    const [isMobile, setIsMobile] = useState(false)
    const [showProfileModal, setshowProfileModal] = useState(false);
    const userSelector = useSelector((state: RootStateI) => state.user);
    useEffect(() => {
        // console.log('type of', typeof(require("current-device").default))
        setDevice(require("current-device").default);
    }, [])
    useEffect(() => {
        device != undefined && setIsMobile(device.mobile())
    }, [device])

    const openProfileModal = () => {
        setshowProfileModal(!showProfileModal);
    }

    const gotolinks = (link: string) => {
        router.push('/' + link);
        if (showProfileModal) {
            setshowProfileModal(false);
        }
    }


    const gotoStore = (data: string) => () => {
        //************** Analytics */
       EventsWebEngage(AllEvents.DownloadApp,{platform:data})
       //************************************** */
        if (data === "google") {
            router.push('https://play.google.com/store/apps/details?id=com.urent.urentapp')
        } else if (data === "apple") {
            router.push('https://apps.apple.com/us/app/urent/id1492748796')
        } else {
            router.push('https://appgallery.huawei.com/app/C104517933')
        }
    }

    return (
        <>
            {isMobile ?
                <div className="main-mobile-footer-container" >
                    <div className={styles.footerMobile}>
                        {
                            userSelector.user.userid ?
                                <>
                                    <ProfileModal visible={showProfileModal} closeModal={openProfileModal}></ProfileModal>
                                    <div className={styles.Menu} onClick={() => gotolinks('home')}><Icon icon='home' size={19} color="black" /><p>Home</p></div>
                                    <div className={styles.Menu} onClick={() => gotolinks('messages')}><Icon icon='inbox' size={18} color="black" /><p>Inbox</p></div>
                                    <div className={styles.Menu} onClick={() => gotolinks('trips')}><Icon icon='trips' size={19} color="black" /><p>Trips</p></div>
                                    {
                                    userSelector.user.userType === 'CH_HOST' ? 
                                    <div className={styles.Menu} onClick={() => gotolinks('garage')}><Icon icon='indoor-parking' size={19} color="black" /><p>Garage</p></div>
                                    :
                                    <div className={styles.Menu} onClick={() => gotolinks('transaction-history')}><Icon icon='wallet' size={19} color="black" /><p>Wallet</p></div>
                                    }
                                    <div className={styles.Menu} onClick={openProfileModal}><Icon icon='user' size={19} color="black" /><p>Profile</p></div>

                                </>
                                :
                                <>
                                    <div className={styles.Menu} onClick={() => gotolinks('home')}><Icon icon='home' size={19} color="black" /><p>Home</p></div>
                                    <div id="__signin_footer" className={styles.Menu} onClick={() => gotolinks('signin')}><Icon icon='user' size={19} color="black" /><p>Sign In</p></div>
                                    <div id="__signup_footer" className={styles.Menu} onClick={() => gotolinks('signup')}><Icon icon='user' size={19} color="black" /><p>Sign Up</p></div>
                                </>



                        }
                    </div>


                </div>
                : <>
                    <div className={styles.footer}>
                        <Grid >
                            <Grid.Row>
                                <Grid.Column mobile={12} tablet={5} computer={5}>
                                    <h2>URENT</h2>
                                    <p style={{width:"80%"}}>
                                        {t(`Footer-urent`)}
                                        </p>
                                </Grid.Column>
                                <Grid.Column mobile={12} tablet={3} computer={3}>
                                    <h2>{t(`Download App`)}</h2>
                                    <ul className={styles.partners}>
                                        <li className="store_button" style={{marginBottom : "10px"}}>
                                            <button style={{ backgroundImage: `url(${'/google.svg'})`, backgroundPosition: "center" }} className="btn_google" type="button" name="button" title="Download Urent APP on Google Play Store" onClick={gotoStore('google')}></button>
                                        </li>
                                        <li className="store_button"  style={{marginBottom : "10px"}}>
                                            <button style={{ backgroundImage: `url(${'/apple.svg'})`, backgroundPosition: "center" }} className="btn_apple" type="button" name="button" title="Download Urent APP on APP Store" onClick={gotoStore('apple')}></button>
                                        </li>
                                        <li className="store_button"  style={{marginBottom : "10px"}}>
                                            <button style={{ backgroundImage: `url(${'/appGallary.svg'})`, backgroundPosition: "center"}} className="btn_apple" type="button" name="button" title="Download Urent APP on APP Store" onClick={gotoStore('huawei')}></button>
                                        </li>
                                    </ul>
                                </Grid.Column>
                                <Grid.Column mobile={12} tablet={8} computer={8}>
                                    <Grid columns="three">
                                        <Grid.Row>
                                            <Grid.Column className={styles.footerLinks}>
                                                <h2>{t('INFORMATION')}</h2>
                                                <Link href='/about' >{t(`About Us`)}</Link>
                                                <Link href='/blogs' >{t(`Blogs`)}</Link>
                                                <Link href='/faq' >{t(`FAQs`)}</Link>
                                                <Link href='/contact-us' >{t(`Contact Us`)}</Link>
                                                <Link href="/privacy-policy">{t(`Privacy Policy`)}</Link>
                                                <Link href='/how-it-works' >{t(`How it works`)}</Link>
                                                <Link href='/terms-conditions' >{t(`Terms & Conditions`)}</Link>
                                                <Link href='/cancellation-policy' >{t(`Cancellation Policy`)}</Link>
                                            </Grid.Column>
                                            <Grid.Column className={styles.footerLinks}>
                                                <h2>{t('CATEGORIES')}</h2>
                                                <Link href='/rent-a-car' >{t("Rent a Car")}</Link>
                                                <Link href='/rent-a-yacht' >{t("Rent a Yacht")}</Link>
                                                {/* <Link href='/car-leasing' >{t("Car Leasing")}</Link> */}
                                                <Link href='/rent-a-motorcycle' >{t("Rent a Motorcycle")}</Link>
                                                <Link href='/desert-activities' >{t("Desert Activities")}</Link>
                                                <Link href='/chauffeur-services' >{t("Chauffeur services")}</Link>
                                                <Link href='/water-activities' >{t("Water Activities")}</Link>
                                                <Link href='/scooter' >{t("Scooters")}</Link>
                                               
                                            </Grid.Column>
                                            <Grid.Column className={styles.footerLinks}>
                                                <h2>{t("LOCATION")}</h2>
                                                <Link href='/rent-a-car-dubai' >{t("Rent a Car in Dubai")}</Link>
                                                <Link href='/rent-a-car-ajman' >{t("Rent a Car in Ajman")}</Link>
                                                <Link href='/rent-a-car-alain' >{t("Rent a Car in Al Ain")}</Link>
                                                <Link href='/rent-a-car-fujairah' >{t("Rent a Car in Fujairah")}</Link>
                                                <Link href='/rent-a-car-sharjah' >{t("Rent a Car in Sharjah")}</Link>
                                                <Link href='/rent-a-car-ras-al-khaimah' >{t("Rent a Car in Ras Al Khaimah")}</Link>
                                                <Link href='/rent-a-car-abu-dhabi' >{t("Rent a Car in Abu Dhabi")}</Link>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>

                    <div className={styles.subfooter}>
                        <h3>{t("Copyright © 2023 | All Rights Reserved")}</h3>
                       
                         <div className={styles.followus}>
                            <span style={{alignSelf:"center",cursor:'unset'}} className={styles.footerImageCard}><img src="/assets/footer/visa.svg" alt='visa-card' width="70px" /></span>
                            <span>{t("Followus:")}</span>
                            <a href="https://www.facebook.com/URENTUAE/"> <i className="facebook icon" style={{ fontSize: "35px" }}></i>  </a>
                            <a href="https://twitter.com/urentapp"> <i className="twitter icon" style={{ fontSize: "35px" }}></i> </a>
                            <a href="https://www.instagram.com/urent/"> <i className="instagram icon" style={{ fontSize: "35px" }}></i> </a>
                        </div>
                    </div>
                </>}
        </>
    )
}
