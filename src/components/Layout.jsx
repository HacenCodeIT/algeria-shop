import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import FloatingCart from './FloatingCart';
import LanguageSwitcher from './LanguageSwitcher';

const Layout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <footer style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-white)',
                padding: '3rem 0',
                marginTop: 'auto'
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <p>&copy; 2025 AlgeriaShop. All rights reserved.</p>
                </div>
            </footer>
            <FloatingCart />
            <LanguageSwitcher />
        </div>
    );
};

export default Layout;
