import React from 'react';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product }) {
  const { 
    lang, 
    t, 
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    setQuickViewProduct,
    navigate 
  } = useStore();

  const isFavorite = isWishlisted(product.id);

  const handleCardClick = (e) => {
    // If user clicked heart or button, do not navigate
    if (e.target.closest('button')) return;
    navigate(`/produit/${product.slug}`);
  };

  return (
    <article 
      className="product-card"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Product Image Wrap */}
      <div className="product-card__image-wrap">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="product-card__badges">
          {product.isUnique && (
            <span className="badge badge-sage">
              <Sparkles size={11} />
              {t('badge_unique')}
            </span>
          )}
          {product.collections?.includes('nouveautes') && (
            <span className="badge badge-terracotta">
              {t('badge_new')}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          className={`product-card__wishlist ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          title={isFavorite ? "Retirer des favoris" : "Enregistrer dans mes favoris"}
        >
          <Heart 
            size={18} 
            fill={isFavorite ? '#A65D43' : 'none'} 
            color={isFavorite ? '#A65D43' : 'currentColor'} 
          />
        </button>

        {/* Quick View Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#242424',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            zIndex: 2,
            transition: 'all 0.2s ease'
          }}
          title={t('btn_quick_view')}
        >
          <Eye size={17} />
        </button>

        {/* Hover Quick Add / Discover Bar */}
        <div 
          className="product-card__quick-add"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          <ShoppingBag size={14} />
          <span>{t('btn_add_to_cart')}</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="product-card__info">
        {product.brand && (
          <span className="product-card__brand">
            {product.brand}
          </span>
        )}

        <h3 className="product-card__title">
          {product.name}
        </h3>

        {/* Condition & Size Pills */}
        <div className="product-card__meta">
          <span style={{ color: '#8FA88A', fontWeight: 600 }}>
            {product.condition}
          </span>
          <span>
            {t('size_label')} {product.sizes ? product.sizes[0] : 'Unique'}
          </span>
        </div>

        {/* Price & Compare Price */}
        <div className="product-card__price-row">
          <span className="product-card__price">
            {product.price} €
          </span>
          {product.comparePrice && (
            <span className="product-card__compare" title={t('price_estimated_retail')}>
              {product.comparePrice} €
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
