import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { Plus, Minus } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { t } = useLanguage();
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        addToast(t('products.addedToCartMsg', { quantity, name: product.name }));
        setQuantity(1);
    };

    return (
        <div style={{
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            transition: 'transform 0.2s',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            <Link to={`/product/${product.id}`}>
                <div style={{ height: '250px', overflow: 'hidden' }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </div>
            </Link>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <Link to={`/product/${product.id}`} style={{ fontWeight: 600, fontSize: '1.1rem', color: 'inherit', textDecoration: 'none' }}>
                        {product.name}
                    </Link>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{product.price} {t('products.price')}</span>
                </div>

                <div style={{ true: 'margin-top: auto' /* spacer to push bottom controls down if needed */ }}></div>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', backgroundColor: 'var(--color-bg)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                            style={{
                                padding: '0.25rem',
                                display: 'flex',
                                cursor: quantity <= 1 ? 'default' : 'pointer',
                                opacity: quantity <= 1 ? 0.3 : 1,
                                border: 'none',
                                background: 'transparent'
                            }}
                        >
                            <Minus size={16} />
                        </button>
                        <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            style={{
                                padding: '0.25rem',
                                display: 'flex',
                                cursor: 'pointer',
                                border: 'none',
                                background: 'transparent'
                            }}
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="btn btn-primary"
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        <Plus size={18} /> {t('products.addToCart')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
