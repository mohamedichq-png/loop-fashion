import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Ruler, 
  Check, 
  Info,
  Share2,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';

export default function ProductDetail({ slug }) {
  const { 
    lang, 
    t, 
    products,
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    showToast,
    navigate 
  } = useStore();

  const product = products.find(p => p.slug === slug) || products[0];
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('measurements'); // measurements | condition | care

  const isFavorite = isWishlisted(product.id);

  // Similar products in same category
  const similarProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.collections?.includes('vintage')))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(lang === 'fr' ? 'Lien de la pièce copié dans le presse-papier !' : 'Link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="product-detail-page">
      <Breadcrumbs 
        items={[
          { label: product.categoryLabel || 'Boutique', href: `/${product.category}` },
          { label: product.name }
        ]} 
      />

      <div className="container" style={{ paddingBottom: '6rem' }}>
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.82rem',
            color: '#6B6862',
            marginBottom: '2rem'
          }}
        >
          <ArrowLeft size={15} />
          <span>Retour à la sélection</span>
        </button>

        {/* Main Grid: Gallery + Purchase Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'start' }} className="pdp-layout">
          {/* 1. Left Gallery */}
          <div style={{ position: 'sticky', top: '100px' }}>
            {/* Main Featured Image */}
            <div 
              style={{
                position: 'relative',
                aspectRatio: '3 / 4',
                backgroundColor: '#F5F1E8',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '1rem',
                border: '1px solid #E8E2D6'
              }}
            >
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {product.isUnique && (
                <span 
                  className="badge badge-sage"
                  style={{ position: 'absolute', top: '16px', left: '16px', padding: '0.4rem 0.8rem' }}
                >
                  <Sparkles size={12} />
                  {t('badge_unique')}
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    style={{
                      width: '80px',
                      height: '106px',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      border: '2px solid',
                      borderColor: selectedImageIdx === idx ? '#A65D43' : '#E8E2D6',
                      padding: 0,
                      opacity: selectedImageIdx === idx ? 1 : 0.65,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Right Buy Panel */}
          <div>
            {/* Brand Header */}
            {product.brand && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A65D43', fontWeight: 600 }}>
                  {product.brand}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#8FA88A', fontWeight: 500 }}>&bull; Authentifié à Paris</span>
              </div>
            )}

            <h1 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
                fontWeight: 600,
                color: '#242424',
                lineHeight: 1.25,
                marginBottom: '1rem'
              }}
            >
              {product.name}
            </h1>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #E8E2D6' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 700, color: '#242424' }}>
                {product.price} €
              </span>
              {product.comparePrice && (
                <span style={{ fontSize: '1.05rem', color: '#8E8A83', textDecoration: 'line-through' }} title="Estimation valeur d'origine">
                  {product.comparePrice} €
                </span>
              )}
              <span style={{ fontSize: '0.78rem', color: '#8FA88A', fontWeight: 600, backgroundColor: '#F0F4EF', padding: '3px 8px', borderRadius: '2px' }}>
                TVA incluse &bull; Pièce Unique
              </span>
            </div>

            {/* Key Attributes Grid */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.85rem',
                padding: '1.25rem',
                backgroundColor: '#FAF8F4',
                borderRadius: '4px',
                border: '1px solid #E8E2D6',
                marginBottom: '2rem',
                fontSize: '0.85rem'
              }}
            >
              <div>
                <span style={{ color: '#6B6862', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('condition_label')}
                </span>
                <strong style={{ color: '#8FA88A', fontSize: '0.92rem' }}>{product.condition}</strong>
              </div>

              <div>
                <span style={{ color: '#6B6862', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Taille indiquée
                </span>
                <strong style={{ color: '#242424', fontSize: '0.92rem' }}>
                  {product.sizes ? product.sizes.join(', ') : 'Unique'}
                </strong>
              </div>

              <div>
                <span style={{ color: '#6B6862', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Époque & Origine
                </span>
                <span style={{ color: '#242424' }}>{product.era || 'Vintage'} &bull; {product.origin || 'France'}</span>
              </div>

              <div>
                <span style={{ color: '#6B6862', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Matière principale
                </span>
                <span style={{ color: '#242424' }}>{product.material?.split(',')[0]}</span>
              </div>
            </div>

            {/* Actions: Add to Bag + Wishlist */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button
                className="btn btn-primary"
                style={{ flexGrow: 1, padding: '1.1rem', fontSize: '0.95rem' }}
                onClick={() => addToCart(product)}
              >
                <ShoppingBag size={18} />
                <span>{t('btn_add_to_cart')}</span>
              </button>

              <button
                className={`btn btn-secondary ${isFavorite ? 'active' : ''}`}
                style={{ padding: '1.1rem 1.4rem' }}
                onClick={() => toggleWishlist(product.id)}
                aria-label="Ajouter aux favoris"
                title="Enregistrer cette pièce"
              >
                <Heart 
                  size={20} 
                  fill={isFavorite ? '#A65D43' : 'none'} 
                  color={isFavorite ? '#A65D43' : 'currentColor'} 
                />
              </button>
            </div>

            {/* Unique Piece Warning */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#A65D43', marginBottom: '2.5rem', fontWeight: 500 }}>
              <Sparkles size={14} />
              <span>Pièce unique en stock. Dès validation de commande, elle sera retirée de la vente.</span>
            </div>

            {/* Detailed Tabs: Mesures, État, Conseils de style */}
            <div style={{ borderTop: '1px solid #E8E2D6', paddingTop: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #E8E2D6', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
                <button
                  onClick={() => setActiveTab('measurements')}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: activeTab === 'measurements' ? '#A65D43' : '#6B6862',
                    borderBottom: activeTab === 'measurements' ? '2px solid #A65D43' : 'none',
                    paddingBottom: '0.75rem',
                    marginBottom: '-0.85rem'
                  }}
                >
                  Mesures Exactes
                </button>
                <button
                  onClick={() => setActiveTab('condition')}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: activeTab === 'condition' ? '#A65D43' : '#6B6862',
                    borderBottom: activeTab === 'condition' ? '2px solid #A65D43' : 'none',
                    paddingBottom: '0.75rem',
                    marginBottom: '-0.85rem'
                  }}
                >
                  Diagnostic de l'État
                </button>
                <button
                  onClick={() => setActiveTab('styling')}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: activeTab === 'styling' ? '#A65D43' : '#6B6862',
                    borderBottom: activeTab === 'styling' ? '2px solid #A65D43' : 'none',
                    paddingBottom: '0.75rem',
                    marginBottom: '-0.85rem'
                  }}
                >
                  Conseil de Style
                </button>
              </div>

              {/* Tab 1: Measurements */}
              {activeTab === 'measurements' && (
                <div>
                  <p style={{ fontSize: '0.82rem', color: '#6B6862', marginBottom: '0.85rem' }}>
                    Mesures prises à plat par notre équipe à Paris. Comparez avec votre vêtement préféré pour un ajustement parfait :
                  </p>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <tbody>
                      {product.measurements && Object.entries(product.measurements).map(([key, val]) => (
                        <tr key={key} style={{ borderBottom: '1px solid #F5F1E8' }}>
                          <td style={{ padding: '0.5rem 0', textTransform: 'capitalize', color: '#6B6862' }}>{key}</td>
                          <td style={{ padding: '0.5rem 0', textAlign: 'right', fontWeight: 600, color: '#242424' }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 2: Condition */}
              {activeTab === 'condition' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className="badge badge-sage">{product.condition}</span>
                    <span style={{ fontSize: '0.78rem', color: '#6B6862' }}>Certifié lors du contrôle qualité</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#383838', lineHeight: 1.6, marginTop: '0.5rem' }}>
                    {product.conditionDetails}
                  </p>
                </div>
              )}

              {/* Tab 3: Styling Tip */}
              {activeTab === 'styling' && (
                <div>
                  <p style={{ fontSize: '0.88rem', color: '#383838', fontStyle: 'italic', lineHeight: 1.6 }}>
                    « {product.stylingTip} »
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ borderTop: '1px solid #E8E2D6', paddingTop: '1.5rem', marginBottom: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                L'Histoire de la Pièce
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#6B6862', lineHeight: 1.7, marginBottom: '1rem' }}>
                {product.description}
              </p>
              <div style={{ fontSize: '0.78rem', color: '#8E8A83' }}>
                {t('pdp_sku')} <strong>{product.sku}</strong> &bull; Poids d'expédition : {product.weight}
              </div>
            </div>

            {/* Trust Assurances */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid #E8E2D6', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.8rem', color: '#383838' }}>
                <Truck size={17} style={{ color: '#8FA88A', flexShrink: 0 }} />
                <span>Expédition soignée sous 24-48h depuis Paris via Colissimo suivi.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.8rem', color: '#383838' }}>
                <RotateCcw size={17} style={{ color: '#A65D43', flexShrink: 0 }} />
                <span>Retours sereins : 14 jours pour essayer chez vous.</span>
              </div>
            </div>

            {/* Share link */}
            <button
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.78rem',
                color: '#6B6862',
                marginTop: '1.5rem',
                cursor: 'pointer'
              }}
            >
              <Share2 size={14} />
              <span>{t('pdp_share')}</span>
            </button>
          </div>
        </div>

        {/* Similar Curations Section */}
        {similarProducts.length > 0 && (
          <section style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid #E8E2D6' }}>
            <div className="section-header" style={{ marginBottom: '2.5rem' }}>
              <span className="section-tag">Sélection Assortie</span>
              <h2 className="section-title" style={{ fontSize: '2.2rem' }}>{t('pdp_similar_title')}</h2>
            </div>
            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {similarProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pdp-layout { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}
