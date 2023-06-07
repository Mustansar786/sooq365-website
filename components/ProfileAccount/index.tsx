import React, { useState, useEffect } from 'react';
import ReactSelect from 'components/react-select';
//import ReactCalendar from 'components/ReactCalendar';
// import ReactPhone from 'components/ReactPhone';
//import moment from 'moment';
import { Form ,Icon } from 'semantic-ui-react';
import styles from './style.module.css';
//import cx from 'classnames';
import { IValidateUpdateProfileReturn } from 'utils/validator.types';
import { ValidateUpdateProfile } from 'utils/validator';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from 'graphql/mutation';
import { IResidingin } from 'pages/upload-docs';
import { notification } from 'utils/notification';
// import { useQuery } from '@apollo/client';
// import { GET_RESIDING_COUNTRIES_QUERY } from 'graphql/query';
//import OutsideClickHandler from 'react-outside-click-handler';
import ReactLoader from 'components/ReactLoader';
import { useTranslation } from 'react-i18next';
import { useDispatch ,useSelector} from 'react-redux';
import * as types from 'redux/action/type/user';
import { RootStateI } from '../../redux/reducer';
// import Icon from 'utils.js/icon';




interface _residingOption {
    label: string,
    value: string,
}
interface _rentingOption {
    label: string,
    value: string,
    countryId: string
}

interface _selectedCity {
    label: string,
    value: string,
    countryId: string
}
interface _selectedCountry {
    label: string,
    value: string,
}

interface _userProfile {
    firstName:string,
    lastName:string,
    email: string,
    gender: string,
    international_license: boolean,
    phone: string,
    birthday: Date
}


export interface IProfileAccount {
    rentingOptions: _rentingOption[]
    residingOptions: _residingOption[]
    selectedCountry: _selectedCountry,
    selectedCity: _selectedCity,
    userProfile: _userProfile,
    activeDocument: IResidingin,
    reload : () => void,
}

const ERRORS = {
    success: false,
    errorFirstName:'',
    errorLastName:'',
    errorPhone: '',
    errorEmail: '',
    errorPassword: ''
}

