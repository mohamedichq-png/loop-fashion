import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  ChevronDown, 
  Sparkles,
  Tag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { categoriesMeta } from '../data/products';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Shop({ categorySlug = 'boutique' }) {
  const { lang, t, products, currentPath } = useStore();

  // Find meta for current category
  const meta = useMemo(() => {
    return categoriesMeta.find(c => c.slug === categorySlug) || {
      slug: categorySlug,
      label: "Vestiaire Curaté",
      description: "Pièces uniques sélectionnées et contrôlées à Paris."
    };
  }, [categorySlug]);

  // Filters State
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [maxPrice, setMaxPrice] = useState(400);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter products by route category first
  const baseCategoryProducts = useMemo(() => {
    if (categorySlug === 'boutique') {
      return products;
    }
    if (categorySlug === 'nouveautes') {
      return products.filter(p => p.collections?.includes('nouveautes'));
    }
    if (categorySlug === 'vintage') {
      return products.filter(p => p.collections?.includes('vintage'));
    }
    if (categorySlug === 'vetements') {
      return products.filter(p => ['vestes-blazers', 'robes', 'hauts', 'pantalons-jeans', 'maille'].includes(p.category));
    }
    return products.filter(p => p.category === categorySlug);
  }, [categorySlug]);

  // Apply active filters & sorting
  const filteredProducts = useMemo(() => {
    return baseCategoryProducts.filter(item => {
      // Condition filter
      if (selectedCondition !== 'all' && item.condition !== selectedCondition) {
        return false;
      }
      // Size filter
      if (selectedSize !== 'all' && !item.sizes?.some(s => s.includes(selectedSize))) {
        return false;
      }
      // Material filter
      if (selectedMaterial !== 'all' && !item.material?.toLowerCase().includes(selectedMaterial.toLowerCase())) {
        return false;
      }
      // Price filter
      if (item.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // default featured
    });
  }, [baseCategoryProducts, selectedCondition, selectedSize, selectedMaterial, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCondition('all');
    setSelectedSize('all');
    setSelectedMaterial('all');
    setMaxPrice(400);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCondition !== 'all' || selectedSize !== 'all' || selectedMaterial !== 'all' || maxPrice < 400;

  return (
    <div className="shop-page">
      <Breadcrumbs items={[{ label: meta.label, href: currentPath }]} />

      {/* Category Hero Banner */}
      <section style={{ backgroundColor: '#FAF8F4', padding: '3.5rem 0 3rem', borderBottom: '1px solid #E8E2D6', marginBottom: '3rem' }}>
        <div className="container">
          <div style={{ maxWidth: '780px' }}>
            <span className="section-tag" style={{ color: '#8FA88A' }}>
              Collection Seconde Main & Vintage
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, color: '#242424', marginBottom: '0.85rem' }}>
              {meta.label}
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#6B6862', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {meta.description}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#242424', fontWeight: 600, backgroundColor: '#FFFFFF', padding: '0.35rem 0.85rem', borderRadius: '2px', border: '1px solid #E8E2D6' }}>
              <Sparkles size={14} style={{ color: '#A65D43' }} />
              <span>{filteredProducts.length} pièces disponibles &bull; Pièces uniques certifiées</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View with Sidebar and Grid */}
      <div className="container" style={{ marginBottom: '6rem' }}>
        {/* Top Control Bar: Mobile Toggle + Sort Select */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid #E8E2D6',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="btn btn-secondary mobile-filter-btn"
            style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', display: 'none' }}
          >
            <SlidersHorizontal size={15} />
            <span>Filtres ({hasActiveFilters ? 'Actifs' : 'Tous'})</span>
          </button>

          <div style={{ fontSize: '0.88rem', color: '#6B6862' }}>
            Affichage de <strong>{filteredProducts.length}</strong> pièces
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <label htmlFor="sort-select" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#242424', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('sort_by')} :
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', width: 'auto' }}
            >
              <option value="featured">{t('sort_featured')}</option>
              <option value="price-asc">{t('sort_price_asc')}</option>
              <option value="price-desc">{t('sort_price_desc')}</option>
              <option value="newest">{t('sort_newest')}</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '3rem', alignItems: 'start' }} className="catalog-layout">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E8E2D6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                <SlidersHorizontal size={16} style={{ color: '#A65D43' }} />
                <span>{t('filter_title')}</span>
              </div>
              {hasActiveFilters && (
                <button 
                  onClick={resetFilters} 
                  style={{ fontSize: '0.75rem', color: '#A65D43', display: 'flex', alignItems: 'center', gap: '3px' }}
                >
                  <RotateCcw size={12} />
                  <span>Effacer</span>
                </button>
              )}
              {isMobileFilterOpen && (
                <button onClick={() => setIsMobileFilterOpen(false)} className="action-btn">
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Condition Grade Filter */}
            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label">{t('filter_condition')}</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                {[
                  { id: 'all', label: 'Tous les états' },
                  { id: 'État neuf avec étiquette', label: 'État neuf avec étiquette' },
                  { id: 'Excellent état', label: 'Excellent état' },
                  { id: 'Très bon état', label: 'Très bon état' }
                ].map(cond => (
                  <label key={cond.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer', color: '#383838' }}>
                    <input 
                      type="radio" 
                      name="condition" 
                      checked={selectedCondition === cond.id}
                      onChange={() => setSelectedCondition(cond.id)}
                      style={{ accentColor: '#8FA88A' }} 
                    />
                    <span>{cond.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label">{t('filter_size')}</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                {['all', '36', '38', '40', 'M', 'Unique'].map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.75rem',
                      border: '1px solid',
                      borderColor: selectedSize === size ? '#A65D43' : '#E8E2D6',
                      backgroundColor: selectedSize === size ? '#A65D43' : '#FFFFFF',
                      color: selectedSize === size ? '#FFFFFF' : '#242424',
                      borderRadius: '2px',
                      cursor: 'pointer'
                    }}
                  >
                    {size === 'all' ? 'Toutes' : size}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label">{t('filter_material')}</label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.82rem', marginTop: '0.5rem' }}
              >
                <option value="all">Toutes matières nobles</option>
                <option value="Laine">Laine vierge & froide</option>
                <option value="Soie">Pure Soie & Crêpe</option>
                <option value="Cachemire">Cachemire 4 fils</option>
                <option value="Coton">Coton dense & Gabardine</option>
                <option value="Cuir">Cuir véritable / Box</option>
                <option value="Mohair">Mohair brossé</option>
              </select>
            </div>

            {/* Price Max Slider */}
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">{t('filter_price_max')}</label>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#A65D43' }}>
                  {maxPrice} €
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', marginTop: '0.5rem', accentColor: '#A65D43' }}
              />
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="btn btn-secondary"
                style={{ width: '100%', fontSize: '0.8rem', padding: '0.65rem' }}
              >
                <RotateCcw size={14} />
                <span>{t('filter_reset')}</span>
              </button>
            )}

            {isMobileFilterOpen && (
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}
              >
                Appliquer les filtres ({filteredProducts.length} pièces)
              </button>
            )}
          </aside>

          {/* Products Grid / Results */}
          <main>
            {filteredProducts.length === 0 ? (
              <div 
                style={{
                  textAlign: 'center',
                  padding: '5rem 2rem',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E2D6',
                  borderRadius: '2px'
                }}
              >
                <Tag size={36} style={{ color: '#A65D43', margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                  {t('no_products')}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#6B6862', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
                  Essayez d'élargir votre sélection de filtres ou de réinitialiser la fourchette de prix pour découvrir d'autres pépites.
                </p>
                <button onClick={resetFilters} className="btn btn-primary">
                  {t('filter_reset')}
                </button>
              </div>
            ) : (
              <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {filteredProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .catalog-layout { grid-template-columns: 1fr !important; }
          .filters-sidebar { display: none; }
          .mobile-filter-btn { display: inline-flex !important; }
          .filters-sidebar.mobile-open {
            display: block !important;
            position: fixed;
            inset: 0;
            background: #FFF;
            z-index: 120;
            padding: 2rem 1.5rem;
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  );
}
