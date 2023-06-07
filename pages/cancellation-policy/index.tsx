import React, {useEffect, useState} from 'react'
import GeneralLayout from 'Layouts/GeneralLayout';
import styles from './cancellation.module.css';
import cancellation_en from '../../src/en/Cancellation';
import cancellation_ar from '../../src/ar/Cancellation';
import cancellation_zh from '../../src/zh/Cancellation';
import cancellation_ru from '../../src/ru/Cancellation';
import cancellation_th from '../../src/th/Cancellation';
import cancellation_si from '../../src/si/Cancellation';

import { useTranslation } from "react-i18next";

export interface ICancellation {
  i18n: any
}

export default function Cancellation({ i18n }: ICancellation) {

  const { t } = useTranslation();
  const [cancellationData, setCancellationData] = useState(cancellation_en);
  const [c_language, setCLanguage] = useState(i18n.language)

  useEffect(() => {
    document.body.dir = i18n.dir()
    setCLanguage(i18n.language)
    const currentLanguage = i18n.language
    document.body.dir = i18n.dir()
    currentLanguage === "ar" && setCancellationData(cancellation_ar);
    currentLanguage === "en" && setCancellationData(cancellation_en);
    currentLanguage === "zh" && setCancellationData(cancellation_zh);
    currentLanguage === "ru" && setCancellationData(cancellation_ru);
    currentLanguage === "th" && setCancellationData(cancellation_th);
    currentLanguage === 'si' && setCancellationData(cancellation_si)
    
  }, [i18n, i18n.language])

  return (
    <GeneralLayout title={t('Cancellation Policy')} description={'Read and learn how the procedure for cancellation of the booking, refund, and Flight adjustments from the host. Click here to read more!'}>
      <div className={styles.cancellation}>
        <div className={i18n.dir() === 'ltr' ? styles.cancellationContent : styles.cancellationContentRTL}>
          <h1>{t('Cancellation Policy')}</h1>
          {cancellationData.map((item, key) => {
            return <div key={key}>
              <div className={styles.cancellationTitle}>
                <div className={i18n.dir() === 'ltr' ? styles.cancellationLine : styles.cancellationLineRTL}></div>
                <div className={styles.cancellationText}>{item.title}</div>
              </div>
              <div className={i18n.dir() === 'ltr' ? styles.cancellationBody : styles.cancellationBodyRTL}>{item.body}</div>

              {item.bodyTable != undefined && item.bodyTable.length > 0 &&
                <div className={i18n.dir() === 'ltr' ? styles.cancellationBody : styles.cancellationBodyRTL} style={{ paddingTop: 20 }}>
                  <table className="ui two column table" lang={c_language}>
                    {item.bodyTable.map((item, index) => {
                      if (index === 0) {
                        return <thead>
                          <th>{item.columnOne}</th>
                          <th>{item.columnTwo}</th>
                        </thead>
                      } else {
                        return <tr>
                          <td>{item.columnOne}</td>
                          <td>{item.columnTwo}</td>
                        </tr>
                      }

                    })}
                  </table>
                </div>
              }
              <div className={i18n.dir() === 'ltr' ? styles.cancellationBody : styles.cancellationBodyRTL}>{item.extraText}</div>
            </div>
          })}
        </div>
      </div>
    </GeneralLayout>
  )
}
