import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
 
import TRANSLATION_AR  from "./ar/translation.json";
import TRANSLATION_EN from "./en/translation.json";
import TRANSLATION_ZH from "./zh/translation.json";
import TRANSLATION_RU from './ru/translation.json';
import TRANSLATION_TH from './th/translation.json';
import TRANSLATION_SI from './si/translation.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: 'en',
    resources: {
      en: {
        translation: TRANSLATION_EN,
      },
      ar: {
        translation: TRANSLATION_AR,
      },
      zh: {
        translation: TRANSLATION_ZH
      },
      ru:{
        translation: TRANSLATION_RU
      },
      th :{
        translation: TRANSLATION_TH
      },
      si : {
        translation : TRANSLATION_SI
      }

    },
    debug:false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
