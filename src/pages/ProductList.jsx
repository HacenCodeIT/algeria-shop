import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/products';

const ProductList = () => {


    const { t } = useLanguage();

    return (
        <div className="container" style={{ padding: '3rem var(--spacing-md)' }}>
            <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>{t('products.title')}</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
