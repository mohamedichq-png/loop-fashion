import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Breadcrumbs({ items = [] }) {
  const { navigate } = useStore();

  return (
    <nav className="breadcrumbs" aria-label="Fil d'Ariane">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <Home size={14} />
            <span>Accueil</span>
          </a>

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <React.Fragment key={item.label || idx}>
                <ChevronRight size={13} style={{ color: '#8E8A83' }} />
                {isLast || !item.href ? (
                  <span style={{ color: '#242424', fontWeight: 500 }}>
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
