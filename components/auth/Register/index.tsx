import React, { useState,createRef } from 'react'
import { Grid } from 'semantic-ui-react'
import ReactPhone from 'components/ReactPhone';
import ReactSelect from 'components/react-select';
import ReactCheckBox from 'components/React-Checkbox';
import Link from 'next/link';
import { GET_RESIDING_COUNTRIES_QUERY, GET_CITIES_QUERY } from 'graphql/query';
import { LOCAL_SIMPLIFY_SIGNUP_MUTATION, VERIFY_EMAIL_MUTATION } from 'graphql/mutation';
import { useQuery } from '@apollo/client';
import { ValidateSignup } from 'utils/validator';
import { IValidateSignupReturn } from 'utils/validator.types';
import { activeSignInScreen } from 'utils/lib';
import { Base64 } from 'js-base64';
import { useMutation } from '@apollo/client';
import { setUserToken } from 'utils/lib';
import { useDispatch, useSelector } from 'react-redux';
import * as types from 'redux/action/type/user';
import { RootStateI } from 'redux/reducer';
import { useRouter } from 'next/router';
import { fetch_fcmToken } from 'services/firebase';
import { ReactLoader } from 'components';
import { notification } from 'utils/notification';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from "react-google-recaptcha";
import { analytic_for_initial_Setup } from 'utils/seo_functions';
import { LoginWebEngage,UserCustomAttributesWebEngage, UserCustomAttributesWebEngageHash } from 'components/Webengage';
import { isMobile } from 'react-device-detect';

