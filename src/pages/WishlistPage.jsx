import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Share2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';

export default function WishlistPage() {
  const { lang, t, wishlist, products, addToCart, toggleWishlist, showToast, navigate } = useStore();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  const handleShareWishlist = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(lang === 'fr' ? 'Lien de votre liste de favoris copié !' : 'Wishlist link copied to clipboard!', 'info');
    }
  };

  const handleAddAllToCart = () => {
    savedProducts.forEach(item => {
      addToCart(item);
    });
    showToast(lang === 'fr' ? 'Toutes vos pièces favorites ont été ajoutées au panier !' : 'All saved items moved to bag!', 'success');
  };

  return (
    <div className="wishlist-page">
      <Breadcrumbs items={[{ label: t('wishlist_title') }]} />

      <div className="container" style={{ paddingBottom: '6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-tag">Votre Sélection Privée</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 600 }}>
              {t('wishlist_title')} ({savedProducts.length})
            </h1>
          </div>

          {savedProducts.length > 0 && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={handleShareWishlist} className="btn btn-secondary" style={{ padding: '0.65rem 1rem', fontSize: '0.82rem' }}>
                <Share2 size={15} />
                <span>Partager ma sélection</span>
              </button>
              <button onClick={handleAddAllToCart} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.82rem' }}>
                <ShoppingBag size={15} />
                <span>Tout ajouter au panier</span>
              </button>
            </div>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#F9EFEA', color: '#A65D43', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Heart size={34} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>
              {t('wishlist_empty')}
            </h2>
            <p style={{ color: '#6B6862', maxWidth: '440px', margin: '0 auto 2rem', fontSize: '0.95rem' }}>
              Explorez nos pépites vintage et cliquez sur l'icône cœur pour conserver vos coups de cœur et suivre leur disponibilité.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/boutique')}>
              Explorer la boutique
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {savedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
