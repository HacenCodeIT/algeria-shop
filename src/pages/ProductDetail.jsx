import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const ProductDetail = () => {
    const { id } = useParams();
    const { t } = useLanguage();
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const product = PRODUCTS.find(p => p.id === parseInt(id));

    if (!product) {
        return <div className="container" style={{ padding: '3rem' }}>Product not found</div>;
    }

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    return (
        <div className="container" style={{ padding: '3rem var(--spacing-md)' }}>
            <Link to="/products" className="btn btn-outline" style={{ marginBottom: '2rem' }}>
                <ArrowLeft size={16} /> Back to Shop
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 'var(--radius-lg)' }} />
                </div>

                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '2rem' }}>
                        {product.price} {t('products.price')}
                    </p>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', marginBottom: '3rem', lineHeight: '1.8' }}>
                        {product.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            backgroundColor: 'var(--color-bg)',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)'
                        }}>
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                style={{ padding: '0.25rem', display: 'flex', cursor: quantity <= 1 ? 'not-allowed' : 'pointer', opacity: quantity <= 1 ? 0.5 : 1 }}
                                disabled={quantity <= 1}
                            >
                                <Minus size={20} />
                            </button>
                            <span style={{ fontWeight: '600', fontSize: '1.1rem', minWidth: '24px', textAlign: 'center' }}>{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                style={{ padding: '0.25rem', display: 'flex', cursor: 'pointer' }}
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            addToCart(product, quantity);
                            addToast(t('products.addedToCartMsg', { quantity, name: product.name }));
                        }}
                        className="btn btn-primary"
                        style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
                    >
                        <Plus size={20} /> {t('products.addToCart')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
