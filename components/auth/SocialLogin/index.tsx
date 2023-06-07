import React, { useState } from 'react';
// import { Icon } from 'semantic-ui-react';
import { SocialButton } from "components";
import { activeSignupScreen,setUserToken } from 'utils/lib';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { AUTH_FACEBOOK_LOGIN, AUTH_GOOGLE_LOGIN } from 'graphql/mutation';
import * as types from 'redux/action/type/user';
import { fetch_fcmToken } from 'services/firebase';
import { useRouter } from 'next/router';
import Icon from "../../../utils.js/icon";
import Image from 'next/image';
import { notification } from "utils/notification";
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';

export interface IFacebookUser {
    firstName:string,
    lastName:string,
    email:string
}
export default function SocialLogin({closeAuthModal}:any) {
    const {t} = useTranslation()
    const [state, setstate] = useState<IFacebookUser>({ firstName: "", lastName: "", email: "" })
    const dispatch = useDispatch();
    const router   = useRouter();
   
const [authFacebookLogin] = useMutation(AUTH_FACEBOOK_LOGIN, {
        onError: () => {
            activeSignupScreen();
            if(isMobile){
                router.push('/signup')
            }
            dispatch({
                type:types.FACEBOOK_USER,
                payload:{
                    facebookUser:state
                }
            })
        },
        onCompleted: (data) => {
            // console.log(data?.authFacebook.user,"data?.authFacebook.userdata?.authFacebook.user")
            const user= {
                first_name: data?.authFacebook.user.profile.first_name,
                last_name: data?.authFacebook.user.profile.last_name,
                userType: data?.authFacebook.user.userType,
                email:data?.authFacebook.user.email,
                userid: data?.authFacebook.user.id,
                international_license: data?.authFacebook?.user?.profile?.international_license,
                phone: data?.authFacebook.user.phone,
                profile: data?.authFacebook.user.profile,
                status: data?.authFacebook.user.status,
                verifiedEmail: data?.authFacebook.user.verifiedEmail,
                verified_phone: data?.authFacebook.user.verified_phone,
                selfie_image: data?.authFacebook.user.profile.selfie_image,
                vehicle_limit:data?.authFacebook.user.vehicle_limit,
                documents: {
                    goverment: data?.authFacebook.user.documents.goverment,
                    licens: data?.authFacebook.user.documents.licens
                }
            }
            dispatch({
                type: types.SET_USER_DETAIL,
                payload: {
                    user: user
                }
            });
            setUserToken(data.authFacebook.token);
            if (!data?.authFacebook.user.verifiedEmail) {
            //     router.push('/email-verification')
                // router.push('/email-verification')
                if(closeAuthModal){
                    closeAuthModal();
                } 
                // dispatch(openEmailVerificationModal(true, true));
                router.push('/');
            }
            else if((data?.authFacebook?.user?.documents.goverment === "NO_DOCUMENTS" && data?.authFacebook?.user?.documents.licens === "NO_DOCUMENTS") ||
        (data?.authFacebook?.user?.documents.goverment === "RESUBMIT_DOCUMENTS_REQUIRED" && data?.authFacebook?.user?.documents.licens === "RESUBMIT_DOCUMENTS_REQUIRED")){
            if(closeAuthModal){
                closeAuthModal();
            } 
            // dispatch(openEmailVerificationModal(true, true));
            router.push('/');
        }  else {
                if (router.pathname.includes('signin') || router.pathname.includes('signup')) {
                    router.push('/');
                }
                else if(closeAuthModal){
                    closeAuthModal();
                }
            }

        }

    });

    const [authGoogleLogin] = useMutation(AUTH_GOOGLE_LOGIN, {
        onError: (error) => {
            if(error.graphQLErrors[0].message == 'User not found'){
                activeSignupScreen();
                if(isMobile){
                    router.push('/signup')
                }
                dispatch({
                    type:types.FACEBOOK_USER,
                    payload:{
                        facebookUser:state
                    }
                })
            }else{
                notification('danger', 'Login Error', error?.message,);
            }    
        },
        onCompleted: (data) => {

            // console.log(data,"checking data in google login")
            const user = {
                first_name: data?.authGoogle.user.profile.first_name,
                last_name: data?.authGoogle.user.profile.last_name,
                userType: data?.authGoogle.user.userType,
                email:data?.authGoogle.user.email,
                userid: data?.authGoogle.user.id,
                international_license: data?.authGoogle?.user?.profile?.international_license,
                phone: data?.authGoogle.user.phone,
                profile: data?.authGoogle.user.profile,
                status: data?.authGoogle.user.status,
                verifiedEmail: data?.authGoogle.user.verifiedEmail,
                verified_phone: data?.authGoogle.user.verified_phone,
                selfie_image: data?.authGoogle.user.profile.selfie_image,
                vehicle_limit:data?.authGoogle.user.vehicle_limit,
                documents: {
                    goverment: data?.authGoogle.user.documents.goverment,
                    licens: data?.authGoogle.user.documents.licens
                },
            }

            dispatch({
                type: types.SET_USER_DETAIL,
                payload: {
                    user: user
                }
            });
            // console.log(data?.authGoogle.user,"data?.authGoogle.user")
            setUserToken(data.authGoogle.token);
            if (!data?.authGoogle.user.verifiedEmail) {
                // router.push('/email-verification')
                if(closeAuthModal){
                    closeAuthModal();
                } 
                // dispatch(openEmailVerificationModal(true, true));
                router.push('/');
            }
            else if((data?.authGoogle?.user?.documents.goverment === "NO_DOCUMENTS" && data?.authGoogle?.user?.documents.licens === "NO_DOCUMENTS") ||
        (data?.authGoogle?.user?.documents.goverment === "RESUBMIT_DOCUMENTS_REQUIRED" && data?.authGoogle?.user?.documents.licens === "RESUBMIT_DOCUMENTS_REQUIRED")){
            if(closeAuthModal){
                closeAuthModal();
            } 
            // dispatch(openEmailVerificationModal(true, true));
            router.push('/');
        } 
        else {
                if (router.pathname.includes('signin') || router.pathname.includes('signup')) {
                    router.push('/');
                }
                else if(closeAuthModal){
                    closeAuthModal();
                }    
            }

        }

    });


    const handleFacebookSocialLogin = async ({_profile, _token: { accessToken } }: any) => {
        setstate({...state, firstName:_profile.firstName, lastName:_profile.lastName, email:_profile.email})
        const fcm_token = await fetch_fcmToken();
        if(fcm_token){
            authFacebookLogin({
                variables: {
                    fcm_token,
                    accessToken: accessToken,
                }
            })
        }else {
            const fcm_token = "fcm_"+new Date().toISOString()
            authFacebookLogin({
                variables: {
                    fcm_token,
                    accessToken: accessToken,
                }
            })
        }
        
    };

    // const handleFacebookSocialLoginFailure = (err:any) => {
    //     console.log(err, "===er")
    // };

    const handleGoogleSocialLogin = async ({_profile, _token: { accessToken } }: any) => {
        setstate({...state, firstName:_profile.firstName, lastName:_profile.lastName, email:_profile.email})
        const fcm_token = await fetch_fcmToken();
        if (fcm_token) {
            authGoogleLogin({
                variables: {
                    fcm_token,
                    accessToken: accessToken,
                }
            })
        } else {
            const fcm_token = "fcm_"+new Date().toISOString()
            authGoogleLogin({
                variables: {
                    fcm_token,
                    accessToken: accessToken,
                }
            })
        }

    };

    const handleSocialLoginFailure = () => {
        return;
    }

    // const handleGoogleSocialLoginFailure = () => {
    // };

    // const handleGoogleSocialLoginLogout =()=>{
    // }

 
    return (
        <div className={'social-container'}>
            <div >
                <SocialButton
                    provider="google"
                    appId={process.env.REACT_APP_GG_APP_ID || ''}
                    onLoginSuccess={handleGoogleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                    className="social"
                    style={{display:"flex", alignItems: "center"}}
                >
                    <a href="javascript:;"><Image src="/assets/icons/google.png" width={20} height={20}/></a>
                    <span className="text" style={{textTransform : "none"}}>{t('Sign in with Google')}</span>
                </SocialButton>
                
              
            </div>
            <div>
                <SocialButton
                    provider="facebook"
                    appId={process.env.REACT_APP_FB_APP_ID||''}
                    onLoginSuccess={handleFacebookSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                    className="social"
                    style={{display:"contents"}}
                >
                    {/* <Icon name='facebook f' style={{color:"black", cursor:"pointer"}} /> */}
                    <Icon icon="facebook-logo-button" color="#395794" size="22" style={{cursor:'pointer',}}/>
                    <span className="text" style={{textTransform : "none"}}>{t('Sign in with Facebook')}</span>
                </SocialButton> 
              
            </div> 
        </div>
    )
}
