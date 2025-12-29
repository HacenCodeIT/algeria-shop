import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar" style={{
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--color-border)',
            position: 'sticky',
            top: 0,
            zIndex: 50
        }}>
            <div className="container nav-container">
                <Link to="/" style={{ display: 'flex', alignItems: 'center' }} onClick={closeMenu}>
                    <img src={logo} alt="AlgeriaShop" style={{ height: '80px', maxHeight: '80px', objectFit: 'contain' }} />
                </Link>

                {/* Mobile Menu Button */}
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Overlay */}
                <div className={`nav-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>

                {/* Navigation Links */}
                <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/" style={{ color: 'var(--color-text)', fontWeight: 500 }} onClick={closeMenu}>{t('nav.home')}</Link>
                    <Link to="/products" style={{ color: 'var(--color-text)', fontWeight: 500 }} onClick={closeMenu}>{t('nav.shop')}</Link>
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .mobile-only {
                        display: inline-block;
                    }
                    .hide-on-mobile {
                        display: none;
                    }
                }
                @media (min-width: 769px) {
                    .mobile-only {
                        display: none;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
