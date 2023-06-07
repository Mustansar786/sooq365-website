import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useState, useEffect } from 'react';
import { store, persistor } from 'store';
import { PersistGate } from 'redux-persist/integration/react'
import client from 'graphql/apollo-client'
import { ApolloProvider } from "@apollo/client";
import { Provider } from 'react-redux';
import { config } from '@fortawesome/fontawesome-svg-core'
import Head from 'next/head';
import favicon from 'public/logo.png'
import { ReactToast, ReactLoader, SmartAppBanner } from 'components';
import { AWS_SERVICE_WORKER } from 'utils/lib';
import Script from 'next/script'
import { customEncryption } from "utils/helper";
import 'components/auth/login_signup.css'; // this is custom style for popup signin and signup
import 'pages/signin/signin_signup_page.css'; // this is custom style for  signin and signup page
import 'react-notifications-component/dist/theme.css';
import 'react-phone-input-2/lib/style.css';
import "animate.css" //animation
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'semantic-ui-css/semantic.min.css';
import 'components/ReactMap/marker.css';
import 'components/Header/daterangepicker.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import localforage from 'localforage';

import "src/i18n";
import i18n from 'src/i18n';

import CookieConsent from "react-cookie-consent";
import Link from 'next/link';
import { useRouter, } from 'next/router';
import './style.css';
config.autoAddCss = false



function MyApp({ Component, pageProps }: AppProps) {
  const [device, setDevice] = useState<any>()
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setloading] = useState(true);
  const [bannerCookie, setBannerCookie] = useState<any>(true)
  const [loadMobile, setLoadMobile] = useState(false)
  const router:any = useRouter();
  const newState =store.getState();

  useEffect(()=>{
   const currentUser:any=newState?.user?.user||{};
   const findRout=currentUser?.allowRoutes?.includes(customEncryption(router.pathname))
   if(currentUser.isAdmin&&findRout){
   
   }
  
   else if(!currentUser.isAdmin)
   return
   else if(router.pathname==="/404"){
    if(router.pathname!=="/404")
   router.push("/404")
  }
   else{
     if(router.pathname!=="/notAuthorize")
    router.push("/notAuthorize")
   }
  },[newState.user,router])

  useEffect(() => {   
    const handleStart = (url: string) => {
      if(url!=="/vehicles"&&router.pathname!=="/[location_slug]")
      setloading(true)
     
    }

    const handleStop = () => {
      setloading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

 
  useEffect(() => {
    setDevice(require("current-device").default);
  }, [])

  useEffect(() => {
    const { load } = router.query

    load === 'mobile' ? setLoadMobile(true) : setLoadMobile(false)

  }, [router.query])

  useEffect(() => {
    if (device)
      (device != undefined) && setIsMobile(device.mobile() || device.ipad())
  }, [device])

  React.useEffect(() => {
    if(router.pathname==="/")
    AWS_SERVICE_WORKER();
  }, []);

  React.useEffect(() => {
    setuseragent_local()
    localforage.getItem("smart-app-banner").then(function (value) {
      value === false && setBannerCookie(value)
      return value;
    });
  }, [])

  React.useEffect(() => {
    i18n.changeLanguage(router.locale);
  }, [])

  const setuseragent_local = async () => {
    localforage.setItem("user-agent", navigator.userAgent, function () {
      setloading(false);
    });
  }
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_KEY}`}
          height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}

           {/* script  */}
           {/* this script is use webengage analytic  */}
           <Script
    id='_webengage_script_tag'
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
    var webengage;!function(w,e,b,n,g){function o(e,t){e[t[t.length-1]]=function(){r.__queue.push([t.join("."),
    arguments])}}var i,s,r=w[b],z=" ",l="init options track screen onReady".split(z),a="feedback survey notification".split(z),c="options render clear abort".split(z),p="Open Close Submit Complete View Click".split(z),u="identify login logout setAttribute".split(z);if(!r||!r.__v){for(w[b]=r={__queue:[],__v:"6.0",user:{}},i=0;i < l.length;i++)o(r,[l[i]]);for(i=0;i < a.length;i++){for(r[a[i]]={},s=0;s < c.length;s++)o(r[a[i]],[a[i],c[s]]);for(s=0;s < p.length;s++)o(r[a[i]],[a[i],"on"+p[s]])}for(i=0;i < u.length;i++)o(r.user,["user",u[i]]);setTimeout(function(){var f=e.createElement("script"),d=e.getElementById("_webengage_script_tag");f.type="text/javascript",f.async=!0,f.src=("https:"==e.location.protocol?"https://widgets.in.webengage.com":"http://widgets.in.webengage.com")+"/js/webengage-min-v-6.0.js",d.parentNode.insertBefore(f,d)})}}(window,document,"webengage");webengage.init("${process.env.webEngage_licence_id}");
  `,
  }}
/>
           {/* end script */}
        {
          process.browser ?
            <PersistGate persistor={persistor}>
              {!loadMobile && <CookieConsent location="top" cookieName="myAwesomeCookieName3"
                overlay
                expires={999} buttonText='Accept & Close'
                buttonStyle={{
                  background: "teal",
                  color: "white",
                  fontWeight: "600",
                }}
                style={{
                  background: "black",
                  color: "white",
                  fontSize: "13px",
                  position: "unset",

                }}>
                <span style={{ color: "whitesmoke", fontFamily: "bpoppins" }}>Urent&apos; use of cookies.</span><span style={{ color: "rgb(255, 255, 255)", fontWeight: "lighter" }}> We  use cookies to personalise your experience , and by using the site you are consenting to this .</span> <Link href='/privacy-policy' ><a style={{ color: "rgb(86, 195, 197)", textDecoration: "underline" }} target='_blank'> Find out more about cookies.</a></Link>
              </CookieConsent>}
              <Head>
                <link rel="shortcut icon" href={favicon.src} />
              </Head>
              {/* {isMobile && bannerCookie && !loadMobile && <SmartAppBanner />} */}

              <ReactToast />
              <div id="snackbar"></div> {/* for copy to clipboard notification */}
              {loading ? <ReactLoader loading={loading}></ReactLoader> :
               <Component {...pageProps} i18n={i18n} isMobile={isMobile} />
               }
            </PersistGate>
            :
            <>
              {!loadMobile && <CookieConsent location="top" cookieName="myAwesomeCookieName3"
                overlay
                expires={999} buttonText='Accept & Close'
                buttonStyle={{
                  background: "teal",
                  color: "white",
                  fontWeight: "600",
                }}
                style={{
                  background: "black",
                  color: "white",
                  fontSize: "13px",
                  position: "unset",

                }}>
                <span style={{ color: "whitesmoke", fontFamily: "bpoppins" }}>Urent&apos; use of cookies.</span><span style={{ color: "rgb(255, 255, 255)", fontWeight: "lighter" }}> We  use cookies to personalise your experience , and by using the site you are consenting to this .</span> <Link href='/privacy-policy' ><a style={{ color: "rgb(86, 195, 197)", textDecoration: "underline" }} target='_blank'> Find out more about cookies.</a></Link>
              </CookieConsent>}
              <Head>
                <link rel="shortcut icon" href={favicon.src} />
              </Head>
              {/* {isMobile && bannerCookie && !loadMobile && <SmartAppBanner />} */}

              <ReactToast />
              <div id="snackbar"></div> {/* for copy to clipboard notification */}
              <Component {...pageProps} i18n={i18n} isMobile={isMobile} />
             
            </>

        }
      </Provider>
    </ApolloProvider>
  )
}

export default MyApp
