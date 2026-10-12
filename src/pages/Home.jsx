import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  Heart,
  ShoppingBag,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { curatedLookbooks } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { lang, t, products, navigate } = useStore();
  const [activeCollectionTab, setActiveCollectionTab] = useState('all');

  // Filter products for New arrivals (first 4 items with 'nouveautes')
  const newArrivals = products.filter(p => p.collections?.includes('nouveautes')).slice(0, 4);

  // Featured Categories Data
  const featuredCategories = [
    {
      title: "Vestes & Blazers",
      slug: "/vestes-blazers",
      subtitle: "Coupes structurées & laines peignées",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80",
      count: "7 pièces disponibles"
    },
    {
      title: "Robes d'Époque",
      slug: "/robes",
      subtitle: "Soies crêpées & silhouettes fluides",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",
      count: "5 pièces disponibles"
    },
    {
      title: "Hauts & Chemises",
      slug: "/hauts",
      subtitle: "Soie lavée, cols lavallière & broderies",
      image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=700&q=80",
      count: "6 pièces disponibles"
    },
    {
      title: "Maroquinerie & Sacs",
      slug: "/sacs",
      subtitle: "Cuirs box patinés & fermoirs d'orfèvre",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
      count: "4 pièces disponibles"
    },
    {
      title: "Accessoires & Carrés",
      slug: "/accessoires",
      subtitle: "Twills de soie roulottés main & boucles",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=700&q=80",
      count: "8 pièces disponibles"
    }
  ];

  // Collection tabs filter
  const getTabProducts = () => {
    if (activeCollectionTab === 'vintage') {
      return products.filter(p => p.collections?.includes('vintage')).slice(0, 4);
    }
    if (activeCollectionTab === 'intemporels') {
      return products.filter(p => p.collections?.includes('intemporels')).slice(0, 4);
    }
    if (activeCollectionTab === 'trouvailles') {
      return products.filter(p => p.collections?.includes('trouvailles-semaine')).slice(0, 4);
    }
    if (activeCollectionTab === 'accessoires') {
      return products.filter(p => p.category === 'sacs' || p.category === 'accessoires').slice(0, 4);
    }
    return products.slice(0, 4);
  };

  const displayedCollection = getTabProducts();

  // Instagram gallery items
  const instagramGallery = [
    {
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
      caption: "Veste en drap de laine & lumière matinale du Marais."
    },
    {
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      caption: "Trench gabardine d'archive et foulard noué court."
    },
    {
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
      caption: "L'art de l'allure intemporelle : minimalisme et coupe nette."
    },
    {
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      caption: "Pantalon tailleur à pinces et maille douce."
    },
    {
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
      caption: "La patine inimitable d'un cuir box des années 70."
    }
  ];

  return (
    <div className="homepage-view">
      {/* C. HERO SECTION */}
      <section 
        className="hero-section"
        style={{
          position: 'relative',
          minHeight: '82vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#EDE7DC',
          backgroundImage: `linear-gradient(to right, rgba(36, 36, 36, 0.72) 0%, rgba(36, 36, 36, 0.45) 50%, rgba(36, 36, 36, 0.2) 100%), url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 28%',
          color: '#FAF8F4',
          padding: '6rem 0'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '680px' }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(143, 168, 138, 0.25)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(143, 168, 138, 0.4)',
                padding: '0.4rem 0.85rem',
                borderRadius: '2px',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#E8E2D6',
                marginBottom: '1.5rem'
              }}
            >
              <Sparkles size={13} style={{ color: '#8FA88A' }} />
              <span>{t('hero_badge')}</span>
            </div>

            <h1 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
                fontWeight: 500,
                lineHeight: 1.12,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
                marginBottom: '1.5rem',
                textShadow: '0 2px 12px rgba(0,0,0,0.3)'
              }}
            >
              {t('hero_title')}
            </h1>

            <p 
              style={{
                fontSize: '1.15rem',
                lineHeight: 1.65,
                color: '#F5F1E8',
                marginBottom: '2.5rem',
                fontWeight: 300,
                maxWidth: '560px'
              }}
            >
              {t('hero_subtitle')}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-terracotta"
                onClick={() => navigate('/boutique')}
                style={{ padding: '1rem 2.2rem', fontSize: '0.92rem' }}
              >
                <span>{t('hero_cta_primary')}</span>
                <ArrowRight size={16} />
              </button>

              <button
                className="btn"
                onClick={() => navigate('/vintage')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  padding: '1rem 2rem',
                  fontSize: '0.92rem'
                }}
              >
                {t('hero_cta_secondary')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* D. FEATURED CATEGORIES */}
      <section style={{ padding: '6rem 0 4rem' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t('sec_featured_categories')}</span>
            <h2 className="section-title">Le Vestiaire Curaté</h2>
            <p className="section-sub">{t('sec_featured_sub')}</p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '1.25rem'
            }}
          >
            {featuredCategories.map((cat) => (
              <div
                key={cat.slug}
                onClick={() => navigate(cat.slug)}
                style={{
                  position: 'relative',
                  aspectRatio: '3 / 4.2',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid #E8E2D6',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="category-tile"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.7s ease'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(36, 36, 36, 0.88) 0%, rgba(36, 36, 36, 0.25) 45%, transparent 70%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.25rem',
                    color: '#FAF8F4'
                  }}
                >
                  <span style={{ fontSize: '0.68rem', color: '#8FA88A', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                    {cat.count}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFF', fontWeight: 600, margin: '0.2rem 0' }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#D5CCBE', lineHeight: 1.3 }}>
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .category-tile:hover img {
            transform: scale(1.06);
          }
          .category-tile:hover {
            box-shadow: 0 12px 28px rgba(36, 36, 36, 0.12);
            border-color: #A65D43;
          }
          @media (max-width: 1024px) {
            .category-tile:nth-child(n+4) { display: none; }
            div[style*="repeat(5, 1fr)"] { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 680px) {
            div[style*="repeat(5, 1fr)"] { grid-template-columns: 1fr !important; }
            .category-tile:nth-child(n+4) { display: block; }
          }
        `}</style>
      </section>

      {/* E. NEW ARRIVALS */}
      <section style={{ padding: '4rem 0 6rem', backgroundColor: '#FAF8F4', borderTop: '1px solid #E8E2D6', borderBottom: '1px solid #E8E2D6' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="section-tag">{t('sec_new_arrivals')}</span>
              <h2 className="section-title" style={{ margin: 0 }}>Les Nouveaux Arrivages</h2>
              <p className="section-sub" style={{ marginTop: '0.5rem' }}>{t('sec_new_arrivals_sub')}</p>
            </div>
            <button
              onClick={() => navigate('/nouveautes')}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              <span>Voir les nouveautés</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="product-grid">
            {newArrivals.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* F. CURATED THEMATIC COLLECTIONS */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t('sec_curated_collections')}</span>
            <h2 className="section-title">Quatre Regards sur la Mode</h2>
            <p className="section-sub">{t('sec_curated_sub')}</p>
          </div>

          {/* Collection Filter Tabs */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}
          >
            {[
              { id: 'all', label: 'Toutes nos pépites' },
              { id: 'vintage', label: 'Les pièces vintage d’archives' },
              { id: 'intemporels', label: 'Les essentiels intemporels' },
              { id: 'trouvailles', label: 'Les trouvailles de la semaine' },
              { id: 'accessoires', label: 'Les accessoires qui signent l’allure' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCollectionTab(tab.id)}
                className={`btn ${activeCollectionTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.82rem',
                  borderRadius: '2px',
                  backgroundColor: activeCollectionTab === tab.id ? '#A65D43' : 'transparent',
                  borderColor: activeCollectionTab === tab.id ? '#A65D43' : '#D5CCBE'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {displayedCollection.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <button
              onClick={() => navigate('/boutique')}
              className="btn btn-primary"
              style={{ padding: '0.95rem 2.5rem' }}
            >
              <span>Accéder à l'ensemble du vestiaire</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* G. BRAND STORY */}
      <section 
        style={{
          padding: '6rem 0',
          backgroundColor: '#EDE7DC',
          borderTop: '1px solid #D5CCBE',
          borderBottom: '1px solid #D5CCBE'
        }}
      >
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80"
                alt="Atelier de curation vintage LOOP FASHION Paris"
                style={{
                  width: '100%',
                  aspectRatio: '4 / 5',
                  objectFit: 'cover',
                  borderRadius: '2px',
                  boxShadow: 'var(--shadow-lg)'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '-24px',
                  right: '-24px',
                  backgroundColor: '#FFFFFF',
                  padding: '1.5rem',
                  border: '1px solid #E8E2D6',
                  borderRadius: '2px',
                  boxShadow: 'var(--shadow-md)',
                  maxWidth: '260px',
                  display: 'none'
                }}
              >
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8FA88A', fontWeight: 600 }}>
                  Curatelle Parisienne
                </span>
                <p style={{ fontSize: '0.85rem', color: '#242424', margin: '0.4rem 0 0', fontWeight: 500 }}>
                  Chaque pièce inspectée, mesurée et nettoyée avec le plus grand soin.
                </p>
              </div>
            </div>

            <div>
              <span className="section-tag">{t('nav_histoire')}</span>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                {t('sec_story_title')}
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#383838', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                {t('sec_story_p1')}
              </p>
              <p style={{ fontSize: '1.05rem', color: '#383838', lineHeight: 1.8, marginBottom: '2rem' }}>
                {t('sec_story_p2')}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ borderLeft: '2px solid #8FA88A', paddingLeft: '1rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#242424' }}>Contrôle Millimétré</h4>
                  <p style={{ fontSize: '0.82rem', color: '#6B6862' }}>Épaules, carrure, tombé : les mensurations exactes pour acheter sans hésiter.</p>
                </div>
                <div style={{ borderLeft: '2px solid #A65D43', paddingLeft: '1rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#242424' }}>Matières Authentiques</h4>
                  <p style={{ fontSize: '0.82rem', color: '#6B6862' }}>La noblesse de la pure laine, du crêpe de soie et du cachemire vierge.</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/notre-histoire')}
                className="btn btn-primary"
              >
                <span>{t('sec_story_cta')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* H. EDITORIAL STYLING GUIDE: "Comment porter nos pièces" */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Éditorial & Style</span>
            <h2 className="section-title">{t('sec_styling_title')}</h2>
            <p className="section-sub">{t('sec_styling_sub')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {curatedLookbooks.map((look) => (
              <article key={look.id} className="lookbook-card">
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img src={look.image} alt={look.title} className="lookbook-card__image" />
                  <div 
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'wrap'
                    }}
                  >
                    {look.tags.map((tag) => (
                      <span key={tag} className="badge badge-charcoal" style={{ fontSize: '0.65rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lookbook-card__content">
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    {look.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#A65D43', fontWeight: 500, marginBottom: '0.85rem' }}>
                    {look.subtitle}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#6B6862', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {look.advice}
                  </p>

                  <button
                    onClick={() => navigate('/boutique')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#242424',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Explorer les pièces assorties</span>
                    <ChevronRight size={14} style={{ color: '#A65D43' }} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* K. EDITORIAL MOODBOARD GALLERY */}
      <section style={{ padding: '4rem 0 6rem', backgroundColor: '#FAF8F4', borderTop: '1px solid #E8E2D6' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <span className="section-tag">Galerie Vivante</span>
            <h2 className="section-title">{t('sec_gallery_title')}</h2>
            <p className="section-sub">{t('sec_gallery_sub')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
            {instagramGallery.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  backgroundColor: '#EDE7DC'
                }}
                className="gallery-item"
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(36, 36, 36, 0.65)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  className="gallery-caption"
                >
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .gallery-item:hover .gallery-caption { opacity: 1; }
          .gallery-item:hover img { transform: scale(1.08); }
          @media (max-width: 900px) {
            div[style*="repeat(5, 1fr)"] { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 550px) {
            div[style*="repeat(5, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </section>
    </div>
  );
}
