import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Plus, Minus } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const {
    lang,
    t,
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    discountAmount,
    discountedSubtotal,
    appliedDiscount,
    freeShippingThreshold,
    remainingForFreeShipping,
    applyPromo,
    promoMessage,
    navigate
  } = useStore();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromo(inputCode);
      setInputCode('');
    }
  };

  const progressPercent = Math.min(100, Math.round(((freeShippingThreshold - remainingForFreeShipping) / freeShippingThreshold) * 100));

  return (
    <>
      {/* Backdrop */}
      <div 
        className="cart-backdrop"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="cart-drawer">
        {/* Header */}
        <div className="cart-drawer__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShoppingBag size={20} style={{ color: '#8FA88A' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600 }}>
              {t('cart_title')} ({cart.length})
            </h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="action-btn"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FAF8F4', borderBottom: '1px solid #E8E2D6' }}>
          <div className="shipping-meter" style={{ margin: 0 }}>
            {remainingForFreeShipping > 0 ? (
              <p>
                {lang === 'fr' 
                  ? <>Ajoutez encore <strong>{remainingForFreeShipping.toFixed(2)} €</strong> pour bénéficier de la <strong>livraison offerte</strong> en France.</>
                  : <>Add <strong>{remainingForFreeShipping.toFixed(2)} €</strong> more to enjoy <strong>free standard delivery</strong> in France.</>}
              </p>
            ) : (
              <p style={{ color: '#5B7256', fontWeight: 600 }}>
                {lang === 'fr' ? 'Félicitations ! Vous bénéficiez de la livraison offerte en France ✦' : 'Congratulations! You qualify for complimentary shipping in France ✦'}
              </p>
            )}
            <div className="shipping-meter__bar">
              <div 
                className="shipping-meter__progress" 
                style={{ width: `${progressPercent}%`, backgroundColor: remainingForFreeShipping === 0 ? '#8FA88A' : '#A65D43' }} 
              />
            </div>
          </div>
        </div>

        {/* Body / Items */}
        <div className="cart-drawer__body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
              <div 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#F0F4EF',
                  color: '#8FA88A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}
              >
                <ShoppingBag size={30} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{t('cart_empty_title')}</h3>
              <p style={{ fontSize: '0.88rem', color: '#6B6862', marginBottom: '1.5rem' }}>
                {t('cart_empty_sub')}
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/boutique');
                }}
              >
                Explorer la boutique
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {cart.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedSize}`}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid #E8E2D6'
                  }}
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    style={{
                      width: '76px',
                      height: '98px',
                      objectFit: 'cover',
                      borderRadius: '2px',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.7rem', color: '#A65D43', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {item.brand || 'Pièce Vintage'}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: '#8E8A83', hover: { color: '#A65D43' } }}
                        title="Retirer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <h4 
                      style={{ 
                        fontSize: '0.95rem', 
                        fontWeight: 600, 
                        lineHeight: 1.3,
                        margin: '0.2rem 0 0.4rem',
                        cursor: 'pointer' 
                      }}
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate(`/produit/${item.slug}`);
                      }}
                    >
                      {item.name}
                    </h4>

                    <div style={{ fontSize: '0.78rem', color: '#6B6862', marginBottom: '0.5rem' }}>
                      Taille : {item.selectedSize} {item.isUnique && <span style={{ color: '#8FA88A' }}>&bull; Pièce Unique</span>}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                      {/* Quantity Controls */}
                      <div 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid #D5CCBE',
                          borderRadius: '2px'
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{ padding: '2px 6px', color: '#242424' }}
                          title="Diminuer"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ padding: '0 8px', fontSize: '0.8rem', fontWeight: 600 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{ padding: '2px 6px', color: '#242424' }}
                          title="Augmenter"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span style={{ fontWeight: 700, fontSize: '1rem', color: '#242424' }}>
                        {item.price * item.quantity} €
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            {/* Promo Code Input */}
            <form onSubmit={handlePromoSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ position: 'relative', flexGrow: 1 }}>
                <Tag size={15} style={{ position: 'absolute', left: '10px', top: '12px', color: '#8E8A83' }} />
                <input
                  type="text"
                  placeholder="Code privilège (ex: BIENVENUE10)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.6rem 0.55rem 32px',
                    fontSize: '0.8rem',
                    border: '1px solid #D5CCBE',
                    borderRadius: '2px'
                  }}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-secondary"
                style={{ padding: '0.55rem 1rem', fontSize: '0.78rem' }}
              >
                {t('cart_apply')}
              </button>
            </form>

            {promoMessage && (
              <p style={{ fontSize: '0.75rem', marginBottom: '0.8rem', color: promoMessage.type === 'success' ? '#5B7256' : '#A65D43' }}>
                {promoMessage.text}
              </p>
            )}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B6862' }}>
                <span>{t('cart_subtotal')}</span>
                <span>{cartSubtotal.toFixed(2)} €</span>
              </div>

              {appliedDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5B7256', fontWeight: 600 }}>
                  <span>Privilège (-{appliedDiscount}%)</span>
                  <span>-{discountAmount.toFixed(2)} €</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B6862' }}>
                <span>{t('cart_shipping')}</span>
                <span>{remainingForFreeShipping === 0 ? 'Offerte (France)' : 'Calculée à la commande'}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: '#242424', paddingTop: '0.5rem', borderTop: '1px solid #E8E2D6' }}>
                <span>Total estimé</span>
                <span>{discountedSubtotal.toFixed(2)} €</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.95rem' }}
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/commande');
                }}
              >
                <span>{t('cart_checkout')}</span>
                <ArrowRight size={16} />
              </button>

              <button
                className="btn btn-secondary"
                style={{ width: '100%', padding: '0.65rem', fontSize: '0.8rem' }}
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/panier');
                }}
              >
                Voir le panier détaillé
              </button>
            </div>

            {/* Trust badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.72rem', color: '#8E8A83' }}>
              <ShieldCheck size={14} style={{ color: '#8FA88A' }} />
              <span>Paiement sécurisé SSL &bull; Retours 14 jours sous pli protégé</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
