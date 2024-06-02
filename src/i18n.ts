import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from './assets/i18n/resource.json'

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: resources.resources
});

export default i18n;