export default function ProfileAccount({ residingOptions, rentingOptions, selectedCountry: _selectedCountry, selectedCity: _selectedCity, userProfile, activeDocument, reload }: IProfileAccount) {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const userSelector = useSelector((state: RootStateI) => state.user);
    
    const [state, setstate] = useState({
        firstName:'',
        lastName:'',
        phone: '+971',
        email: "",
        password: "",
        international_license: false,
        dob: new Date(),
        gender: 'MALE',
        error: ERRORS
    })
    const [selectedCountry, setSelectedCountry] = useState({ label: "", value: "" });
    const [selectedCity, setSelectedCity] = useState({ label: "", value: "", countryId: "" });
    //const [showCalendar, setShowCalendar] = useState(false);
    // const [onlyCountries,setOnlyCountries] = useState([])
    const [showInternationalLicese, setShowInternationalLicese] = useState(false);
    const [loading, setLoading] = useState(false);
    const [togglePassword , setTogglePassword] = useState(false)

    // ----------------------------------------------------QUERIES----------------------------------------------------

    const [updateProfile] = useMutation(UPDATE_PROFILE, {
        onError: (data:any) => {
            setLoading(false)
            if(data?.message.includes('phone_1 dup key')){
                notification('danger', `${t("Error")}`, `${t("Duplicate phone number")}`,);
            }else{
                notification('danger', `${t("Error")}`, `${t("Error to update profile")}`,);
            }
        },
        onCompleted: () => {
            setLoading(false);
            reload();
            notification('success', `${t("Profile Updated")}`, `${t("Profile Updated Successfully")}`,);
        }

    });

    // useQuery(GET_RESIDING_COUNTRIES_QUERY, {
    //     onCompleted: data => {
    //       if (data?.countries?.length > 0) {
    //         const countryList = data?.countries.map((val: any) => {
    //           return  {code: val.country_code, id: val.id}  
    //         }) 
    //         const filterNull = countryList.filter(function (el:any) {
    //           return el.code != null;
    //         })
    //         setOnlyCountries(filterNull)
    //       }
    //     }
    //   });
    // ----------------------------------------------------QUERIES----------------------------------------------------
    useEffect(() => {
        setstate({
            ...state,
            firstName :userProfile.firstName,
            lastName :userProfile.lastName,
            email: userProfile.email,
            gender: userProfile.gender === 'FEMALE' ? "FEMALE" : "MALE",
            international_license: userProfile.international_license,
            phone: userProfile.phone,
            dob: new Date(userProfile.birthday)
        })
    }, [userProfile])

    useEffect(() => {
        setSelectedCountry(_selectedCountry)
    }, [_selectedCountry])

    useEffect(() => {
        setSelectedCity(_selectedCity)
    }, [_selectedCity])


    useEffect(() => {
        if (selectedCountry.value !== selectedCity.countryId) {
            setShowInternationalLicese(true)
        } else {
            setShowInternationalLicese(false)
        }


    }, [selectedCountry, selectedCity])

    // const onChangePhone = (phone: any) => {
    //     setstate({ ...state, phone: phone })
    // }

    // const onDOBchange = (date: any) => {
    //     setstate({ ...state, dob: new Date(date) });
    //     setShowCalendar(false);
    // }

    const handleChangeGender = (e: any, { value }: any) => {
        if (value === 'MALE' || value === 'FEMALE') {
            setstate({ ...state, gender: value })
        }
    }

    const handleChangeInternationalLicense = (e: any, { value }: any) => {
        if (value === 'YES' || value === "NO") {
            setstate({ ...state, international_license: value === 'YES' ? true : false })
        }
    }

    const handleDropdownCountry = (val: any) => {
        setSelectedCountry(val)
    }

    const handleDropdownCity = (val: any) => {
        setSelectedCity(val)
    }

    const onChangeField = (e: any, { id, value }: any) => {
        setstate({ ...state, [id]: value })
    }

    const submit = async(e: any) => {
        e.preventDefault();
        const resultedValidation: IValidateUpdateProfileReturn = ValidateUpdateProfile({ firstName:state.firstName , lastName:state.lastName, email: state.email, phone: state.phone, password: state.password });
        if (!resultedValidation.success) {
            setstate({ ...state, error: resultedValidation });
            return false;
        }
        setstate({ ...state, error: ERRORS });
        const residingInArray = [];
        residingInArray.push(activeDocument);
        const formationData = residingInArray.map((val: any) => {
            const temp = Object.assign({}, val);
            temp.countryId = selectedCountry.value;
            temp.renting_in = {
                cityId: selectedCity.value,
                name: selectedCity.label,
            };
            temp.name = selectedCountry.label;
            return temp;
        });
        setLoading(true)
        if(userProfile.phone !== state.phone){
            setLoading(false)
            dispatch({
                type: types.SET_USER_DETAIL,
                payload: {
                  user: {
                    firstName :state.firstName,
                    lastName :state.lastName,
                    password: state.password ? state.password : undefined,
                    email: state.email,
                    phone: state.phone,
                    gender: state.gender,
                   // brithday: state.dob,
                    residing_in: formationData,
                    international_license: state.international_license,
                    verified_phone :false,
                    documents : userSelector.user.documents
                    
                  }
                }
              })
            }
        else {
            updateProfile({
                variables: {
                    data: {
                        firstName :state.firstName,
                        lastName :state.lastName,
                        password: state.password ? state.password : undefined,
                        email: state.email,
                        phone: state.phone,
                        gender: state.gender,
                        brithday: state.dob,
                        residing_in: formationData,
                        international_license: state.international_license,
                    }
                }
            })
           
        }
        
    }
   
      return (
        <div className={styles.account}>
          <Form autoComplete="off">
            <Form.Group widths="equal">
              <Form.Input
                fluid
                id="firstName"
                label={t('First Name*')}
                value={state.firstName}
                placeholder={t('First Name')}
                onChange={onChangeField}
              />
              <Form.Input
                fluid
                id="lastName"
                label={t('Last Name*')}
                value={state.lastName}
                placeholder={t('Last Name')}
                onChange={onChangeField}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                id="email"
                label={t('Email*')}
                value={state.email}
                placeholder={t('Your Email')}
                disabled={state.email.length > 0}
              />
              <Form.Input
                icon={
                  <Icon
                    name="eye"
                    color={!togglePassword ? 'grey' : 'black'}
                    link
                    onClick={() => setTogglePassword(!togglePassword)}
                  />
                }
                fluid
                id="password"
                label={t('Password')}
                placeholder={t('Your Password*')}
                onChange={onChangeField}
                type={!togglePassword ? 'password' : 'text'}
                autoComplete="new-password"
              />
            </Form.Group>
            <div style={{ display: 'flex' }}>
              <span className="error" style={{ marginTop: '-1rem' }}>
                {t(state.error?.errorEmail)}
              </span>
              <span
                className="error"
                style={{ marginLeft: '1rem', marginTop: '-1rem' }}
              >
                {t(state.error?.errorPassword)}
              </span>
            </div>
  
            <Form.Group widths="equal">
              <div className="field">
                <Form.Input
                fluid
                id="email"
                label={t('Phone Number*')}
                value={state.phone}
                placeholder={t('Your Email')}
                disabled
              />
                {/* <ReactPhone
                  inputStyle={{
                    height: '2.8rem',
                    paddingLeft: '3.5rem',
                    paddingRight: '3.5rem',
                    borderRadius:"10px"
                  }}
                  phone={state.phone}
                  onChange={onChangePhone}
                  onlyCountries={onlyCountries}
                  disabled
                /> */}
              </div>
              <div className="field">
                <label>{t('Gender')}</label>
                <div
                  className="ui fluid"
                  style={{ display: 'flex', marginTop: 15 }}
                >
                  <Form.Radio
                    style={{ fontSize: '0.9rem', marginRight: '1rem' }}
                    label={t('Male')}
                    value="MALE"
                    checked={state.gender === 'MALE'}
                    onChange={handleChangeGender}
                  />
                  <Form.Radio
                    style={{ fontSize: '0.9rem', marginRight: '1rem' }}
                    label={t('Female')}
                    value="FEMALE"
                    checked={state.gender === 'FEMALE'}
                    onChange={handleChangeGender}
                  />
                </div>
              </div>
            </Form.Group>
            <div style={{ display: 'flex' }}>
              <span className="error" style={{ marginTop: '-1rem' }}>
                {t(state.error?.errorPhone)}
              </span>
              <span
                className="error"
                style={{ marginLeft: '1rem', marginTop: '-1rem' }}
              ></span>
            </div>
            <Form.Group widths="equal">
              <div className="field">
                <ReactSelect
                  label={t('Which country do you live in?')}
                  options={residingOptions}
                  handleChange={handleDropdownCountry}
                  value={selectedCountry}
                  placeholder={t('Residing In')}
                />
              </div>
              <div className="field">
                <ReactSelect
                  label={t('Which city do you renting?')}
                  options={rentingOptions}
                  handleChange={handleDropdownCity}
                  value={selectedCity}
                  placeholder={t('Renting In')}
                />
              </div>
            </Form.Group>
            {showInternationalLicese ? (
              <Form.Group widths="equal">
                <div className="field">
                  <label>{t('Do you have International License?')}</label>
                  <div className="ui fluid" style={{ display: 'flex' }}>
                    <Form.Radio
                      style={{ fontSize: '0.9rem', marginRight: '1rem' }}
                      label={t('Yes')}
                      value={'YES'}
                      checked={state.international_license === true}
                      onChange={handleChangeInternationalLicense}
                    />
                    <Form.Radio
                      style={{ fontSize: '0.9rem', marginRight: '1rem' }}
                      label={t('No')}
                      value="NO"
                      checked={state.international_license === false}
                      onChange={handleChangeInternationalLicense}
                    />
                  </div>
                </div>
              </Form.Group>
            ) : null}
            {/* <Form.Group widths="equal" style={{paddingLeft: "33%"}}> */}
              <div className="field" style={{display:"flex",justifyContent:"center",marginBottom:"35px"}}>
               {/* { loading ? <ReactLoader loading={loading}/> : <UButton text='Save' onClick={submit}/>} */}
              </div>
              {/* <div className="field"></div> */}
            {/* </Form.Group> */}
          </Form>
        </div>
      )
   
}

