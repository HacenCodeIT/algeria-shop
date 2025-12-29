import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ALGERIA_WILAYAS } from '../data/algeria-locations';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, Phone, Mail, MapPin, Home } from 'lucide-react';

const Checkout = () => {
    const { t, language } = useLanguage();
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        wilaya: '',
        commune: '',
        address: ''
    });

    const [availableCommunes, setAvailableCommunes] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update communes when wilaya changes
    useEffect(() => {
        if (formData.wilaya) {
            const selectedWilaya = ALGERIA_WILAYAS.find(w => w.name === formData.wilaya);
            setAvailableCommunes(selectedWilaya ? selectedWilaya.communes : []);
            // Reset commune if it doesn't belong to the new wilaya (though here we just clear it usually)
            setFormData(prev => ({ ...prev, commune: '' }));
        } else {
            setAvailableCommunes([]);
            setFormData(prev => ({ ...prev, commune: '' }));
        }
    }, [formData.wilaya]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            // Remove all non-digit characters
            const digits = value.replace(/\D/g, '');

            // Limit to 10 digits
            const truncated = digits.slice(0, 10);

            // Format as 0xxx-xx-xx-xx
            let formatted = truncated;
            if (truncated.length > 4) {
                formatted = `${truncated.slice(0, 4)}-${truncated.slice(4)}`;
            }
            if (truncated.length > 6) {
                formatted = `${formatted.slice(0, 7)}-${truncated.slice(6)}`;
            }
            if (truncated.length > 8) {
                formatted = `${formatted.slice(0, 10)}-${truncated.slice(8)}`;
            }

            setFormData(prev => ({
                ...prev,
                [name]: formatted
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mock API call
        setTimeout(() => {
            console.log('Order Placed:', { ...formData, items: cartItems, total: cartTotal });
            alert('Order placed successfully!');
            clearCart();
            setIsSubmitting(false);
            navigate('/'); // Redirect to home
        }, 1500);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
                <h2>Your cart is empty</h2>
                <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Go Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '3rem var(--spacing-md)' }}>
            <h1 style={{ marginBottom: '2rem' }}>{t('checkout.title')}</h1>

            <div className="grid-responsive" style={{ alignItems: 'start' }}>

                {/* Checkout Form */}
                <div className="col-span-7" style={{ backgroundColor: 'var(--color-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{t('checkout.shippingInfo')}</h2>

                    <form id="checkout-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="fullName" style={{ fontWeight: 500 }}>{t('checkout.fullName')}</label>
                            <div style={{ position: 'relative' }}>
                                <User size={20} style={{
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    insetInlineStart: '1rem',
                                    color: 'var(--color-accent)'
                                }} />
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    style={{
                                        padding: '0.75rem',
                                        paddingInlineStart: '3rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        outline: 'none',
                                        width: '100%'
                                    }}
                                    placeholder={t('checkout.placeholders.name')}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="phone" style={{ fontWeight: 500 }}>{t('checkout.phone')}</label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={20} style={{
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        insetInlineStart: '1rem',
                                        color: 'var(--color-accent)'
                                    }} />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        style={{
                                            padding: '0.75rem',
                                            paddingLeft: language === 'ar' ? '0.75rem' : '3rem',
                                            paddingRight: language === 'ar' ? '3rem' : '0.75rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--color-border)',
                                            outline: 'none',
                                            direction: 'ltr',
                                            textAlign: 'right', // Keep alignment
                                            width: '100%'
                                        }}
                                        placeholder="0550 00 00 00"
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="email" style={{ fontWeight: 500 }}>{t('checkout.email')}</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={20} style={{
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        insetInlineStart: '1rem',
                                        color: 'var(--color-accent)'
                                    }} />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        style={{
                                            padding: '0.75rem',
                                            paddingInlineStart: '3rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--color-border)',
                                            outline: 'none',
                                            width: '100%'
                                        }}
                                        placeholder="nom@example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="wilaya" style={{ fontWeight: 500 }}>{t('checkout.wilaya')}</label>
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={20} style={{
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        insetInlineStart: '1rem',
                                        color: 'var(--color-accent)',
                                        pointerEvents: 'none'
                                    }} />
                                    <select
                                        id="wilaya"
                                        name="wilaya"
                                        required
                                        value={formData.wilaya}
                                        onChange={handleInputChange}
                                        style={{
                                            padding: '0.75rem',
                                            paddingInlineStart: '3rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--color-border)',
                                            outline: 'none',
                                            backgroundColor: 'white',
                                            width: '100%',
                                            appearance: 'none' // Remove default arrow to avoid clash or custom style it later. Actually keeping default arrow but adding padding for icon.
                                        }}
                                    >
                                        <option value="">{t('checkout.selectWilaya')}</option>
                                        {ALGERIA_WILAYAS.map(wilaya => (
                                            <option key={wilaya.id} value={wilaya.name}>
                                                {wilaya.id} - {wilaya.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="commune" style={{ fontWeight: 500 }}>{t('checkout.commune')}</label>
                                <div style={{ position: 'relative' }}>
                                    <Home size={20} style={{
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        insetInlineStart: '1rem',
                                        color: 'var(--color-accent)',
                                        pointerEvents: 'none'
                                    }} />
                                    <select
                                        id="commune"
                                        name="commune"
                                        required
                                        value={formData.commune}
                                        onChange={handleInputChange}
                                        disabled={!formData.wilaya}
                                        style={{
                                            padding: '0.75rem',
                                            paddingInlineStart: '3rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--color-border)',
                                            outline: 'none',
                                            backgroundColor: !formData.wilaya ? 'var(--color-bg)' : 'white',
                                            cursor: !formData.wilaya ? 'not-allowed' : 'pointer',
                                            width: '100%',
                                            appearance: 'none'
                                        }}
                                    >
                                        <option value="">{t('checkout.selectCommune')}</option>
                                        {availableCommunes.map(commune => (
                                            <option key={commune} value={commune}>
                                                {commune}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="address" style={{ fontWeight: 500 }}>{t('checkout.address')}</label>
                            <div style={{ position: 'relative' }}>
                                <Home size={20} style={{
                                    position: 'absolute',
                                    top: '1rem', // Top align for textarea
                                    insetInlineStart: '1rem',
                                    color: 'var(--color-accent)'
                                }} />
                                <textarea
                                    id="address"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    style={{
                                        padding: '0.75rem',
                                        paddingInlineStart: '3rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        outline: 'none',
                                        resize: 'vertical',
                                        width: '100%'
                                    }}
                                    placeholder={t('checkout.placeholders.address')}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ marginTop: '1rem', padding: '1rem', display: 'flex', justifyContent: 'center' }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? t('checkout.processing') : t('checkout.placeOrder')}
                        </button>

                    </form>
                </div>

                {/* Order Summary */}
                <div className="col-span-5" style={{
                    backgroundColor: 'var(--color-white)',
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'sticky',
                    top: '100px'
                }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{t('checkout.summary')}</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                        {cartItems.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                                <span>{item.name} x {item.quantity}</span>
                                <span>{item.price * item.quantity} {t('products.price')}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: '1.5rem' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-text-light)' }}>
                        <span>{t('cart.subtotal')}</span>
                        <span>{cartTotal} {t('products.price')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-text-light)' }}>
                        <span>{t('cart.shipping')}</span>
                        <span>{t('cart.free')}</span>
                    </div>

                    <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '1.5rem 0' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                        <span>{t('cart.total')}</span>
                        <span>{cartTotal} {t('products.price')}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
