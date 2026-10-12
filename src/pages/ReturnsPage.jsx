import React from 'react';
import { RotateCcw, CheckCircle2, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ReturnsPage() {
  const { navigate } = useStore();

  return (
    <div className="returns-page">
      <Breadcrumbs items={[{ label: 'Retours & Rétractation' }]} />

      <section style={{ backgroundColor: '#FAF8F4', padding: '3.5rem 0 4rem', borderBottom: '1px solid #E8E2D6', marginBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span className="section-tag" style={{ color: '#A65D43' }}>Garantie Satisfaction</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, marginBottom: '1rem' }}>
            Retours Sereins sous 14 Jours
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#6B6862', lineHeight: 1.6 }}>
            Achetez en toute confiance. Conformément au Code de la consommation, vous disposez de 14 jours pour essayer votre pièce chez vous et nous la retourner sans motif à fournir.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '860px', paddingBottom: '6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {/* 3 Step Return Guide */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Comment effectuer un retour en 3 étapes simples :
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="return-steps">
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', border: '1px solid #E8E2D6', borderRadius: '4px' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FAF8F4', color: '#A65D43', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '1rem' }}>1</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Notification</h3>
                <p style={{ fontSize: '0.85rem', color: '#6B6862', lineHeight: 1.6 }}>
                  Envoyez un simple email à <strong>retours@loop-fashion.fr</strong> en indiquant votre numéro de commande et la pièce concernée.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', border: '1px solid #E8E2D6', borderRadius: '4px' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FAF8F4', color: '#A65D43', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '1rem' }}>2</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Emballage</h3>
                <p style={{ fontSize: '0.85rem', color: '#6B6862', lineHeight: 1.6 }}>
                  Replacez le vêtement dans son carton d'origine avec son étiquette scellée LOOP intacte et refermez soigneusement le colis.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', border: '1px solid #E8E2D6', borderRadius: '4px' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FAF8F4', color: '#A65D43', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '1rem' }}>3</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Remboursement</h3>
                <p style={{ fontSize: '0.85rem', color: '#6B6862', lineHeight: 1.6 }}>
                  Dès réception et contrôle dans notre atelier, nous procédons au remboursement intégral sous 72 heures sur votre moyen de paiement d'origine.
                </p>
              </div>
            </div>
          </div>

          {/* Conditions */}
          <div style={{ backgroundColor: '#FAF8F4', padding: '2rem', borderRadius: '4px', border: '1px solid #E8E2D6' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Conditions de reprise
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: '#383838' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} style={{ color: '#8FA88A' }} /> La pièce ne doit pas avoir été portée en extérieur, lavée ou altérée.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} style={{ color: '#8FA88A' }} /> L'étiquette de scellé LOOP FASHION doit demeurer attachée au vêtement.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} style={{ color: '#8FA88A' }} /> Les frais postaux de retour sont à la charge de la cliente (affranchissement Colissimo suivi recommandé).
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Adresse pour vos retours :
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#383838', lineHeight: 1.6 }}>
              <strong>LOOP FASHION — Service Retours</strong><br />
              24 Rue de Turenne<br />
              75003 Paris, France
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .return-steps { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
