import React, { createRef, useEffect, useState } from 'react'
import GeneralLayout from 'Layouts/GeneralLayout';
import styles from './contact.module.css';
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import { notification } from 'utils/notification';
import { Button } from 'semantic-ui-react'

import { ValidateContactForm } from 'utils/validator';
import { IValidateContactReturn } from 'utils/validator.types';

import { ContactMutation } from '../../graphql/Queries/ContactUs';
import client from '../../graphql/apollo-client'

export interface IContactUs {
    i18n: any
  }
  
export default function ContactUs({i18n}:IContactUs) {
    const { t } = useTranslation();
    const recaptchaRef = createRef<any>();
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [captcha,setCaptcha] = useState('');
    const [error,setError] = useState<any>('')
  
    
    const onChange = (value:any) => {
        setCaptcha(value) ;     
    }
    
    useEffect(() => {
        document.body.dir = i18n.dir();
    }, [i18n, i18n.language])

    const clearForm = () => {
        setEmail('');
        setMessage('');
        setSubject('');
        setFullName('');
        setPhoneNumber('');
        setCaptcha('');
     
    }

    const onSubmit = async () => {
    const resultedValidation: IValidateContactReturn = ValidateContactForm({subject :subject,message :message,fullName,email,phoneNumber,captcha});
        if (!resultedValidation.success) {
            setError(resultedValidation)
            return false;
        }
        recaptchaRef.current.reset()
        setError('')
        await client.mutate({
            mutation: ContactMutation,
            variables: {
                name: fullName,
                subject: subject,
                content: message,
                email: email,
                phone: phoneNumber,
            }
        });
        notification('success', 'Success', t('Contact Form Submitted Successfully !'));
        clearForm();
    }

    return (
        <GeneralLayout title={t('Contact Us')} description='Do you want our help? Fill up the form and one of our team members will assist you shortly. Click here to read more!'>
            <div className={styles.ContactUs}>
                <iframe className={styles.map} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14452.279855503097!2d55.1771708!3d25.0994929!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7db4ea3efa4405a2!2sUrent%20-%20Rent%20Vehicles%20directly%20from%20the%20Host.%20Download%20the%20App%20Today*21!5e0!3m2!1sen!2sae!4v1631613062419!5m2!1sen!2sae"
                    width="100%" height="500"
                    style={{ border: 0 }} loading="lazy"></iframe>
                <div className={styles.ContactUsContent}>
                    <div className={styles.ContactUsAddress}>
                        <h1>{t('Contact Us')}</h1>
                        <h3>{parse(`UTECH VEHICLES RENTAL<br/>BY ELECTRONIC MEDIA & SMART APPS LLC`)}</h3>
                        <span style={{ margin: 0 }}>{t('CountryUAE')}<br />{t('PBox')}</span>
                        <h3><FontAwesomeIcon icon={faMapMarkerAlt} className={styles.fasIcon12} />{t('Address')}</h3>
                        <p>{t('Office 2707, Tameem House,')} </p>
                        <p>{t('Al Barsha heights Tecom, Dubai')}</p>
                        <h3><FontAwesomeIcon icon={faPhoneAlt} className={styles.fasIcon16} />{t('Call Us')}</h3>
                        <p style={{ textAlign: i18n.dir() != 'ltr' ? 'right' : 'left', direction: i18n.dir() != 'ltr' ? 'ltr' : 'ltr' }}>{t('+971 4 570 4555')}</p>
                        <p style={{ textAlign: i18n.dir() != 'ltr' ? 'right' : 'left', direction: i18n.dir() != 'ltr' ? 'ltr' : 'ltr' }}>{t('+971 4 580 2766')}</p>
                    </div>

                    <div className={styles.formContainer}>
                        <h4>{t('Drop Your Message')}</h4>
                        <div className="ui form">
                            <div className="field">
                                <label >{t('Subject')}</label>
                                <input placeholder={t('Subject')} type="text" value={subject} onChange={(e) => { setSubject(e.target.value) }} />
                                <span className="error">{t(error?.errorSubject)}</span>
                            </div>
                            <div className="field">
                                <label>{t('Full Name')}</label>
                                <input placeholder={t('Full Name')} type="text" value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
                                <span className="error">{t(error?.errorfullName)}</span>
                            </div>
                            <div className="field">
                                <label>{t('Email')}</label>
                                <input placeholder={t('Email')} type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                <span className="error">{t(error?.errorEmail)}</span>
                            </div>
                            <div className="field">
                                <label>{t('Phone Number')}</label>
                                <input placeholder={t('Phone Number')} type="text" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                <span className="error">{t(error?.errorPhone)}</span>
                            </div>
                            <div className="field">
                                <label>{t('Message')}</label>
                                <textarea placeholder={t('Message')} value={message} style={{ maxHeight: 100 }} onChange={(e) => { setMessage(e.target.value) }} ></textarea>
                                <span className="error">{t(error?.errorMessage)}</span>
                            </div>
                            <div>
                                <ReCAPTCHA
                                    sitekey={`${process.env.captcha_key}`}
                                    onChange={onChange}
                                    ref={recaptchaRef}
                                    size="normal"
                                />
                                 <span className="error">{t(error?.errorCaptcha)}</span>
                            </div>
                            <div className="field">
                                <Button content={t('Submit')} onClick={onSubmit} className={styles.btn}/>
                            </div>                        
                        </div>
                    </div>

                </div>
            </div>
        </GeneralLayout>
    )
}
