import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            style={{
                position: 'fixed',
                bottom: '2rem',
                left: '2rem',
                backgroundColor: 'var(--color-white)',
                color: 'var(--color-primary)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 90,
                transition: 'transform 0.2s ease, background-color 0.2s ease',
                cursor: 'pointer',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1.2rem'
            }}
            title={language === 'fr' ? 'Switch to Arabic' : 'Passer au Français'}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            {/* <Globe size={18} /> */}
            <span>{language === 'fr' ? 'AR' : 'FR'}</span>
        </button>
    );
};

export default LanguageSwitcher;
