import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function FaqPage() {
  const { navigate } = useStore();
  const [openIdx, setOpenIdx] = useState(0);

  const faqItems = [
    {
      q: "D'où proviennent les pièces proposées sur LOOP FASHION ?",
      a: "Toutes nos pièces sont chinées individuellement par nos curatrices auprès de collections privées, de successions patrimoniales et d'ateliers d'artisans en France et en Europe. Nous n'achetons jamais de balles de fripes industrielles en vrac : chaque pièce est choisie une à une pour son allure, sa noblesse de matière et sa coupe."
    },
    {
      q: "Comment êtes-vous sûrs de l'état des vêtements ?",
      a: "Chaque vêtement traverse un protocole d'inspection complet : contrôle de la structure, des coutures, de la doublure, des boutons et fermetures. Tout détail d'usage naturel est scrupuleusement photographié et mentionné dans la fiche produit. Chaque pièce est confiée à un pressing écologique avant d'être mise en ligne."
    },
    {
      q: "Comment choisir ma taille pour un vêtement vintage ?",
      a: "Les étiquettes de taille des années 70 ou 80 taillent souvent plus petit que le prêt-à-porter actuel. C'est pourquoi nous mesurons chaque vêtement à plat : carrure, tour de poitrine, longueur totale et manches. Nous vous invitons à comparer ces mesures avec votre pièce favorite dans votre penderie pour un ajustement certain."
    },
    {
      q: "Quels sont les délais d'expédition et les transporteurs ?",
      a: "Vos commandes sont préparées et expédiées sous 24 à 48 heures ouvrées depuis notre atelier parisien. Vous avez le choix entre Colissimo Suivi à Domicile (48h), Mondial Relay en Point Relais (3-4 jours), ou le retrait gratuit au Showroom du Marais à Paris."
    },
    {
      q: "Puis-je retourner une pièce si elle ne me convient pas ?",
      a: "Oui, sans aucune hésitation. Conformément à la législation française (art. L.221-18 du Code de la consommation), vous bénéficiez de 14 jours calendaires dès réception du colis pour nous retourner la pièce dans son état d'origine. Dès réception dans notre atelier, vous êtes remboursée sous 72h."
    },
    {
      q: "Les pièces sont-elles uniques ?",
      a: "Oui, la quasi-totalité de notre vestiaire se compose de pièces uniques d'archive (quantité 1). Une fois qu'une pièce est commandée, elle est définitivement retirée du catalogue."
    },
    {
      q: "Quels modes de paiement acceptez-vous ?",
      a: "Nous acceptons les Cartes Bancaires (CB, Visa, Mastercard) via notre passerelle bancaire cryptée SSL 3D-Secure, ainsi qu'Apple Pay et PayPal. Vos coordonnées bancaires ne transitent jamais sur nos serveurs."
    }
  ];

  return (
    <div className="faq-page">
      <Breadcrumbs items={[{ label: 'Questions Fréquentes (FAQ)' }]} />

      <section style={{ backgroundColor: '#FAF8F4', padding: '3.5rem 0 4rem', borderBottom: '1px solid #E8E2D6', marginBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span className="section-tag">Aide & Informations</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, marginBottom: '1rem' }}>
            Foire Aux Questions
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#6B6862', lineHeight: 1.6 }}>
            Tout ce que vous souhaitez savoir sur la provenance de nos pièces, la prise de mesures, l'expédition et notre politique de retours sereins.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '840px', paddingBottom: '6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqItems.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E2D6',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.4rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    textAlign: 'left',
                    backgroundColor: isOpen ? '#FAF8F4' : '#FFF',
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    color: '#242424',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp size={18} style={{ color: '#A65D43' }} /> : <ChevronDown size={18} style={{ color: '#8E8A83' }} />}
                </button>

                {isOpen && (
                  <div style={{ padding: '1.5rem', borderTop: '1px solid #E8E2D6', color: '#5C5852', fontSize: '0.92rem', lineHeight: 1.7 }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2.5rem', backgroundColor: '#FAF8F4', borderRadius: '4px', border: '1px solid #E8E2D6' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            Vous n'avez pas trouvé votre réponse ?
          </h3>
          <p style={{ color: '#6B6862', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
            Notre équipe se tient à votre entière disposition par email ou sur rendez-vous.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Poser une question à notre équipe
          </button>
        </div>
      </div>
    </div>
  );
}
