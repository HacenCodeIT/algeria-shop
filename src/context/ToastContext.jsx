import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                pointerEvents: 'none' // Allow clicks to pass through container
            }}>
                {toasts.map(toast => (
                    <div key={toast.id} style={{
                        backgroundColor: 'var(--color-primary)', // Using primary/dark for toast
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-full)',
                        boxShadow: 'var(--shadow-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        minWidth: '300px',
                        animation: 'slideUp 0.3s ease-out',
                        pointerEvents: 'auto', // Re-enable clicks
                        direction: 'rtl' // Since app is RTL-ish
                    }}>
                        <CheckCircle size={20} color="#4ade80" /> {/* Green check */}
                        <span style={{ fontWeight: 500, flex: 1 }}>{toast.message}</span>
                        <button onClick={() => removeToast(toast.id)} style={{ color: 'rgba(255,255,255,0.7)', display: 'flex' }}>
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </ToastContext.Provider>
    );
};
