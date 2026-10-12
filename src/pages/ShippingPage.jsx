import React from 'react';
import { Truck, Clock, ShieldCheck, MapPin, Box } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ShippingPage() {
  const { navigate } = useStore();

  return (
    <div className="shipping-page">
      <Breadcrumbs items={[{ label: 'Expédition & Livraison' }]} />

      <section style={{ backgroundColor: '#FAF8F4', padding: '3.5rem 0 4rem', borderBottom: '1px solid #E8E2D6', marginBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span className="section-tag">Politique d'Acheminement</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, marginBottom: '1rem' }}>
            Livraison & Délais d’Expédition
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#6B6862', lineHeight: 1.6 }}>
            Toutes nos pièces sont préparées avec le plus grand soin et expédiées depuis notre atelier à Paris sous 24 à 48 heures ouvrées.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '920px', paddingBottom: '6rem' }}>
        {/* Table of Carriers */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px', overflow: 'hidden', marginBottom: '3rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead style={{ backgroundColor: '#FAF8F4', borderBottom: '1px solid #E8E2D6' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Mode de livraison</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Délai indicatif</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Tarif métropole</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Offert dès</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F5F1E8' }}>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <strong>Colissimo Domicile avec Suivi</strong>
                  <div style={{ fontSize: '0.78rem', color: '#6B6862' }}>La Poste — Remise en boîte aux lettres</div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>48h ouvrées</td>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>5.90 €</td>
                <td style={{ padding: '1.25rem 1.5rem', color: '#8FA88A', fontWeight: 600 }}>150 € d'achat</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F5F1E8' }}>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <strong>Mondial Relay Point Relais</strong>
                  <div style={{ fontSize: '0.78rem', color: '#6B6862' }}>Parmi 12 000 commerçants partenaires</div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>3 à 4 jours ouvrés</td>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>4.50 €</td>
                <td style={{ padding: '1.25rem 1.5rem', color: '#8FA88A', fontWeight: 600 }}>150 € d'achat</td>
              </tr>
              <tr>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <strong>Retrait Showroom Paris Marais</strong>
                  <div style={{ fontSize: '0.78rem', color: '#6B6862' }}>24 Rue de Turenne, 75003 Paris</div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>Sous 24h</td>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#5B7256' }}>Gratuit</td>
                <td style={{ padding: '1.25rem 1.5rem', color: '#5B7256', fontWeight: 600 }}>Tous paniers</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* International Section */}
        <div style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem' }}>
            Expédition vers l'Europe & l'International
          </h2>
          <p style={{ color: '#383838', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
            Nous expédions également vers l'Union Européenne (Belgique, Suisse, Luxembourg, Italie, Allemagne, Espagne, Pays-Bas) via Colissimo International sous 3 à 6 jours ouvrés. Le tarif forfaitaire est de 12.00 € TTC (offert dès 250 € d'achat).
          </p>
          <p style={{ color: '#6B6862', fontSize: '0.88rem' }}>
            Pour les envois hors UE (Suisse, Royaume-Uni), les éventuelles taxes douanières ou droits d'importation restent à la charge du destinataire selon la réglementation locale en vigueur.
          </p>
        </div>

        {/* Packaging note */}
        <div style={{ padding: '2rem', backgroundColor: '#EDE7DC', borderRadius: '4px', border: '1px solid #D5CCBE' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Box size={24} style={{ color: '#A65D43', flexShrink: 0 }} />
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Un emballage protecteur & soigné
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#383838', lineHeight: 1.6 }}>
                Chaque pièce est emballée dans du papier de soie non blanchi, délicatement parfumée à notre essence végétale d'atelier et disposée dans une boîte en carton recyclé certifié FSC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
