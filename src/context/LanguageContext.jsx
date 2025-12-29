import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('fr'); // Default to French as base, or maybe 'ar' since user asked? 'fr' is common in DZA too. Switcher will help.

    // Update HTML dir attribute when language changes
    useEffect(() => {
        const dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = language;
    }, [language]);

    const t = (path, params = {}) => {
        const keys = path.split('.');
        let current = translations[language];
        for (const key of keys) {
            if (current[key] === undefined) return path;
            current = current[key];
        }

        if (typeof current === 'string' && Object.keys(params).length > 0) {
            let interpolated = current;
            for (const [key, value] of Object.entries(params)) {
                interpolated = interpolated.replace(`{${key}}`, value);
            }
            return interpolated;
        }

        return current;
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'fr' ? 'ar' : 'fr');
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
