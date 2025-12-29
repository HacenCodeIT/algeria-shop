import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
                fontWeight: 500
            }}
            title={language === 'fr' ? 'Switch to Arabic' : 'Passer au Français'}
        >
            <Globe size={18} />
            <span>{language === 'fr' ? 'AR' : 'FR'}</span>
        </button>
    );
};

export default LanguageSwitcher;
