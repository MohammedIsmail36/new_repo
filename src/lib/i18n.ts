import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'ar',
  fallbackLng: 'ar',
  resources: {
    ar: {
      translation: {
        dashboard: 'لوحة التحكم',
        sales: 'المبيعات',
        purchases: 'المشتريات',
        inventory: 'المخزون',
        accounts: 'الحسابات',
        reports: 'التقارير',
        settings: 'الإعدادات',
        // أضف المزيد حسب الحاجة
      },
    },
  },
});

export default i18n;