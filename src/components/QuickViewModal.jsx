import React from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function QuickViewModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    t,
    navigate 
  } = useStore();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorite = isWishlisted(product.id);

  return (
    <div 
      className="modal-overlay"
      onClick={() => setQuickViewProduct(null)}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px' }}
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#242424',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Image */}
          <div style={{ backgroundColor: '#F5F1E8', position: 'relative' }}>
            <img 
              src={product.images[0]} 
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '440px' }}
            />
            {product.isUnique && (
              <span 
                className="badge badge-sage" 
                style={{ position: 'absolute', top: '16px', left: '16px' }}
              >
                <Sparkles size={11} />
                {t('badge_unique')}
              </span>
            )}
          </div>

          {/* Details */}
          <div style={{ padding: '2.5rem 2rem 2rem 0', display: 'flex', flexDirection: 'column' }}>
            {product.brand && (
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A65D43', fontWeight: 600, marginBottom: '0.4rem' }}>
                {product.brand}
              </span>
            )}

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, lineHeight: 1.25, marginBottom: '0.75rem' }}>
              {product.name}
            </h2>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#242424' }}>
                {product.price} €
              </span>
              {product.comparePrice && (
                <span style={{ fontSize: '1rem', color: '#8E8A83', textDecoration: 'line-through' }}>
                  {product.comparePrice} €
                </span>
              )}
            </div>

            {/* Specs Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', padding: '1rem', backgroundColor: '#FAF8F4', borderRadius: '4px', marginBottom: '1.5rem' }}>
              <div><strong>État :</strong> <span style={{ color: '#8FA88A', fontWeight: 600 }}>{product.condition}</span></div>
              <div><strong>Taille :</strong> {product.sizes ? product.sizes.join(', ') : 'Unique'}</div>
              <div><strong>Matière :</strong> {product.material}</div>
              {product.era && <div><strong>Époque :</strong> {product.era}</div>}
            </div>

            <p style={{ fontSize: '0.88rem', color: '#6B6862', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {product.description}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
              <button
                className="btn btn-primary"
                style={{ flexGrow: 1, padding: '0.85rem' }}
                onClick={() => {
                  addToCart(product);
                  setQuickViewProduct(null);
                }}
              >
                <ShoppingBag size={16} />
                <span>{t('btn_add_to_cart')}</span>
              </button>

              <button
                className={`btn btn-secondary ${isFavorite ? 'active' : ''}`}
                style={{ padding: '0.85rem' }}
                onClick={() => toggleWishlist(product.id)}
                title="Favoris"
              >
                <Heart size={18} fill={isFavorite ? '#A65D43' : 'none'} color={isFavorite ? '#A65D43' : 'currentColor'} />
              </button>
            </div>

            <button
              onClick={() => {
                setQuickViewProduct(null);
                navigate(`/produit/${product.slug}`);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem',
                color: '#A65D43',
                fontWeight: 600,
                marginTop: '1rem',
                textDecoration: 'none'
              }}
            >
              <span>Voir la fiche détaillée complète (mesures, histoire, photos)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
