import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Globe, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Logo from './Logo';

export default function Header() {
  const { 
    lang, 
    toggleLanguage, 
    t, 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    currentPath,
    navigate
  } = useStore();

  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchActive(false);
    }
  };

  const navLinks = [
    { href: '/boutique', label: t('nav_boutique') },
    { href: '/nouveautes', label: t('nav_nouveautes'), badge: 'New' },
    { href: '/vetements', label: t('nav_vetements') },
    { href: '/vintage', label: t('nav_vintage') },
    { href: '/sacs', label: t('nav_sacs_accessoires') },
    { href: '/notre-histoire', label: t('nav_histoire') },
    { href: '/engagements', label: t('nav_engagements') }
  ];

  const subCategories = [
    { href: '/vetements', label: 'Tous Vêtements' },
    { href: '/vestes-blazers', label: 'Vestes & Blazers' },
    { href: '/robes', label: 'Robes' },
    { href: '/hauts', label: 'Hauts & Chemisiers' },
    { href: '/pantalons-jeans', label: 'Pantalons & Jeans' },
    { href: '/maille', label: 'Maille & Cachemire' },
    { href: '/sacs', label: 'Sacs à Main' },
    { href: '/accessoires', label: 'Accessoires & Carrés' }
  ];

  return (
    <header className="site-header">
      {/* 1. Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-bar__inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={13} style={{ color: '#8FA88A' }} />
            <span>{t('announcement_text')}</span>
          </div>
          <div className="announcement-bar__extra" style={{ display: 'none' }}>
            <span>Livraison Colissimo Suivi &bull; Paiement sécurisé 3D Secure</span>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="container">
        <div className="site-header__main">
          {/* Mobile Menu Button */}
          <button 
            className="action-btn mobile-menu-toggle" 
            style={{ display: 'none' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="site-nav">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                }}
                className={`site-nav__link ${currentPath === item.href ? 'active' : ''}`}
              >
                {item.label}
                {item.badge && (
                  <span 
                    style={{
                      marginLeft: '6px',
                      fontSize: '0.62rem',
                      padding: '2px 5px',
                      backgroundColor: '#A65D43',
                      color: '#FFF',
                      borderRadius: '2px',
                      fontWeight: 600,
                      letterSpacing: '0.04em'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Header Action Tools */}
          <div className="header-actions">
            {/* Search Trigger */}
            <button
              className="action-btn"
              onClick={() => setIsSearchActive(!isSearchActive)}
              aria-label="Recherche"
              title="Rechercher une pièce"
            >
              <Search size={20} />
            </button>

            {/* Language Switcher */}
            <button
              className="lang-switch"
              onClick={toggleLanguage}
              title={lang === 'fr' ? "Switch to English" : "Passer en Français"}
            >
              <Globe size={14} />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Customer Account */}
            <a
              href="/compte"
              onClick={(e) => {
                e.preventDefault();
                navigate('/compte');
              }}
              className="action-btn"
              aria-label="Mon compte"
              title="Mon compte client"
            >
              <User size={20} />
            </a>

            {/* Wishlist */}
            <a
              href="/favoris"
              onClick={(e) => {
                e.preventDefault();
                navigate('/favoris');
              }}
              className="action-btn"
              aria-label="Favoris"
              title="Mes favoris"
            >
              <Heart size={20} fill={wishlist.length > 0 ? '#A65D43' : 'none'} color={wishlist.length > 0 ? '#A65D43' : 'currentColor'} />
              {wishlist.length > 0 && (
                <span className="action-btn__badge">{wishlist.length}</span>
              )}
            </a>

            {/* Shopping Bag */}
            <button
              className="action-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Panier d'achat"
              title="Mon panier"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="action-btn__badge" style={{ backgroundColor: '#8FA88A' }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Search Dropdown Bar */}
      {isSearchActive && (
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E8E2D6',
            padding: '1.25rem 0',
            animation: 'slideDown 0.25s ease'
          }}
        >
          <div className="container">
            <form 
              onSubmit={handleSearchSubmit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                maxWidth: '780px',
                margin: '0 auto'
              }}
            >
              <Search size={20} style={{ color: '#8FA88A', flexShrink: 0 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav_search_placeholder')}
                autoFocus
                style={{
                  width: '100%',
                  border: 'none',
                  borderBottom: '2px solid #8FA88A',
                  padding: '0.6rem 0',
                  fontSize: '1.05rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  backgroundColor: 'transparent'
                }}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}
              >
                Explorer
              </button>
              <button 
                type="button" 
                onClick={() => setIsSearchActive(false)}
                className="action-btn"
              >
                <X size={20} />
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.78rem', color: '#6B6862' }}>
              Suggestions populaires : <span style={{ textDecoration: 'underline', cursor: 'pointer', margin: '0 4px' }} onClick={() => { setSearchQuery('Blazer'); navigate('/recherche?q=Blazer'); setIsSearchActive(false); }}>Blazer laine</span> &bull; 
              <span style={{ textDecoration: 'underline', cursor: 'pointer', margin: '0 4px' }} onClick={() => { setSearchQuery('Soie'); navigate('/recherche?q=Soie'); setIsSearchActive(false); }}>Soie</span> &bull; 
              <span style={{ textDecoration: 'underline', cursor: 'pointer', margin: '0 4px' }} onClick={() => { setSearchQuery('Cachemire'); navigate('/recherche?q=Cachemire'); setIsSearchActive(false); }}>Cachemire</span> &bull; 
              <span style={{ textDecoration: 'underline', cursor: 'pointer', margin: '0 4px' }} onClick={() => { setSearchQuery('Céline'); navigate('/recherche?q=Céline'); setIsSearchActive(false); }}>Céline vintage</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Sub-Category Navigation Bar */}
      <div className="category-subnav">
        <div className="category-subnav__inner">
          {subCategories.map((cat) => (
            <a
              key={cat.href}
              href={cat.href}
              onClick={(e) => {
                e.preventDefault();
                navigate(cat.href);
              }}
              className={`subnav-item ${currentPath === cat.href ? 'active' : ''}`}
            >
              {cat.label}
            </a>
          ))}
        </div>
      </div>

      {/* 5. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            top: 'var(--header-height)',
            backgroundColor: '#FFFFFF',
            zIndex: 90,
            overflowY: 'auto',
            padding: '2rem 1.5rem',
            borderTop: '1px solid #E8E2D6',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A65D43', fontWeight: 600 }}>
              Menu Principal
            </span>
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #F5F1E8'
                }}
              >
                <span>{item.label}</span>
                <ChevronRight size={18} style={{ color: '#8FA88A' }} />
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8FA88A', fontWeight: 600 }}>
              Rayons Vêtements & Pièces
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {subCategories.map((sub) => (
                <a
                  key={sub.href}
                  href={sub.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(sub.href);
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    fontSize: '0.85rem',
                    padding: '0.5rem',
                    backgroundColor: '#FAF8F4',
                    borderRadius: '4px',
                    color: '#242424'
                  }}
                >
                  {sub.label}
                </a>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #E8E2D6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              className="lang-switch" 
              onClick={toggleLanguage}
              style={{ padding: '0.6rem 1rem' }}
            >
              <Globe size={16} />
              <span>Langue : {lang === 'fr' ? 'Français' : 'English'}</span>
            </button>
            <a 
              href="/contact" 
              onClick={(e) => { e.preventDefault(); navigate('/contact'); setIsMobileMenuOpen(false); }}
              style={{ fontSize: '0.85rem', color: '#6B6862' }}
            >
              Besoin d'aide ?
            </a>
          </div>
        </div>
      )}

      {/* Style for mobile toggle visibility */}
      <style>{`
        @media (max-width: 992px) {
          .site-nav { display: none !important; }
          .mobile-menu-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
