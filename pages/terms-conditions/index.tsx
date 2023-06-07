import React, { useEffect, useState } from 'react'
import GeneralLayout from 'Layouts/GeneralLayout';
import styles from './terms.module.css';
import Terms_en from 'src/en/TermsAndCondition';
import Terms_ar from 'src/ar/TermsAndCondition';
import Terms_zh from 'src/zh/TermsAndCondition';
import Terms_ru from 'src/ru/TermsAndCondition';
import Terms_th from 'src/th/TermsAndCondition';
import Terms_si from 'src/si/TermsAndCondition';


import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';

export interface ITermsAndConditions {
  i18n: any
}

export default function TermsAndConditions({ i18n }: ITermsAndConditions) {

  const { t } = useTranslation();
  const [generalTermsData, setGeneralTermsData] = useState(Terms_en.generalTerms);
  const [hostTermsData, setHostTermsData] = useState(Terms_en.hostTerms);
  const [guestTermsData, setGuestTermsData] = useState(Terms_en.guestTerms);
  const [generalTermsList, setGeneralTermsList] = useState(Terms_en.generalTerms_Terms);
  const [hostTermsList, setHostTermsList] = useState(Terms_en.hostTerms_Terms);
  const [guestTermList, setGuestTermList] = useState(Terms_en.generalTerms_Terms);
  const [guestFinesList, setGuestFinesList] = useState(Terms_en.guestFeesAndFines);
  const [hostFinesList, setHostFinesList] = useState(Terms_en.hostFeesAndFines);
  const [welcomeMessage, setWelcomeMessage] = useState(Terms_en.welcomeMessage)
  const [c_language, setCLanguage] = useState(i18n.language)

  useEffect(() => {
    setCLanguage(i18n.language)
    const currentLanguage = i18n.language
    document.body.dir = i18n.dir()
    if (currentLanguage === "en") {
      setGeneralTermsData(Terms_en.generalTerms);
      setHostTermsData(Terms_en.hostTerms);
      setGuestTermsData(Terms_en.guestTerms);
      setGuestTermList(Terms_en.guestTerms_Terms);
      setGeneralTermsList(Terms_en.generalTerms_Terms);
      setHostFinesList(Terms_en.hostFeesAndFines);
      setHostTermsList(Terms_en.hostTerms_Terms);
      setGuestFinesList(Terms_en.guestFeesAndFines);
      setWelcomeMessage(Terms_en.welcomeMessage);
    }

    if (currentLanguage === "ar") {
      setGeneralTermsData(Terms_ar.generalTerms);
      setHostTermsData(Terms_ar.hostTerms);
      setGuestTermsData(Terms_ar.guestTerms);
      setGuestTermList(Terms_ar.guestTerms_Terms);
      setGeneralTermsList(Terms_ar.generalTerms_Terms);
      setHostFinesList(Terms_ar.hostFeesAndFines);
      setHostTermsList(Terms_ar.hostTerms_Terms);
      setGuestFinesList(Terms_ar.guestFeesAndFines);
      setWelcomeMessage(Terms_ar.welcomeMessage);
    }
    if(currentLanguage === 'ru'){
      setGeneralTermsData(Terms_ru.generalTerms);
      setHostTermsData(Terms_ru.hostTerms);
      setGuestTermsData(Terms_ru.guestTerms);
      setGuestTermList(Terms_ru.guestTerms_Terms);
      setGeneralTermsList(Terms_ru.generalTerms_Terms);
      setHostFinesList(Terms_ru.hostFeesAndFines);
      setHostTermsList(Terms_ru.hostTerms_Terms);
      setGuestFinesList(Terms_ru.guestFeesAndFines);
      setWelcomeMessage(Terms_ru.welcomeMessage);
    }
    if(currentLanguage === 'zh'){
      setGeneralTermsData(Terms_zh.generalTerms);
      setHostTermsData(Terms_zh.hostTerms);
      setGuestTermsData(Terms_zh.guestTerms);
      setGuestTermList(Terms_zh.guestTerms_Terms);
      setGeneralTermsList(Terms_zh.generalTerms_Terms);
      setHostFinesList(Terms_zh.hostFeesAndFines);
      setHostTermsList(Terms_zh.hostTerms_Terms);
      setGuestFinesList(Terms_zh.guestFeesAndFines);
      setWelcomeMessage(Terms_zh.welcomeMessage);
    }
    if(currentLanguage === 'th'){
      setGeneralTermsData(Terms_th.generalTerms);
      setHostTermsData(Terms_th.hostTerms);
      setGuestTermsData(Terms_th.guestTerms);
      setGuestTermList(Terms_th.guestTerms_Terms);
      setGeneralTermsList(Terms_th.generalTerms_Terms);
      setHostFinesList(Terms_th.hostFeesAndFines);
      setHostTermsList(Terms_th.hostTerms_Terms);
      setGuestFinesList(Terms_th.guestFeesAndFines);
      setWelcomeMessage(Terms_th.welcomeMessage);
    }
    if(currentLanguage === 'si'){
      setGeneralTermsData(Terms_si.generalTerms);
      setHostTermsData(Terms_si.hostTerms);
      setGuestTermsData(Terms_si.guestTerms);
      setGuestTermList(Terms_si.guestTerms_Terms);
      setGeneralTermsList(Terms_si.generalTerms_Terms);
      setHostFinesList(Terms_si.hostFeesAndFines);
      setHostTermsList(Terms_si.hostTerms_Terms);
      setGuestFinesList(Terms_si.guestFeesAndFines);
      setWelcomeMessage(Terms_si.welcomeMessage);
    }
  }, [i18n,i18n.language])



  return (
    <GeneralLayout title={t('TERMS OF USE')} description='Looking to rent a car in UAE? Read our Terms of Use and know more about our services and how to rent a car with urent. Click here to read more!'>
      <div className={i18n.dir() === 'ltr' ? styles.terms : styles.termsRTL}>
        <div className={i18n.dir() === 'ltr' ? styles.termsContent : styles.termsContentRTL}>
          <h1>{t('TERMS OF USE')}</h1>
          <div className={styles.termsTitle}>
            <div className={styles.termsLine}></div>
            <div className={styles.termsText}>{t('TABLE OF CONTENTS')}</div>
          </div>
          <div className={i18n.dir() === 'ltr' ? styles.termBody : styles.termBodyRTL}>
            <h4>{t('SECTION A GENERAL TERMS')}</h4>
            <ol>
              {generalTermsData.map((item, index) => {
                return <li key={index+'gt'}>{parse(item)}</li>
              })}
            </ol>
            <h4>{t('SECTION A HOST TERMS')}</h4>
            <ol>
              {hostTermsData.map((item, index) => {
                return <li key={index+'ht'}>{parse(item)}</li>
              })}
            </ol>
            <h4>{t('GUEST TERMS AND CONDITIONS')}</h4>
            <ol>
              {guestTermsData.map((item, index) => {
                return <li key={index+'conditions'}>{parse(item)}</li>
              })}
            </ol>
            <div className={styles.url}>
              <a href="#">{t(`GUEST’S Fees & Fines*`)}</a>
              <a href="#">{t(`Commercial Host’s Fees & Fines*`)}</a>
            </div>
          </div>

          <div className={styles.termsTitle}>
            <div className={styles.termsLine}></div>
            <div className={styles.termsText}>{t('WELCOME TO URENT')}</div>
          </div>
          <div className={i18n.dir() === 'ltr' ? styles.termsMessage : styles.termsMessageRTL}>{parse(welcomeMessage)}</div>

          <div className={i18n.dir() === 'ltr' ? styles.termSection : styles.termSectionRTL}>
            <h4>{t('SECTION A GENERAL TERMS')}</h4>
            <p>{t('Section A of the Terms sets out the general terms and conditions that apply to each of Urent’s Hosts and Guests.')}</p>
          </div>

          <div className={i18n.dir() === 'ltr' ? styles.termsMainBody : styles.termsMainBodyRTL}>
            <ol className="ui list">
              {generalTermsList.map((item, index) => {
                return <section id={item.title} key={index+'list'}>
                  <div className={styles.termList} key={index}>
                    <li className={styles.listTitle}>{item.title}</li>
                    <ol>{item.list.map((itemList:any) => {
                      return <div key={index+'li'} style={{ paddingLeft: i18n.dir() === 'ltr' ? '1em' : 0, paddingRight: c_language === 'ar' ? '1em' : 0 }}>
                        <li>{parse(itemList.content)}</li>
                        <ol>{itemList.subcontent.map((itemSubContent:any, index:any) => {
                          return <div className="nestedList" key={index+'l2'} style={{ paddingLeft: i18n.dir() === 'ltr' ? '1em' : 0, paddingRight: c_language === 'ar' ? '1em' : 0 }}><li >{parse(itemSubContent)}</li></div>
                        })}</ol>
                        <p>{itemList.extraText}</p>
                      </div>
                    })}</ol>
                  </div>
                </section>
              })
              }
            </ol>
          </div>

          <div className={i18n.dir() === 'ltr' ? styles.termSection : styles.termSectionRTL}>
            <h4>{t('SECTION A HOST TERMS')}</h4>
            <p>{t('Section A of the Terms sets out the specific terms and conditions that apply to Hosts.')}</p>
          </div>

          <div className={i18n.dir() === 'ltr' ? styles.termsMainBody : styles.termsMainBodyRTL}>
            <ol className="ui list">
              {hostTermsList.map((item, index) => {
                return <section id={item.title} key={index+"ll"}>
                  <div className={styles.termList} key={index}>
                    <li className={styles.listTitle}>{parse(item.title)}</li>
                    <ol>{item.list.map((itemList) => {
                      return <div key={index+"22"} style={{ paddingLeft: i18n.dir() === 'ltr' ? '1em' : 0, paddingRight: c_language != 'en' ? '1em' : 0 }}>
                        <li>{parse(itemList.content)}</li>
                        <ol>{itemList.subcontent.map((itemSubContent, index) => {
                          return <div className="nestedList" key={index+'2'} style={{ paddingLeft: i18n.dir() === 'ltr' ? '1em' : 0, paddingRight: c_language != 'en' ? '1em' : 0 }}><li >{parse(itemSubContent)}</li></div>
                        })}</ol>
                        <p>{itemList.extraText}</p>
                      </div>
                    })}</ol>
                  </div>
                </section>
              })
              }
            </ol>
          </div>

          <div className={i18n.dir() === 'ltr' ? styles.termSection : styles.termSectionRTL}>
            <h4>{t('GUEST TERMS AND CONDITIONS')}</h4>
          </div>

          <div className={i18n.dir() === 'ltr' ? styles.termsMainBody : styles.termsMainBodyRTL}>
            <ol className="ui list">
              {guestTermList.map((item, index) => {
                return <section id={item.title} key={index+'3e'}>
                  <div className={styles.termList} key={index}>
                    <li className={styles.listTitle}>{parse(item.title)}</li>
                    <ol>{item.list.map((itemList:any) => {
                      return <div key={index+'9'} style={{ paddingLeft: i18n.dir() === 'ltr' ? '1em' : 0, paddingRight: c_language != 'en' ? '1em' : 0 }}>
                        <li>{parse(itemList.content)}</li>
                        <ol>{itemList.subcontent.map((itemSubContent:any, index:any) => {
                          return <div className="nestedList" key={index} style={{ paddingLeft: i18n.dir() === 'ltr' ? '1em' : 0, paddingRight: c_language != 'en' ? '1em' : 0 }}><li >{parse(itemSubContent)}</li></div>
                        })}</ol>
                        <p>{itemList.extraText}</p>
                      </div>
                    })}</ol>
                  </div>
                </section>
              })
              }
            </ol>
          </div>
          <div className={i18n.dir() === 'ltr' ? styles.guestFines : styles.guestFinesRTL}>
            <div className={styles.termFines}>
              <h3>{t('Fees & Fines(Non Rental Charges)')}</h3>
              <h4>{t('GUEST’S Fees & Fines*')}</h4>
            </div>

            <table className="ui four celled column table" lang={i18n.language}>
              <thead><tr>
                <th>{t('Decription of Charges')}</th>
                <th>{t('Charge to Guest')}</th>
                <th>{t('Payment to Host')}</th>
                <th>{t('URENT Service Charge')}</th>
              </tr></thead>
              {guestFinesList.map((item, key) => {
                return <tr key={key+'d'}>
                  <td >{parse(item.description)}</td>
                  <td >{parse(item.charge)}</td>
                  <td >{parse(item.payment)}</td>
                  <td >{parse(item.service)}</td>
                </tr>
              })}
            </table>


            <div className={styles.termFines}>
              <h4>{t('Commercial Host’s Fees & Fines*')}</h4>
            </div>


            <table className="ui four celled column table" lang={i18n.language}>
              <thead><tr>
                <th>{t('Incidental Costs & Policy Violations')}</th>
                <th>{t('Charge to Host')}</th>
                <th>{t('Payment to Guest')}</th>
                <th>{t('Additional Fee')}</th>
              </tr></thead>
              {hostFinesList.map((item, key) => {
                return <tr key={key+'kki'}>
                  <td >{parse(item.violations)}</td>
                  <td >{parse(item.charge)}</td>
                  <td >{parse(item.payment)}</td>
                  <td >{parse(item.fees)}</td>
                </tr>
              })}
            </table>

            <div className={styles.termsFooter}>
              <p>{t('*All fines are charges to be imposed per violation')}</p>
              <div>Urent UAE |<a href="https://www.urent.com">www.urent.com</a>| T (+971) 50 3926002 l  {t('Office 2707, Tameem House,')} {t('Al Barsha heights Tecom, Dubai')}, UAE</div>
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}
