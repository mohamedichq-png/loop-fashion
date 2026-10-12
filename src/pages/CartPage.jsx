import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Plus, 
  Minus, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function CartPage() {
  const {
    lang,
    t,
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

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromo(inputCode);
      setInputCode('');
    }
  };

  const progressPercent = Math.min(100, Math.round(((freeShippingThreshold - remainingForFreeShipping) / freeShippingThreshold) * 100));

  return (
    <div className="cart-page">
      <Breadcrumbs items={[{ label: t('cart_title') }]} />

      <div className="container" style={{ paddingBottom: '6rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 600, marginBottom: '2rem' }}>
          {t('cart_title')} ({cart.length} pièces)
        </h1>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#F0F4EF', color: '#8FA88A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <ShoppingBag size={34} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>{t('cart_empty_title')}</h2>
            <p style={{ color: '#6B6862', maxWidth: '440px', margin: '0 auto 2rem', fontSize: '0.95rem' }}>
              {t('cart_empty_sub')}
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/boutique')}>
              Découvrir la collection
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }} className="cart-layout">
            {/* Left Items Column */}
            <div>
              {/* Shipping Progress */}
              <div className="shipping-meter" style={{ marginBottom: '2rem' }}>
                {remainingForFreeShipping > 0 ? (
                  <p>
                    Il vous manque <strong>{remainingForFreeShipping.toFixed(2)} €</strong> pour bénéficier de la <strong>livraison standard offerte</strong> en France.
                  </p>
                ) : (
                  <p style={{ color: '#5B7256', fontWeight: 600 }}>
                    ✦ Livraison offerte en France métropolitaine appliquée à votre panier !
                  </p>
                )}
                <div className="shipping-meter__bar">
                  <div className="shipping-meter__progress" style={{ width: `${progressPercent}%`, backgroundColor: remainingForFreeShipping === 0 ? '#8FA88A' : '#A65D43' }} />
                </div>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {cart.map((item) => (
                  <div 
                    key={`${item.id}-${item.selectedSize}`}
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      padding: '1.5rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8E2D6',
                      borderRadius: '2px'
                    }}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      style={{ width: '100px', height: '130px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0, cursor: 'pointer' }}
                      onClick={() => navigate(`/produit/${item.slug}`)}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          {item.brand && (
                            <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A65D43', fontWeight: 600 }}>
                              {item.brand}
                            </span>
                          )}
                          <h3 
                            style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, margin: '0.2rem 0', cursor: 'pointer' }}
                            onClick={() => navigate(`/produit/${item.slug}`)}
                          >
                            {item.name}
                          </h3>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          style={{ color: '#8E8A83' }}
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: '#6B6862', margin: '0.5rem 0' }}>
                        <span>Taille : {item.selectedSize}</span>
                        {item.isUnique && <span style={{ marginLeft: '8px', color: '#8FA88A', fontWeight: 600 }}>&bull; Pièce Unique</span>}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        {/* Qty */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #D5CCBE', borderRadius: '2px' }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '4px 8px' }}>
                            <Minus size={13} />
                          </button>
                          <span style={{ padding: '0 12px', fontSize: '0.85rem', fontWeight: 600 }}>
                            {item.quantity}
                          </span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '4px 8px' }}>
                            <Plus size={13} />
                          </button>
                        </div>

                        <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#242424' }}>
                          {item.price * item.quantity} €
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/boutique')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: '#6B6862',
                  marginTop: '2rem'
                }}
              >
                <ArrowLeft size={16} />
                <span>{t('cart_continue')}</span>
              </button>
            </div>

            {/* Right Summary Column */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '2px', padding: '2rem', position: 'sticky', top: '100px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E8E2D6' }}>
                Récapitulatif
              </h2>

              {/* Promo Code Form */}
              <form onSubmit={handlePromoSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <input
                  type="text"
                  placeholder="Code privilège (BIENVENUE10)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  style={{
                    flexGrow: 1,
                    padding: '0.65rem',
                    fontSize: '0.82rem',
                    border: '1px solid #D5CCBE',
                    borderRadius: '2px'
                  }}
                />
                <button type="submit" className="btn btn-secondary" style={{ padding: '0.65rem 1rem', fontSize: '0.8rem' }}>
                  {t('cart_apply')}
                </button>
              </form>

              {promoMessage && (
                <p style={{ fontSize: '0.78rem', marginBottom: '1rem', color: promoMessage.type === 'success' ? '#5B7256' : '#A65D43' }}>
                  {promoMessage.text}
                </p>
              )}

              {/* Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B6862' }}>
                  <span>{t('cart_subtotal')}</span>
                  <span>{cartSubtotal.toFixed(2)} €</span>
                </div>

                {appliedDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5B7256', fontWeight: 600 }}>
                    <span>Réduction privilège (-{appliedDiscount}%)</span>
                    <span>-{discountAmount.toFixed(2)} €</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B6862' }}>
                  <span>{t('cart_shipping')}</span>
                  <span>{remainingForFreeShipping === 0 ? 'Offerte (France)' : '5.90 € (Colissimo)'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, color: '#242424', paddingTop: '1rem', borderTop: '1px solid #E8E2D6' }}>
                  <span>{t('cart_total')}</span>
                  <span>{(discountedSubtotal + (remainingForFreeShipping === 0 ? 0 : 5.90)).toFixed(2)} €</span>
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem' }}
                onClick={() => navigate('/commande')}
              >
                <span>{t('cart_checkout')}</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', fontSize: '0.78rem', color: '#8E8A83' }}>
                <ShieldCheck size={16} style={{ color: '#8FA88A' }} />
                <span>Paiement 100% sécurisé SSL &bull; Retours 14j</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
