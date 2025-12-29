import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const { t } = useLanguage();
    return (
        <div>
            {/* Hero Section */}
            <section style={{
                padding: '5rem 0',
                backgroundColor: 'var(--color-bg)',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{
                        fontSize: '3.5rem',
                        marginBottom: '1.5rem',
                        color: 'var(--color-primary)',
                        letterSpacing: '-1px'
                    }}>
                        {t('home.heroTitle')}
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--color-text-light)',
                        marginBottom: '2.5rem',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        {t('home.heroSubtitle')}
                    </p>
                    <Link to="/products" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                        {t('home.shopNow')}
                    </Link>
                </div>
            </section>

            {/* Featured Categories (Placeholder) */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <h2 style={{ marginBottom: '3rem', textAlign: 'center' }}>{t('home.featured')}</h2>
                    <div className="grid-responsive" style={{ gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        {t('home.cats').map((cat) => (
                            <div key={cat} style={{
                                height: '300px',
                                backgroundColor: 'var(--color-white)',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: 'var(--color-text)'
                            }}>
                                {cat}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
