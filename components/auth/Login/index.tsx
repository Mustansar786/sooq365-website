import React from 'react'
import { AUTH_LOGIN } from 'graphql/mutation';
import { useMutation } from '@apollo/client';
import { ValidateLogin } from 'utils/validator';
import { IValidateLoginReturn } from 'utils/validator.types';

import { setUserToken, getLocationBeforeLogin } from 'utils/lib';
import { useDispatch } from 'react-redux';
import * as types from 'redux/action/type/user';
import { useRouter } from 'next/router';
import { notification } from 'utils/notification';
import SocialLogin from '../SocialLogin';
import Link from 'next/link';
import { fetch_fcmToken } from 'services/firebase';
import { ReactCheckBox, ReactLoader } from 'components';
import { useTranslation } from 'react-i18next';
import { analytic_for_initial_Setup } from 'utils/seo_functions';
import { Input, Icon } from 'semantic-ui-react';
import { LoginWebEngage,UserCustomAttributesWebEngage ,UserCustomAttributesWebEngageHash} from "components/Webengage";
import { activeSignupScreen } from 'utils/lib';
//import Icon from "../../../utils.js/icon";
import { isMobile } from 'react-device-detect';


const ERRORS = {
    success: false,
    errorEmail: '',
    errorPassword: ''
}

