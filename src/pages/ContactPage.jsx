import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ContactPage() {
  const { lang, showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('question-piece');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(lang === 'fr' ? 'Votre message a bien été envoyé. Nous vous répondrons sous 24h.' : 'Message sent successfully. We will reply within 24h.', 'success');
  };

  return (
    <div className="contact-page">
      <Breadcrumbs items={[{ label: 'Contact & Showroom' }]} />

      <section style={{ backgroundColor: '#FAF8F4', padding: '3.5rem 0 4rem', borderBottom: '1px solid #E8E2D6', marginBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span className="section-tag">Conciergerie LOOP FASHION</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, marginBottom: '1rem' }}>
            À Votre Écoute
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#6B6862', lineHeight: 1.6 }}>
            Une question sur la coupe d’un blazer, le tombé d’une soie ou un suivi de commande ? Écrivez-nous ou réservez un essayage privé dans notre showroom parisien.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1080px', paddingBottom: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '4rem', alignItems: 'start' }} className="contact-layout">
          {/* Left Details */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Atelier & Showroom Paris
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F0F4EF', color: '#8FA88A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Adresse</strong>
                  <p style={{ fontSize: '0.88rem', color: '#6B6862', lineHeight: 1.5 }}>
                    LOOP FASHION Paris<br />
                    24 Rue de Turenne, 75003 Paris<br />
                    (Le Marais — sur rendez-vous)
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F9EFEA', color: '#A65D43', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={18} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Email Conciergerie</strong>
                  <p style={{ fontSize: '0.88rem', color: '#6B6862' }}>
                    bonjour@loop-fashion.fr
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FAF8F4', color: '#242424', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={18} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Horaires d’accompagnement</strong>
                  <p style={{ fontSize: '0.88rem', color: '#6B6862', lineHeight: 1.5 }}>
                    Du mardi au samedi : 10h30 — 19h00<br />
                    Réponse sous 24h ouvrées garantie.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#FAF8F4', padding: '1.5rem', borderRadius: '4px', border: '1px solid #E8E2D6' }}>
              <strong style={{ fontSize: '0.9rem', color: '#A65D43', display: 'block', marginBottom: '0.35rem' }}>
                ✦ Rendez-vous privés en Showroom
              </strong>
              <p style={{ fontSize: '0.82rem', color: '#6B6862', lineHeight: 1.6 }}>
                Vous souhaitez essayer une sélection de pièces en toute tranquillité ? Indiquez vos créneaux et les références souhaitées dans votre message.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Envoyez-nous un Message
            </h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle2 size={48} style={{ color: '#8FA88A', margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  Merci pour votre message !
                </h3>
                <p style={{ color: '#6B6862', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Notre équipe a bien reçu votre demande et vous répondra à l'adresse <strong>{email}</strong> dans les plus brefs délais.
                </p>
                <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Votre nom complet *</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Camille Laurent" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Votre email *</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="camille@exemple.fr" className="form-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Objet de votre demande</label>
                  <select value={subject} onChange={e => setSubject(e.target.value)} className="form-select">
                    <option value="question-piece">Question sur les mesures ou l'état d'une pièce</option>
                    <option value="showroom">Demande d'essayage en showroom (Paris 3e)</option>
                    <option value="commande">Suivi de commande ou livraison</option>
                    <option value="retour">Demande de retour / rétractation</option>
                    <option value="presse">Presse & partenariats</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Votre message *</label>
                  <textarea rows={5} required value={message} onChange={e => setMessage(e.target.value)} placeholder="Bonjour, je souhaiterais des précisions sur le tombé de la veste..." className="form-textarea" />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                  <Send size={16} />
                  <span>Transmettre mon message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