const ERRORS = {
  success: false,
  errorFirstName: '',
  errorLastName: '',
  errorPhone: "",
  errorEmail: '',
  errorPassword: '',
  errorSelectedCountry: '',
  errorSelectedCity: '',
  errorAgreementCheckbox: '',
  errorCaptcha : ""
}
export default function Register({ closeAuthModal }: any) {
  const { t, i18n } = useTranslation();
  const recaptchaRef = createRef<any>();

  const dispatch = useDispatch()
  const router = useRouter();
  const [state, setstate] = useState({
    residingOptions: [],
    rentingOptions: [],
    selectedCountry: {
      label: "",
      value: "",
      code: '',
    },
    selectedCity: {
      label: "",
      value: ""
    },
    agreementCheckbox: false,
    sendUpdatesCheckbox: true,
    phone: "+971",
    phoneCountryId: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    error: ERRORS,
    captcha : ""
  });
  const [isloading, setisloading] = useState(false);
  const [isCountryLoading, setIsCountryLoading] = useState(true);
  const [isCityLoading, setIsCityLoading] = useState(true);
  const [onlyCountries, setOnlyCountries] = useState([])

  const userSelector = useSelector((state: RootStateI) => state.user);

  // ----------------------------------------------------QUERIES----------------------------------------------------
  const [simplySignup] = useMutation(LOCAL_SIMPLIFY_SIGNUP_MUTATION, {
    onCompleted: async (data) => {
      analytic_for_initial_Setup(window, "sign_up");
      //******************* Analytics ************** */
      UserCustomAttributesWebEngage('Email',state.email)
      UserCustomAttributesWebEngage("we_first_name",state.firstName)
      UserCustomAttributesWebEngage("we_last_name",state.lastName)
      UserCustomAttributesWebEngage("Phone",state.phone)
      UserCustomAttributesWebEngage("City",state.selectedCity?.label)
      UserCustomAttributesWebEngageHash('we_hashed_email', state.email)
      UserCustomAttributesWebEngageHash('we_hashed_phone', state.phone)
      
      LoginWebEngage(data?.localSimplifySignUp.user.email)
      //***************** End **************** */
      const profile = {...data?.localSimplifySignUp.user.profile, nationality: null}

      dispatch({
        type: types.SET_USER_DETAIL,
        payload: {
          user: {
            token: data?.localSimplifySignUp.token,
            first_name: data?.localSimplifySignUp.user.profile.first_name,
            last_name: data?.localSimplifySignUp.user.profile.last_name,
            email: data?.localSimplifySignUp.user.email,
            userType: data?.localSimplifySignUp.user.userType,
            userid: data?.localSimplifySignUp.user.id,
            verifiedEmail: data?.localSimplifySignUp.user.verifiedEmail,
            vehicle_limit:data?.localSimplifySignUp.user.vehicle_limit,
            verified_phone: data?.localSimplifySignUp.user.verified_phone,
            selfie_image: data?.localSimplifySignUp.user.profile.selfie_image,
            phone: state.phone,
            status: data?.localSimplifySignUp.user.status,
            profile,
            documents: {
              goverment: data?.localSimplifySignUp.user.documents.goverment,
              licens: data?.localSimplifySignUp.user.documents.licens
            },

          }
        }
      })

      const signupToken = data?.localSimplifySignUp?.token;
      if (signupToken) {
        setUserToken(signupToken);
        setisloading(false);
        if (data?.localSimplifySignUp.user.verified_phone === true && data?.localSimplifySignUp.user.verifiedEmail === false) {
          // router.push('/email-verification');
          emailVerification()
          // dispatch(openEmailVerificationModal(true, false))
        } else if (router.pathname.includes('signin') || router.pathname.includes('signup')) {
          router.push('/');
        }
        if (closeAuthModal) {
          closeAuthModal();
        }

      }

    },
    onError: (err) => {
      notification('danger', 'Registration Error', err?.message,);
      setisloading(false);

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

  useQuery(GET_RESIDING_COUNTRIES_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy :'name_ASC',
    },
    onCompleted: data => {
      if (data?.countries?.length > 0) {
        setIsCountryLoading(false)

        const formatedData:any=[];
         data?.countries.map((val: any) => {
          if(val.code === "00971"){
            formatedData.unshift({
              label: val.name,
              value: val.id,
              code: val.code,
            });
          }
          else formatedData.push({
            label: val.name,
            value: val.id,
            code: val.code,
          })
        })

        const countryList = data?.countries.map((val: any) => {
          return { code: val.country_code, id: val.id }
        })

        const filterNull = countryList.filter(function (el: any) {
          return el.code != null;
        })

    

        setOnlyCountries(filterNull)

        setstate({ ...state, residingOptions: formatedData })
      }
    }
  });

  useQuery(GET_CITIES_QUERY, {
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      if (data?.cities?.length > 0) {
        setIsCityLoading(false)
        const formatedData = data?.cities.map((val: any) => {
          return {
            label: `${val.name} (${val.country.country_code?val.country.country_code:val.country.name})`,
            value: val.id
          }
        })
        setstate({ ...state, rentingOptions: formatedData });
      }
    }
  });

  // ----------------------------------------------------QUERIES----------------------------------------------------
  React.useEffect(() => {
    setstate({
      ...state, email: userSelector?.facebookUser?.email || "",
      firstName: userSelector?.facebookUser?.firstName || "",
      lastName: userSelector?.facebookUser?.lastName || ""
    })
  }, [userSelector.facebookUser]);

  const onChangeCheckbox = (name: any, value: any) => setstate({ ...state, [name]: !value })

  const handleDropdownCountry = (val: any) => {
    setstate({ ...state, selectedCountry: val })
  }

  const handleDropdownCity = (val: any) => {
    setstate({ ...state, selectedCity: val })
  }

  const onChangePhone = (phone: any, country: any) => {
    setstate({ ...state, phone: phone, phoneCountryId: country })
  }

  const onChange = (e: any) => {
    setstate({ ...state, [e.target.name]: e.target.value })
  }

  const onFocus = (e: any) => {
    if (e.target.autocomplete) {
      setstate({ ...state, [e.target.name]: '' })
    }
  }

  const onChangeCaptcha = (value:any) => {
    setstate({...state, captcha:value})  
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setisloading(true);
    if(state.selectedCountry.value === ""){
      notification('danger', 'Registration Error', "please select country");
      setisloading(false);
      return;
    }
    if(state.selectedCity.value === ""){
      notification('danger', 'Registration Error', "please select city");
      setisloading(false);
      return;
    }
    
    const resultedValidation: IValidateSignupReturn = ValidateSignup(state);
    if (!resultedValidation.success) {
      setstate({ ...state, error: { ...resultedValidation } });
      setisloading(false);
      return false;
    }
    setstate({ ...state, error: ERRORS });
    const renting_in = { name: state.selectedCity.label, cityId: state.selectedCity.value };
    const residing_in = { countryId: state.selectedCountry.value, name: state.selectedCountry.label, renting_in: renting_in };

    const fcm_Token = await fetch_fcmToken();
    if (fcm_Token) {
      const body = {
        first_name: state.firstName,
        last_name: state.lastName,
        email: state.email,
        phone: state.phone,
        residing_in: [residing_in],
        password: Base64.encode(state.password),
        international_license: true,
        phoneCountryId: state.phoneCountryId,
        fcm_token: fcm_Token,
        captcha_key: state.captcha,
      }

      simplySignup({
        variables: {
          data: body
        }
      });
    } else {
      // setisloading(false);
      // return false
      const body = {
        first_name: state.firstName,
        last_name: state.lastName,
        email: state.email,
        phone: state.phone,
        residing_in: [residing_in],
        password: Base64.encode(state.password),
        international_license: true,
        phoneCountryId: state.selectedCountry.value,
        fcm_token: "fcm_" + new Date().toISOString(),
        captcha_key: state.captcha,
      }
      simplySignup({
        variables: {
          data: body
        }
      });
    }

  }

  const Services_Privacy_Policy = (
    <span className="terms_conditions">
      {t('I agree to')} {' '}
      <Link href="/terms-conditions"><a target="_blank" >
        {t("terms of service")}{' '} </a></Link>
      {t("and")} {' '}
      <Link href="/privacy-policy"><a target="_blank" >{t("privacy policy")}</a></Link>
    </span>
  );

  const Deals_Discount_Updates = (
    <span className="terms_conditions">{t("Yes, send me deals, discounts and updates!")}</span>
  )

  const formatInput = (e: any) => {
    setstate({ ...state, [e.target.name]: e.target.value.trim() })
  }

  const SignUpScreen = () => {
    return (
      <form autoComplete="off" style={{ direction: i18n.language === 'ar' ? "rtl" : "ltr",height:"100%",overflowY:"auto" }}>
        <h1 style={{ paddingTop: isMobile ? "0px" :'100px',paddingBottom: isMobile ? '30px' : '50px' }}>{t("Create Account")}</h1>
        
        <Grid columns={2} id="first_last_name_">
          <Grid.Column mobile={16} tablet={8} computer={8} className="paddingb-0">
            <span className="input-wrapper">
              <span className="label">{t('First Name')}*</span>
              <input type="text" placeholder={t("First Name")} name="firstName" value={state.firstName} onChange={onChange} onBlur={formatInput} />
              <span className="error">{t(state.error?.errorFirstName)}</span>
            </span>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8} className="paddingt-0">
            <span className="input-wrapper">
              <span className="label">{t('Last Name')}*</span>
              <input type="text" placeholder={t("Last Name")} name="lastName" value={state.lastName} onChange={onChange} onBlur={formatInput} />
              <span className="error">{t(state.error?.errorLastName)}</span>
            </span>
          </Grid.Column>
        </Grid>

        <span className="input-wrapper">
          <div style={{ direction: "ltr" }}>
            <span className="label">{t('Phone Number')}*</span>
            <ReactPhone phone={state.phone} onChange={onChangePhone} onlyCountries={onlyCountries} inputStyle={{ height: "2.8rem", paddingLeft: "3.5rem", paddingRight: "3.5rem" }} dropdownStyle={{ marginRight: "50%" }} />
            <span className="error">{t(state.error?.errorPhone)}</span>
          </div>
        </span>

        <span className="input-wrapper">
          <span className="label">{t('Email')}*</span>
          <input type="email" placeholder={t("Email")} name="email" value={state.email} onChange={onChange} onFocus={onFocus} autoComplete="off" onBlur={formatInput} />
          <span className="error">{t(state.error?.errorEmail)}</span>
        </span>

        <span className="input-wrapper">
          <span className="label">{t('Password')}*</span>
          <input type="password" placeholder={t("Password")} name="password" value={state.password} onChange={onChange} style={{ marginBottom: '12px' }} onFocus={onFocus} autoComplete="off" />
          <span className="error">{t(state.error?.errorPassword)}</span>
        </span>

        <Grid  >
          <Grid.Row columns={1}>
            <Grid.Column className="paddingb-0">
              <span className="input-wrapper">
                <span className="label">{t('Country')}*</span>
                <ReactSelect
                  options={state.residingOptions}
                  handleChange={handleDropdownCountry}
                  value={state.selectedCountry}
                  placeholder={t('Which country do you live in?')}
                  menuPlacement="top"
                  isLoading={isCountryLoading}
                />
                <span className="error">{t(state.error?.errorSelectedCountry)}</span>
              </span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1} style={{ paddingTop: 0 }}>
            <Grid.Column className="paddingt-0">
              <span className="input-wrapper">
                <span className="label">{t('City')}*</span>
                <ReactSelect
                  options={state.rentingOptions}
                  handleChange={handleDropdownCity}
                  value={state.selectedCity}
                  placeholder={t("Which city do you renting?")}
                  menuPlacement="top"
                  isLoading={isCityLoading}

                />
                <span className="error">{t(state.error?.errorSelectedCity)}</span>
              </span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="margintb" >
          <ReactCheckBox
            id="html1"
            value={state.agreementCheckbox}
            onChange={() => {onChangeCheckbox("agreementCheckbox", state.agreementCheckbox)}}
            label={Services_Privacy_Policy}
          />
          <span className="error">{t(state.error?.errorAgreementCheckbox)}</span>
        </div>

        <div className="margintb">
          <ReactCheckBox
            id="html2"
            value={state.sendUpdatesCheckbox}
            onChange={() => {onChangeCheckbox("sendUpdatesCheckbox", state.sendUpdatesCheckbox)}}
            label={Deals_Discount_Updates}
          />
        </div>

        <div className="margintb">
        <ReCAPTCHA
            sitekey={`${process.env.captcha_key}`}
            onChange={onChangeCaptcha}
            ref={recaptchaRef}
            size="normal"
        />
         <span className="error">{t(state.error?.errorCaptcha)}</span>
        </div>

        {isloading ? <ReactLoader loading={isloading}></ReactLoader> : <button type="submit" onClick={onSubmit}>{t("Sign Up")}</button>}
       {!isMobile && <p style={{ textAlign: "left" }}>{t("Already registered?")} {" "}
          <span id="signIn" onClick={loginClick} style={{ fontSize: "18px", fontWeight: "bold", cursor: "pointer", color: "#56C3C5" }}>{t("Sign In")}</span>
        </p>}
        {
          router.pathname.includes('signup') ?
            <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }}>
              <span>{t("Already registered?")}</span> {" "}
              <Link href="/signin" >
                <a className="already_have_an_account">{t("Sign In")}</a>
              </Link>
            </div>
            :
            null
        }
      </form >

    )
  }

  const loginClick = () => {
    activeSignInScreen();
  }

  return (
    <>
      <div className={`${'form-container'} ${'sign-up-container'}`}>
        {SignUpScreen()}
      </div>

    </>
  );
}