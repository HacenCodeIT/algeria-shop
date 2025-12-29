import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const FloatingCart = () => {
    const { cartCount } = useCart();
    const [isVisible, setIsVisible] = useState(false);

    // Show button only when scrolled down a bit, or always? User said "above of each page".
    // Maybe just always visible is better for "easy to navigate".
    // Let's make it always visible but maybe animate in?
    // Actually, "above of each page" usually means "on top of content" (z-index) not necessarily top of screen.
    // "like in above of each page" -> maybe they mean header? But they said "out of navbar".
    // So distinct from navbar. A floating button is perfect.

    return (
        <Link
            to="/cart"
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                backgroundColor: 'var(--color-accent)',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 90, // Below toast (100)
                transition: 'transform 0.2s ease, background-color 0.2s ease',
                cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <ShoppingCart size={28} />
            {cartCount > 0 && (
                <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    backgroundColor: 'var(--color-danger)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    border: '2px solid white'
                }}>
                    {cartCount}
                </span>
            )}
        </Link>
    );
};

export default FloatingCart;
