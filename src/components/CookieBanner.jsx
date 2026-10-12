import React, { useState } from 'react';
import { ShieldCheck, Settings, Check, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CookieBanner() {
  const { cookieConsent, saveCookieConsent } = useStore();
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  // If already consented and not in customization view, do not show
  if (cookieConsent && !showPreferences) return null;

  const handleAcceptAll = () => {
    saveCookieConsent({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now()
    });
  };

  const handleRefuseAll = () => {
    saveCookieConsent({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now()
    });
  };

  const handleSaveCustom = () => {
    saveCookieConsent({
      essential: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: Date.now()
    });
    setShowPreferences(false);
  };

  return (
    <>
      {/* Banner Strip */}
      {!cookieConsent && (
        <div className="cookie-banner">
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', maxWidth: '820px' }}>
                <ShieldCheck size={24} style={{ color: '#8FA88A', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.85rem', color: '#383838', lineHeight: 1.5 }}>
                  <strong>Votre vie privée chez LOOP FASHION :</strong> Nous utilisons des cookies pour assurer le bon fonctionnement de notre boutique, mesurer l'audience de manière anonyme et vous offrir une expérience fluide et sur-mesure. Vous pouvez accepter, refuser ou paramétrer vos préférences à tout moment conformément au RGPD.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 1rem', fontSize: '0.78rem' }}
                >
                  <Settings size={14} />
                  <span>Personnaliser</span>
                </button>

                <button
                  type="button"
                  onClick={handleRefuseAll}
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 1rem', fontSize: '0.78rem' }}
                >
                  Tout refuser
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.4rem', fontSize: '0.78rem' }}
                >
                  Tout accepter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="modal-overlay" onClick={() => setShowPreferences(false)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', padding: '2.5rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600 }}>
                Gestion des préférences de cookies
              </h3>
              <button onClick={() => setShowPreferences(false)} className="action-btn">
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#6B6862', marginBottom: '2rem' }}>
              Choisissez les finalités pour lesquelles vous autorisez le dépôt de témoins de connexion lors de votre navigation sur LOOP FASHION.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {/* Essentiels */}
              <div style={{ padding: '1rem', backgroundColor: '#FAF8F4', border: '1px solid #E8E2D6', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.95rem' }}>Cookies techniques & essentiels</strong>
                  <span className="badge badge-sage">Toujours actif</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#6B6862' }}>
                  Indispensables pour maintenir votre panier, vos préférences linguistiques et la sécurité de vos paiements.
                </p>
              </div>

              {/* Analytics */}
              <div style={{ padding: '1rem', backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.95rem' }}>Mesure d'audience & performances</strong>
                  <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={analyticsAllowed} 
                      onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: '#A65D43' }} 
                    />
                  </label>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#6B6862' }}>
                  Permet de comprendre la fréquentation de nos pages pour améliorer l'ergonomie de la boutique sans identification directe.
                </p>
              </div>

              {/* Marketing */}
              <div style={{ padding: '1rem', backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.95rem' }}>Personnalisation & recommandations</strong>
                  <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={marketingAllowed} 
                      onChange={(e) => setMarketingAllowed(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: '#A65D43' }} 
                    />
                  </label>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#6B6862' }}>
                  Utilisé pour adapter nos suggestions de pièces vintage selon vos pièces favorites précédentes.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowPreferences(false)}
              >
                Annuler
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleSaveCustom}
              >
                <Check size={16} />
                <span>Enregistrer mes choix</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
