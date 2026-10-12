import React, { useState, useEffect, useMemo } from 'react';
import { Search, Sparkles, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SearchPage() {
  const { searchQuery, setSearchQuery, products } = useStore();
  const [query, setQuery] = useState('');

  // Synchronize with URL search param if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || searchQuery || '';
    setQuery(q);
  }, [searchQuery]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return products;
    const lower = query.toLowerCase().trim();
    return products.filter(p => {
      return (
        p.name.toLowerCase().includes(lower) ||
        p.brand?.toLowerCase().includes(lower) ||
        p.categoryLabel?.toLowerCase().includes(lower) ||
        p.material?.toLowerCase().includes(lower) ||
        p.color?.toLowerCase().includes(lower) ||
        p.description?.toLowerCase().includes(lower) ||
        p.condition?.toLowerCase().includes(lower)
      );
    });
  }, [query]);

  return (
    <div className="search-page">
      <Breadcrumbs items={[{ label: 'Recherche de pièces' }]} />

      <div className="container" style={{ paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '780px', margin: '1rem auto 3rem', textAlign: 'center' }}>
          <span className="section-tag">Moteur de Recherche Dédié</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Explorer le Vestiaire LOOP
          </h1>

          <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: '#8FA88A' }} />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchQuery(e.target.value);
              }}
              placeholder="Rechercher par vêtement, matière (soie, laine, cachemire), marque vintage..."
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 48px',
                fontSize: '1.05rem',
                border: '1px solid #D5CCBE',
                borderRadius: '4px',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>

          {/* Quick suggestions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.8rem', color: '#6B6862' }}>
            <span>Recherches rapides :</span>
            {['Blazer', 'Soie', 'YSL', 'Courrèges', 'Cachemire', 'Trench', 'Sac Céline'].map(term => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  setSearchQuery(term);
                }}
                style={{
                  backgroundColor: '#FAF8F4',
                  border: '1px solid #E8E2D6',
                  borderRadius: '2px',
                  padding: '3px 8px',
                  cursor: 'pointer'
                }}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #E8E2D6' }}>
          <div style={{ fontSize: '0.95rem', color: '#242424' }}>
            Résultats pour {query ? <strong>« {query} »</strong> : 'tout le vestiaire'} : <strong>{searchResults.length}</strong> pièces trouvées
          </div>
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSearchQuery('');
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#A65D43' }}
            >
              <RotateCcw size={13} />
              <span>Réinitialiser la recherche</span>
            </button>
          )}
        </div>

        {/* Results Grid */}
        {searchResults.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.75rem' }}>
              Aucun résultat pour cette recherche.
            </h3>
            <p style={{ color: '#6B6862', maxWidth: '440px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
              Nos pièces sont des pièces uniques renouvelées chaque semaine. Essayez avec un mot-clé plus générique comme « blazer », « laine » ou « robe ».
            </p>
            <button className="btn btn-primary" onClick={() => setQuery('')}>
              Voir toutes les pièces
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {searchResults.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
