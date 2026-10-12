import React from 'react';
import { Sparkles, ArrowRight, Home } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function NotFoundPage() {
  const { navigate } = useStore();

  return (
    <div className="not-found-page" style={{ padding: '6rem 1.5rem 8rem', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        <span 
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '7rem',
            fontWeight: 700,
            lineHeight: 1,
            color: '#A65D43',
            display: 'block',
            marginBottom: '1rem',
            opacity: 0.8
          }}
        >
          404
        </span>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 600, marginBottom: '1rem' }}>
          Cette silhouette n'est plus disponible
        </h1>

        <p style={{ color: '#6B6862', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          La page que vous recherchez a peut-être été déplacée ou cette pièce unique a déjà trouvé sa nouvelle propriétaire.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            <Home size={16} />
            <span>Retour à l'accueil</span>
          </button>

          <button className="btn btn-secondary" onClick={() => navigate('/boutique')}>
            <span>Explorer la boutique</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
