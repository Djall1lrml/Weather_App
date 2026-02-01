git initimport i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  .use(initReactI18next)
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.

  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {
        translation: {
          hello: "Hello",
          "card.title": "Weather in Constantine",
          "card.description": "Current weather conditions",
          min: "Min",
          max: "Max",
          "clear sky": "Clear sky",
          "few clouds": "Few clouds",
          "scattered clouds": "Scattered clouds",
          "broken clouds": "Broken clouds",
          "shower rain": "Shower rain",
          rain: "Rain",
          thunderstorm: "Thunderstorm",
          snow: "Snow",
          mist: "Mist",
        },
      },
      ar: {
        translation: {
          hello: "مرحبا",
          "card.title": "الطقس في قسنطينة",
          "card.description": "الظروف الجوية الحالية",
          min: "الحد الأدنى",
          max: "الحد الأقصى",
          "clear sky": "سماء صافية",
          "few clouds": "غيوم قليلة",
          "scattered clouds": "غيوم متفرقة",
          "broken clouds": "غيوم مكسورة",
          "shower rain": "أمطار خفيفة",
          rain: "مطر",
          thunderstorm: "عاصفة رعدية",
          snow: "ثلج",
          mist: "ضباب",
          Constantine: "قسنطينة",
        },
      },
    },
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
