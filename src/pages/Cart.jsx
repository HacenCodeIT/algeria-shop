import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { t } = useLanguage();
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ padding: '5rem var(--spacing-md)', textAlign: 'center' }}>
                <ShoppingBag size={64} style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem' }} />
                <h2 style={{ marginBottom: '1rem' }}>{t('cart.empty')}</h2>
                <Link to="/products" className="btn btn-primary">{t('cart.goShopping')}</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '3rem var(--spacing-md)' }}>
            <h1 style={{ marginBottom: '2rem', textAlign: 'right' }}>{t('cart.title')}</h1>

            <div className="grid-responsive" style={{ alignItems: 'start' }}>
                {/* Cart Items List */}
                <div className="col-span-8" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {cartItems.map((item) => (
                        <div key={item.id} style={{
                            display: 'flex',
                            gap: '1.5rem',
                            padding: '1.5rem',
                            backgroundColor: 'var(--color-white)',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3 style={{ fontSize: '1.1rem' }}>{item.name}</h3>
                                    <p style={{ fontWeight: 'bold' }}>{item.price * item.quantity} {t('products.price')}</p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-bg)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            style={{ padding: '0.25rem', display: 'flex' }}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span style={{ fontWeight: '500', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            style={{ padding: '0.25rem', display: 'flex' }}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{ color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                    >
                                        <Trash2 size={18} /> <span style={{ fontSize: '0.9rem' }}>Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="col-span-4" style={{
                    backgroundColor: 'var(--color-white)',
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'sticky',
                    top: '100px'
                }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{t('cart.title')}</h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-text-light)' }}>
                        <span>{t('cart.subtotal')}</span>
                        <span>{cartTotal} {t('products.price')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-text-light)' }}>
                        <span>{t('cart.shipping')}</span>
                        <span>{t('cart.free')}</span>
                    </div>

                    <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '1.5rem 0' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                        <span>{t('cart.total')}</span>
                        <span>{cartTotal} {t('products.price')}</span>
                    </div>

                    <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '1rem', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                        {t('cart.checkout')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
