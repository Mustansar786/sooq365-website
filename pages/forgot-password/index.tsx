import React, { useState } from 'react'
import { Button } from 'semantic-ui-react';
import styles from './forgotpassword.module.css';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD_BY_EMAIL, RESET_PASSWORD_BY_SMS, VERIFICATION_CODE,RESEND_SMS } from 'graphql/mutation';
import { useRouter } from 'next/router';
import { notification } from 'utils/notification';
import { Input } from 'semantic-ui-react';
import cx from 'classnames';
import { ReactPhone, SEO } from 'components';
import { IValidateEmail, IValidatePhone } from 'utils/validator.types';
import { validateEmail, validatePhone } from 'utils/validator';
import ForgotPasswordComponent from 'components/forgot-password';
import { getUserToken } from 'utils/lib';
import { useQuery } from '@apollo/client';
import { GET_RESIDING_COUNTRIES_QUERY } from 'graphql/query';
import {useTranslation} from 'react-i18next';


const secondsToTime=(secs:any)=> {
    const hours = Math.floor(secs / (60 * 60));

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    const obj = {
        'h': hours,
        'm': minutes,
        's': seconds
    };
    return obj;
}

function ForgotPassword() {
    const {t} = useTranslation();
    const [enableButton, setEnableButton] = useState({ enableEmail: true, enableSMS: false });
    const [state, setState] = useState({ email: "", errorEmail: "", phone: "+971", errorPhone: "" });
    const [verifyInputCode, setVerifyInputCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [screens, setScreens] = useState({ verifyScreen: false, resetPasswordScreen: false });
    const [auth, setAuth] = useState(false)
    const [onlyCountries,setOnlyCountries]= useState([])
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false)
    const [device, setDevice] = useState<any>()
    const [timer,setTimer]=useState(60)//60 secounds
    const isDisableResend= timer>0&&screens.verifyScreen;
    React.useEffect(() => { 
        (device != undefined) && setIsMobile(device?.mobile() || device?.ipad())
    }, [device])
    React.useEffect(() => {  
        setDevice(require("current-device").default);
    }, [])
     
    const timerStep = () => setTimer(timer - 1);

    React.useEffect(
        () => {
            if (!isDisableResend) {
                return;
            }
            const id = setInterval(timerStep, 1000);
            return () => clearInterval(id);
        },
        [timer,screens.verifyScreen]
    );
    
    // ----------------------------------------------------QUERIES----------------------------------------------------
    const [resetBySMS] = useMutation(RESET_PASSWORD_BY_SMS, {
        onCompleted: (data) => {
            setLoading(false)
            setScreens({ ...screens, verifyScreen: true })
            notification('success', t('Successful!'), data.restPassword)
        },
        onError: (error) => {
            setLoading(false)
            notification('danger', t("Failed"), error?.message ? error.message : t("Something went wrong, Try again"));
        }
    });
    const [resetByEmail] = useMutation(RESET_PASSWORD_BY_EMAIL, {
        onCompleted: (data) => {
            setLoading(false)
            setScreens({ ...screens, verifyScreen: true })
            notification('success', t('Successful!'), data.restPasswordByEmail)
            setTimer(60)
        },
        onError: (error) => {
            setLoading(false)
            notification('danger', t("Failed"), error?.message ? error.message : t("Something went wrong, Try again"));
        }
    });

    const [verificatioCode] = useMutation(VERIFICATION_CODE, {
        onCompleted: () => {
            setLoading(false)
            setScreens({ ...screens, verifyScreen: false, resetPasswordScreen: true })
            notification('success', t('Successful!'), t("Your code verified"))
        },
        onError: (error) => {
            setLoading(false)
            notification('danger', t("Failed"), error?.message ? error.message : t("Something went wrong, Try again"));
        }
    });

    const [ResendSMS] = useMutation(RESEND_SMS, {
        onCompleted: (data) => {
            setLoading(false)
            setScreens({ ...screens, verifyScreen: true })
            notification('success', t('Successful!'), data.resendSMS)
            setTimer(60)
        },
        onError: (error) => {
            setLoading(false)
            notification('danger', t("Failed"), error?.message ? error.message :  t("Something went wrong, Try again"));
        }
    });
    useQuery(GET_RESIDING_COUNTRIES_QUERY, {
        onCompleted: data => {
          if (data?.countries?.length > 0) {
            const countryList = data?.countries.map((val: any) => {
              return  {code: val.country_code, id: val.id} 
            }) 
            const filterNull = countryList.filter(function (el:any) {
              return el.code != null;
            })
            setOnlyCountries(filterNull)
          }
        }
      });
    // ----------------------------------------------------QUERIES----------------------------------------------------

//---------------------------------Resend email or sms-----------------------
const onResend=()=>{
    setLoading(true)
    setState({ ...state, errorEmail: "",errorPhone:"" });
    if(enableButton.enableEmail){
    resetByEmail({
        variables: {
            email: state.email
        }
    })
}else{
    ResendSMS({
        variables: {
            phone: state.phone,
            resetType:"rest_token"
        }
    })
}
}


    React.useEffect(() => {
        const checkToken = async () => {
            const token = await getUserToken();
            if (token) {
                notification("warning", t("Warning"), t("Your are already loggedIn"))
                router.push("/");
            }else{
                setAuth(true)
            }
        }
        checkToken();
    }, []);

    const enableEmailFunc = () => {
        setEnableButton({ ...enableButton, enableEmail: true, enableSMS: false })
    }

    const enableSMSFunc = () => {
        setEnableButton({ ...enableButton, enableEmail: false, enableSMS: true })
    }

    const onChangePhone = (phone: any) => {
        setState({ ...state, phone: phone })
    }

    const onChangeEmail = (e: any) => {
        setState({ ...state, email: e.target.value })
    }


    const sendCode = () => {
        if (loading) return false;
        if (enableButton.enableEmail) {
            const resultedValidation: IValidateEmail = validateEmail(state.email);
            if (!resultedValidation.success) {
                setState({ ...state, errorEmail: resultedValidation.errorEmail });
                return false;
            } else {
                setLoading(true)
                setState({ ...state, errorEmail: "" });
                resetByEmail({
                    variables: {
                        email: state.email
                    }
                })
            }
        } else if (enableButton.enableSMS) {
            const resultedValidation: IValidatePhone = validatePhone(state.phone);
            if (!resultedValidation.success) {
                setState({ ...state, errorPhone: resultedValidation.errorPhone });
                return false;
            } else {
                setLoading(true)
                setState({ ...state, errorPhone: "" });
                resetBySMS({
                    variables: {
                        phone: state.phone
                    }
                })
            }
        }
    }

    const verifyCode = () => {
        if (loading) return false;
        setLoading(true);
        verificatioCode({
            variables: {
                phone: state.phone,
                code: verifyInputCode,
                email: state.email
            }
        })


    }

    const EMAIL_SCREEN = (
        enableButton.enableEmail ?
            <div style={{ marginTop: "2rem" }}>
                <Input loading={loading} value={state.email} onChange={onChangeEmail} iconPosition='left' action={{ content:<span style={{fontSize:isMobile?"8px":"12px"}}>{t('Send Code')}</span>, onClick: () => sendCode() }} icon='user' placeholder={t("Enter your email...")} className={styles.w100} />
                <span className="error">{t(state.errorEmail)}</span>
            </div>
            :
            null
    )

    const SMS_SCREEN = (
        enableButton.enableSMS ?
            <div style={{ marginTop: "2rem", position: "relative" }}>
                <ReactPhone inputStyle={{ width: "100%" }} phone={state.phone} onChange={onChangePhone} onlyCountries={onlyCountries}/>
                <span className="error">{t(state.errorPhone)}</span>

                <Button loading={loading} content={t("Submit")} color="teal" size="mini" style={{ position: "absolute", top: 0, right: -3, height: "2.5rem" }} onClick={sendCode} />
            </div>
            :
            null
    )

    const RESET_PASSWORD_SCREEN = (
        screens.resetPasswordScreen ?
            <ForgotPasswordComponent phone={enableButton.enableSMS ? state.phone : ""} code={verifyInputCode} email={state.email} />
            :
            screens.verifyScreen ?<>
            <div style={{paddingLeft:"10px",textAlign:"center"}}>
            <span>{t("We have sent a verification code to")} </span><span style={{fontWeight:"bold"}}>{enableButton.enableEmail?state.email:state.phone}</span>
            </div>
                <div style={{ marginTop: "2rem" }}>
                    <Input loading={loading} required value={verifyInputCode} 
                    onChange={(e: any) => setVerifyInputCode(e.target.value)} 
                    icon="question circle" iconPosition='left' 
                    //action={{ content:<span style={{fontSize:isMobile?"8px":"12px"}}>Verify Code</span>, onClick: () => verifyCode() }}
                     placeholder={t('Verification Code...' )} className={styles.w100} />
                    <span className="error">{t(state.errorEmail)}</span>
                </div>
               <div style={{marginTop:"15px",textAlign:"center"}}>
                   <Button disabled={isDisableResend} style={{background:'#56C3C5',color:"white",marginRight:"10%"}} onClick={onResend}>{t("Resend")}</Button>
                   <Button style={{background:'#56C3C5',color:"white"}} onClick={verifyCode}>{t("Submit")}</Button>
               </div>
             {isDisableResend&&  <div style={{
                       marginTop: "15px",
                       textAlign: "center",
                       color: "#a79999",
                       fontSize: "14px",
               }}>
                       {t("Resend in")+" "+secondsToTime(timer).m+":"+secondsToTime(timer).s+" "+t("Time")}
                    </div>}
                </>
                :
                <>
                    <div className={styles.arrange_buttons}>
                        <Button content={t("By Email")} color={enableButton.enableEmail ? "teal" : "grey"} size='big' className={styles.font + ' ' + 'animate__animated animate__backInLeft'} onClick={enableEmailFunc} />
                        <Button content={t("By SMS")} color={enableButton.enableSMS ? "teal" : "grey"} size='big' className={styles.font + ' ' + 'animate__animated animate__backInRight'} onClick={enableSMSFunc} />
                    </div>
                    {EMAIL_SCREEN}
                    {SMS_SCREEN}
                   
                </>
    )

    if (!auth) {
        return null
    } else {
        return (
            <div className={styles.upload}>
                <SEO title={t("Forgot Password")} />
                <div className={styles.container}>
                    <div className={cx([styles.uploadText, styles.title], 'animate__animated animate__backInDown')} style={{textAlign:'center',fontSize:isMobile?"1.5rem":"3rem"}}>{t("Forgot Password?")}</div>
                    {RESET_PASSWORD_SCREEN}
                </div>
            </div>

        )
    }

}

export default ForgotPassword