export interface ILogin {
    closeAuthModal?: () => void
}
export default function Login({ closeAuthModal }: ILogin) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();

    const [state, setstate] = React.useState({ email: "", password: "", error: ERRORS });
    const [isloading, setisloading] = React.useState(false);
    const [focused, setfocused] = React.useState(false);
    const [togglePassword, setTogglePassword] = React.useState(false)
    const [rememberMeCheckbox, setrememberMeCheckbox] = React.useState(false)

    const REMEBERME_CHECKBOX_LABEL = (
        <span>
            {t('Remember Me')}
        </span>
    );

    // ----------------------------------------------------QUERIES----------------------------------------------------

    const [authLogin] = useMutation(AUTH_LOGIN, {
        onError: (err) => {
            notification('danger', 'Login Error', err?.message,);
            setisloading(false);
        },
        onCompleted: async (data) => {
            // console.log(data,"checkdata ==========")
            analytic_for_initial_Setup(window, "login");
            const user={
                first_name: data?.login.user.profile.first_name,
                last_name: data?.login.user.profile.last_name,
                userType: data?.login.user.userType,
                email: data?.login.user.email,
                userid: data?.login.user.id,
                international_license: data?.login?.user?.profile?.international_license,
                phone: data?.login.user.phone,
                profile: data?.login.user.profile,
                status: data?.login.user.status,
                verifiedEmail: data?.login.user.verifiedEmail,
                verified_phone: data?.login.user.verified_phone,
                selfie_image: data?.login.user.profile.selfie_image,
                documents: {
                    goverment: data?.login.user.documents.goverment,
                    licens: data?.login.user.documents.licens
                }
            }
            //*********************** Analytics *************** */
            UserCustomAttributesWebEngage('Email',user.email)
            UserCustomAttributesWebEngageHash('we_hashed_email', user.email)
            UserCustomAttributesWebEngage("we_first_name",user.first_name)
            UserCustomAttributesWebEngage("we_last_name",user.last_name)
            UserCustomAttributesWebEngage("Phone",user.phone)
            UserCustomAttributesWebEngageHash('we_hashed_phone', user.phone)

            LoginWebEngage(user.email)
            // console.log(data?.login.user,"data?.login.user")
            //************************ End *************/
            dispatch({
                type: types.SET_USER_DETAIL,
                payload: {
                    user:user
                }
            });
            setUserToken(data.login.token);
            setisloading(false);
            if (!data?.login.user.verifiedEmail) {
                // closeAuthModal();
                if (closeAuthModal) {
                    closeAuthModal();
                }
                router.push('/')
                // dispatch(openEmailVerificationModal(true, true));
            }
            else if((data?.login.user.documents.goverment === "NO_DOCUMENTS" && data?.login.user.documents.licens === "NO_DOCUMENTS")){
                // closeAuthModal();
                if (closeAuthModal) {
                    closeAuthModal();
                }
                router.push('/')
                // dispatch(openEmailVerificationModal(true, true));
            } 
            else {
                const ifLocationSave = await getLocationBeforeLogin();
                if (ifLocationSave !== null) {
                    router.push(`/vehicles/${ifLocationSave}`);
                }
                else if (router.pathname.includes('signin') || router.pathname.includes('signup')) {
                    router.push('/');
                }
                if (closeAuthModal) {
                    closeAuthModal();
                }
            }
        }

    });

    // ----------------------------------------------------QUERIES----------------------------------------------------



    const login = async () => {
        setisloading(true);
        const resultedValidation: IValidateLoginReturn = ValidateLogin({ email: state.email, password: state.password });
        if (!resultedValidation.success) {
            setstate({ ...state, error: resultedValidation });
            setisloading(false);
            return false;
        }
        setstate({ ...state, error: ERRORS });
        const fcm_Token = await fetch_fcmToken();
        if (fcm_Token) {
            authLogin({ variables: { email: state.email, password: state.password, fcmToken: fcm_Token } });
        } else {
            authLogin({ variables: { email: state.email, password: state.password, fcmToken: "fcm_" + new Date().toISOString() } });
        }
    }

    const onChange = (e: any) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }
    const onKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            login();
        }
    }

    const onFocus = (e: any) => {
        if (!focused && e.target.autocomplete) {
            setstate({ ...state, [e.target.name]: '' })
            setfocused(true);
        }
    }

    const formatInput = (e: any) => {
        setstate({ ...state, [e.target.name]: e.target.value.trim() })
    }

    const signUpClick = () => {
        activeSignupScreen();
    }

    return (
        <>
            <div className={`${'form-container'} ${'sign-in-container'}`}>
                <form>
                    <h1>{t('Login')}</h1>
                    <SocialLogin closeAuthModal={closeAuthModal} />
                    <span className="line-breaker">
                        <div className="line" />
                        <div className="line-breaker-text">{t("or Sign in with Email")}</div>
                        <div className="line" />
                    </span>
                    <span className="input-wrapper">
                        <span className="label">{t("Email or Phone Number")}*</span>
                        <input type="text" placeholder={t("Email or Phone Number")} onChange={onChange} onKeyDown={onKeyDown} name="email" value={state.email} onFocus={onFocus} autoComplete="off" onBlur={formatInput} />
                        <span className="error">{t(state.error?.errorEmail)}</span>
                    </span>

                    <span className="input-wrapper">
                        <span className="label">{t("Password")}*</span>
                        <Input
                            style={{ width: "100%" }}
                            name='password'
                            onKeyDown={onKeyDown}
                            icon={<Icon name={!togglePassword ? 'eye' : "eye slash"} color={!togglePassword ? "grey" : "black"} link onClick={() => setTogglePassword(!togglePassword)} />}
                            placeholder={t('Your Password')}
                            onChange={onChange}
                            type={!togglePassword ? "password" : "text"}
                            autoComplete="new-password"
                        />
                        {/* <input type={!togglePassword ? "password" : "text"} placeholder={t("Password")} onChange={onChange} onKeyDown={onKeyDown} name="password" value={state.password} onFocus={onFocus} autoComplete="off"/>
                        <Icon icon='eye' size={18} onClick={()=>setTogglePassword(!togglePassword )} color={!togglePassword ? "grey":"#33302f"}/> */}
                        <span className="error">{t(state.error?.errorPassword)}</span>
                    </span>
                    <div className="sub-section">
                        <div style={{ width: "100%" }}>
                            <ReactCheckBox
                                id="html"
                                value={rememberMeCheckbox}
                                onChange={() => setrememberMeCheckbox(!rememberMeCheckbox)}
                                label={REMEBERME_CHECKBOX_LABEL}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <Link href="/forgot-password">
                                <a className="forgot_password">{t("Forgot password?")}</a>
                            </Link>
                        </div>
                    </div>

                    {
                        isloading ?
                            <ReactLoader loading={isloading} /> :
                            <button type="button" onClick={login}>{t('Login')}</button>
                    }
                   {!isMobile && <p style={{ textAlign: "left" }}>{t("Not registered?")} {" "}
                        <span id="signUp" onClick={signUpClick} style={{ fontSize: "18px", fontWeight: "bold", cursor: "pointer", color: "#56C3C5" }}>{t("Sign me up!")}</span>
                    </p>}

                    {
                        router.pathname.includes('signin') ?
                            <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }}>
                                <span>{t("Not registered?")}</span> {" "}
                                <Link href="/signup">
                                    <a className="dont_have_account">{t("Sign me up!")}</a>
                                </Link>
                            </div>
                            :
                            null

                    }
                </form>
            </div>
        </>
    );
}

