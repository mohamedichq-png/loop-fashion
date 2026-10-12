import React from 'react';
import { useStore } from '../context/StoreContext';

/**
 * LOOP FASHION Official Brand Logo
 * Features the official infinity-inspired hanger emblem with sage-green and terracotta tones,
 * and the refined "Loop Fashion" serif wordmark.
 */
export default function Logo({ variant = 'default', size = 'normal', showTagline = true }) {
  const { navigate } = useStore();

  const isSmall = size === 'small';
  const isLarge = size === 'large';

  // Height mappings for pristine responsive layout
  const logoHeight = isSmall ? '38px' : isLarge ? '62px' : '48px';

  return (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        navigate('/');
      }}
      className={`brand-logo brand-logo--${variant} brand-logo--${size}`}
      title="LOOP FASHION — Maison de Curatelle Paris"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        cursor: 'pointer'
      }}
    >
      {/* Official Provided Asset */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: variant === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          padding: variant === 'light' ? '4px 10px' : '0',
          borderRadius: variant === 'light' ? '4px' : '0',
          transition: 'transform 0.2s ease'
        }}
      >
        <img
          src="/logo.png"
          alt="LOOP FASHION"
          style={{
            height: logoHeight,
            width: 'auto',
            objectFit: 'contain',
            mixBlendMode: variant === 'light' ? 'normal' : 'multiply',
            display: 'block'
          }}
        />
      </div>

      {/* Editorial Paris Sub-mark (optional complementary badge) */}
      {showTagline && variant !== 'light' && (
        <div 
          className="brand-logo__location"
          style={{
            borderLeft: '1px solid rgba(143, 168, 138, 0.4)',
            paddingLeft: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#8FA88A',
              lineHeight: 1.1
            }}
          >
            PARIS
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.54rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#A65D43',
              lineHeight: 1.1,
              marginTop: '2px'
            }}
          >
            CURATED VINTAGE
          </span>
        </div>
      )}
    </a>
  );
}
