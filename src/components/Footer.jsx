import React, { useState } from 'react';
import { 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Logo from './Logo';

export default function Footer() {
  const { lang, t, showToast, navigate } = useStore();
  const [email, setEmail] = useState('');
  const [consented, setConsented] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg(lang === 'fr' ? 'Veuillez saisir une adresse email valide.' : 'Please enter a valid email address.');
      return;
    }
    if (!consented) {
      setErrorMsg(lang === 'fr' ? 'Veuillez cocher la case de consentement.' : 'Please tick the consent checkbox.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
    showToast(t('sec_newsletter_success'), 'success');
  };

  const handleLink = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="site-footer">
      {/* Trust Pillars Ribbon */}
      <div className="container" style={{ marginBottom: '4.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(143, 168, 138, 0.15)', color: '#8FA88A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h4 style={{ color: '#F5F1E8', fontSize: '1.05rem', marginBottom: '0.35rem', fontWeight: 600 }}>{t('trust_1_title')}</h4>
              <p style={{ color: '#8E8A83', fontSize: '0.82rem', lineHeight: 1.5 }}>{t('trust_1_desc')}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(166, 93, 67, 0.15)', color: '#A65D43', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 style={{ color: '#F5F1E8', fontSize: '1.05rem', marginBottom: '0.35rem', fontWeight: 600 }}>{t('trust_2_title')}</h4>
              <p style={{ color: '#8E8A83', fontSize: '0.82rem', lineHeight: 1.5 }}>{t('trust_2_desc')}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(143, 168, 138, 0.15)', color: '#8FA88A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck size={20} />
            </div>
            <div>
              <h4 style={{ color: '#F5F1E8', fontSize: '1.05rem', marginBottom: '0.35rem', fontWeight: 600 }}>{t('trust_3_title')}</h4>
              <p style={{ color: '#8E8A83', fontSize: '0.82rem', lineHeight: 1.5 }}>{t('trust_3_desc')}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(166, 93, 67, 0.15)', color: '#A65D43', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <RotateCcw size={20} />
            </div>
            <div>
              <h4 style={{ color: '#F5F1E8', fontSize: '1.05rem', marginBottom: '0.35rem', fontWeight: 600 }}>{t('trust_4_title')}</h4>
              <p style={{ color: '#8E8A83', fontSize: '0.82rem', lineHeight: 1.5 }}>{t('trust_4_desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation & Newsletter */}
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <Logo variant="light" size="normal" />
            <p style={{ marginTop: '1.25rem', fontSize: '0.88rem', color: '#8E8A83', lineHeight: 1.6, maxWidth: '340px' }}>
              {t('footer_about_text')}
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#F5F1E8' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: '#F5F1E8' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#F5F1E8' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Boutique Links */}
          <div>
            <h4 className="footer-heading">{t('footer_links_shop')}</h4>
            <ul className="footer-links">
              <li><a href="/boutique" onClick={(e) => handleLink(e, '/boutique')}>Toutes les pièces</a></li>
              <li><a href="/nouveautes" onClick={(e) => handleLink(e, '/nouveautes')}>Nouveaux arrivages</a></li>
              <li><a href="/vestes-blazers" onClick={(e) => handleLink(e, '/vestes-blazers')}>Vestes & Blazers</a></li>
              <li><a href="/robes" onClick={(e) => handleLink(e, '/robes')}>Robes féminines</a></li>
              <li><a href="/vintage" onClick={(e) => handleLink(e, '/vintage')}>Archives Vintage</a></li>
              <li><a href="/sacs" onClick={(e) => handleLink(e, '/sacs')}>Maroquinerie & Sacs</a></li>
              <li><a href="/accessoires" onClick={(e) => handleLink(e, '/accessoires')}>Accessoires & Carrés</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="footer-heading">{t('footer_links_service')}</h4>
            <ul className="footer-links">
              <li><a href="/notre-histoire" onClick={(e) => handleLink(e, '/notre-histoire')}>Notre histoire</a></li>
              <li><a href="/engagements" onClick={(e) => handleLink(e, '/engagements')}>Nos engagements</a></li>
              <li><a href="/faq" onClick={(e) => handleLink(e, '/faq')}>Questions fréquentes (FAQ)</a></li>
              <li><a href="/livraison" onClick={(e) => handleLink(e, '/livraison')}>Livraison & Délais</a></li>
              <li><a href="/retours" onClick={(e) => handleLink(e, '/retours')}>Retours sous 14 jours</a></li>
              <li><a href="/contact" onClick={(e) => handleLink(e, '/contact')}>Nous contacter</a></li>
              <li><a href="/compte" onClick={(e) => handleLink(e, '/compte')}>Mon compte</a></li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h4 className="footer-heading">{t('footer_links_legal')}</h4>
            <ul className="footer-links">
              <li><a href="/mentions-legales" onClick={(e) => handleLink(e, '/mentions-legales')}>Mentions légales</a></li>
              <li><a href="/conditions-generales" onClick={(e) => handleLink(e, '/conditions-generales')}>Conditions Générales (CGV)</a></li>
              <li><a href="/confidentialite" onClick={(e) => handleLink(e, '/confidentialite')}>Politique de confidentialité</a></li>
              <li><a href="/cookies" onClick={(e) => handleLink(e, '/cookies')}>Préférences de cookies</a></li>
              <li><a href="/favoris" onClick={(e) => handleLink(e, '/favoris')}>Mes pièces favorites</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="footer-heading">{t('sec_newsletter_title')}</h4>
            <p style={{ fontSize: '0.82rem', color: '#8E8A83', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {t('sec_newsletter_sub')}
            </p>

            {submitted ? (
              <div style={{ padding: '1rem', backgroundColor: 'rgba(143, 168, 138, 0.15)', border: '1px solid #8FA88A', borderRadius: '4px', fontSize: '0.82rem', color: '#8FA88A' }}>
                {t('sec_newsletter_success')}
              </div>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('sec_newsletter_placeholder')}
                    style={{
                      flexGrow: 1,
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      borderRadius: '2px',
                      padding: '0.7rem 0.85rem',
                      color: '#F5F1E8',
                      fontSize: '0.82rem'
                    }}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-terracotta"
                    style={{ padding: '0.7rem 1rem' }}
                    aria-label="S'inscrire"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.72rem', color: '#8E8A83', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={consented} 
                    onChange={(e) => setConsented(e.target.checked)}
                    style={{ marginTop: '2px', accentColor: '#A65D43' }} 
                  />
                  <span>{t('sec_newsletter_consent')}</span>
                </label>

                {errorMsg && (
                  <p style={{ color: '#E58F78', fontSize: '0.75rem' }}>{errorMsg}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div 
          style={{
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
            fontSize: '0.78rem',
            color: '#8E8A83'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} LOOP FASHION Paris &bull; {t('footer_rights')}
          </div>

          {/* Payment Badges (Clean, authentic representation) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '0.72rem', marginRight: '0.5rem' }}>Paiement sécurisé :</span>
            {['Carte Bancaire', 'Visa', 'Mastercard', 'Apple Pay', 'PayPal'].map((method) => (
              <span
                key={method}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  padding: '3px 8px',
                  borderRadius: '3px',
                  fontSize: '0.68rem',
                  letterSpacing: '0.04em',
                  color: '#FAF8F4',
                  border: '1px solid rgba(255,255,255,0.12)'
                }}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
