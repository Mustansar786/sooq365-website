import React, { useEffect, useState } from 'react'
import GeneralLayout from 'Layouts/GeneralLayout';
import styles from './privacy.policy.module.css';
import privacy_en from 'src/en/PrivacyPolicy';
import privacy_ar from 'src/ar/PrivacyPolicy';
import privacy_zh from 'src/zh/PrivacyPolicy';
import privacy_ru from 'src/ru/PrivacyPolicy';
import privacy_th from 'src/th/PrivacyPolicy';

import { useTranslation } from "react-i18next";

export interface IPrivacyPolicy {
  i18n:any
}

export default function PrivacyPolicy({i18n}:IPrivacyPolicy) {
  const { t } = useTranslation();
  const [privacyData, setPrivacyData] = useState(privacy_en);
  // const [c_language, setCLanguage] = useState(i18n.language)

  useEffect(() => {
    // setCLanguage(i18n.language)
    const currentLanguage = i18n.language
    document.body.dir = i18n.dir()
    currentLanguage === "ar" && setPrivacyData(privacy_ar);
    currentLanguage === "en" && setPrivacyData(privacy_en);
    currentLanguage === "zh" && setPrivacyData(privacy_zh);
    currentLanguage === "ru" && setPrivacyData(privacy_ru);
    currentLanguage === "th" && setPrivacyData(privacy_th);
  }, [i18n, i18n.language])

  return (
    <GeneralLayout title={t('Privacy Policy')} description="Trent's policies, terms, and conditions may be changed or updated from time to time to meet the requirements and standards. Visit our Privacy Policy Page!">
      <div className={styles.privacy}>
        <div className={i18n.dir() === 'ltr' ? styles.privacyContent : styles.privacyContentRTL}>
          <h1>{t('Privacy Policy')}</h1>
          <p>{t('Privacy Policy Content')}</p>
          {privacyData.map((item, key) => {
            return <div key={key}>
              <div className={styles.privacyTitle}>
                <div className={i18n.dir() === 'ltr' ? styles.privacyLine : styles.privacyLineRTL}></div>
                <div className={styles.privacyText}>{item.title}</div>
              </div>
              <div className={i18n.dir() === 'ltr' ? styles.privacyBody : styles.privacyBodyRTL}>{item.body}</div>
            </div>
          })}
        </div>
      </div>
    </GeneralLayout>
  )
}
