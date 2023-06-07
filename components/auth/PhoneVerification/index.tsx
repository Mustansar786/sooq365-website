import ReactOTP from 'components/ReactOTP'
import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import { useDispatch } from 'react-redux';
import * as types from 'redux/action/type/user'
import { useSelector } from 'react-redux';
import { RootStateI } from 'redux/reducer';
import { RESEND_SMS,CHANGE_PHONE_CONFIRM,
    // CHANGE_NUMBER,
    VERIFY_OTP, VERIFY_EMAIL_MUTATION } from 'graphql/mutation';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router'
import { notification } from 'utils/notification';
import {useTranslation} from 'react-i18next';


type PhoneVerificationI = {
    openModalPhoneVerification: (id: any) => void,
    onSkip?:() => void
}
export default React.memo(function PhoneVerification({ openModalPhoneVerification, onSkip}: PhoneVerificationI) {
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const userSelector = useSelector((state: RootStateI) => state.user);
    const router = useRouter()

    // const [hash, setHash] = useState("")
    // ----------------------------------------------------QUERIES----------------------------------------------------
    const [resendCode] = useMutation(RESEND_SMS, {
        onCompleted: data => {
            notification('success',"OTP Code!", data.resendSMS);
        },
        onError: err => {
            notification('danger',"Error", err.message);
        }
    });

    // const [ChangeNumber] = useMutation(CHANGE_NUMBER, {
    //     onCompleted:data=>{
    //         setHash(data.changeNumber)
    //     }

    // })

    const [verifyOTP] = useMutation(CHANGE_PHONE_CONFIRM, {
        onCompleted: () => {
            notification('success',"Verification", 'Your phone is verified');
            openModalPhoneVerification(false)
            // myProfile();
        },
        onError: err => {
            notification('danger',"Error", err.message);
        }
    });

    const [verifyOTPRegister] = useMutation(VERIFY_OTP, {
        onCompleted: () => {
            openModalPhoneVerification(false);
            notification('success',"Verification", 'Your phone is verified');
            // router.push('/upload-docs')
            emailVerification();
            // dispatch(openEmailVerificationModal(true, false))
        },
        onError: err => {
            notification('danger',"Error", err.message);
        }
    });

    const [emailVerification] = useMutation(VERIFY_EMAIL_MUTATION, {
        onCompleted: () => {
            notification('success', t("Email Sent!"), t("Please check your inbox"))
            // dispatch(openEmailVerificationModal(true, false))
        },
        onError: () => {
            notification('danger', t("Email not Sent!"), t("Something went wrong, Try again"));
        }
    });
    // ----------------------------------------------------QUERIES----------------------------------------------------

    const [state, setstate] = useState({
        otp: "",
        timeLeft: 60
    });

    // useEffect(() => {
    //   router.pathname !== "/" &&  setTimeout(() => {
    //         ChangeNumber({
    //             variables: {
    //                 phone: userSelector.user.phone,
    //             }
    //         })
    //     }, 2000);

    //     return(()=>{
    //         setHash("")
    //     })
    // }, [])
    

    useEffect(() => {
        dispatch({
            type: types.CLOSE_PHONE_MODAL__
        })

    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setstate(prevState => {
                return {
                    ...prevState,
                    timeLeft: prevState.timeLeft > 0 ? prevState.timeLeft - 1 : 0
                }
            })
        }, 1000);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])


    const onChangeOTP = (val: any) => {
        setstate({ ...state, otp: val })
    }

    const resend = () => {
        setstate({ ...state, timeLeft: 60 });
        resendCode({
            variables: {
                phone: userSelector.user.phone,
                resetType: `confirm_code`
            }
        })
    }

    const verifiyCode = async () => {
        router.pathname === "/" ?
        verifyOTPRegister({
            variables : {
                phone:userSelector.user.phone,
                code: state.otp
            }
        }) :
        verifyOTP({
            variables: {
                phone:userSelector.user.phone,
                code: state.otp,
                // token:hash
            }
        }) 
    }
    
    return (
        <div id="phone_verification">
            {/* <div className="close-icon" onClick={() => openModalPhoneVerification(false)}>
                <Icon name='close' />
            </div> */}
            <div id="dialog">
                <h3>{t("Please enter the 5-digit verification code we sent via SMS:")}</h3>
                <h4 style={{margin:0}}>{userSelector.user.phone}</h4>
                <span>({t(`we want to make sure it's you`)})</span>
                <div id="form">
                    <ReactOTP otp={state.otp} onChange={onChangeOTP} numInputs={5} separator={<div>-</div>} />
                    <div style={{display:'flex'}}>
                        <button className="btn btn-primary btn-embossed" onClick={verifiyCode} style={{marginRight:2.5}}>{t("Verify")}</button>
                        <button className="btn btn-primary btn-embossed" onClick={onSkip} style={{marginLeft:2.5}}>{t('Cancel')}</button>
                    </div>
                </div>
                <div style={{ marginBottom: "1rem" }}>{t('Code will expire in')} : {state.timeLeft}</div>
                <div>
                    {t(`Didn't receive the code?`)}<br />
                    <a onClick={resend} className={styles.resend}>{t('Send code again')}</a><br />
                </div>
            </div>
        </div>
    )
})
