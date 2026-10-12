import React, { useState } from 'react';
import { ShieldCheck, Settings, FileText, Lock, Cookie } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function LegalPage({ type = 'mentions-legales' }) {
  const { saveCookieConsent } = useStore();
  const [showCookieModal, setShowCookieModal] = useState(false);

  // Content configuration for each legal page
  const content = {
    'mentions-legales': {
      title: "Mentions Légales",
      tag: "Transparence & Cadre Légal",
      intro: "Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (L.C.E.N.), nous portons à la connaissance des utilisateurs les informations légales suivantes :",
      sections: [
        {
          heading: "1. Éditeur de la Plateforme",
          body: `Le site internet LOOP FASHION accessible à l'adresse www.loop-fashion.fr est édité par :
- Raison sociale : [Raison Sociale — ex : LOOP FASHION SAS]
- Forme juridique : [Société par Actions Simplifiée au capital de XX XXX €]
- Siège social : [Adresse exacte du siège social, 75003 Paris, France]
- Immatriculation RCS : [Numéro RCS Paris et numéro SIRET]
- Numéro de TVA intracommunautaire : [FR XX XXXXXXXXX]
- Directeur de la publication : [Nom & Prénom de la fondatrice / représentante légale]
- Contact électronique : bonjour@loop-fashion.fr
- Contact téléphonique : [Numéro de téléphone professionnel]`
        },
        {
          heading: "2. Hébergement du Site",
          body: `Le site est hébergé par :
- Hébergeur : [Nom de l'hébergeur — ex : Vercel Inc. / Scaleway SAS / AWS Europe]
- Adresse de l'hébergeur : [Adresse du siège de l'hébergeur]
- Téléphone de l'hébergeur : [Coordonnées de l'hébergeur]`
        },
        {
          heading: "3. Propriété Intellectuelle",
          body: `L'ensemble des éléments constituant le site LOOP FASHION (architecture graphique, logo infinity hanger, photographies éditoriales, textes, fiches descriptives, éléments typographiques) constitue une œuvre protégée par le Code de la propriété intellectuelle. Toute reproduction, représentation ou exploitation partielle ou totale sans autorisation écrite préalable est strictement interdite.`
        }
      ]
    },

    'conditions-generales': {
      title: "Conditions Générales de Vente (CGV)",
      tag: "Contrat de Vente en Ligne",
      intro: "Les présentes Conditions Générales de Vente régissent l'ensemble des transactions conclues sur le site LOOP FASHION entre l'Éditeur et toute personne physique agissant en qualité de consommatrice.",
      sections: [
        {
          heading: "Article 1 — Nature des Pièces (Seconde Main & Vintage)",
          body: `Les articles proposés sont des vêtements et accessoires féminins de seconde main et pièces d'archives vintage. En raison de leur nature, la quasi-totalité des pièces est proposée en exemplaire unique (stock = 1). L'état d'usage de chaque pièce est audité et consigné avec précision dans la fiche descriptive (État neuf, Excellent état, Très bon état).`
        },
        {
          heading: "Article 2 — Commandes & Disponibilité",
          body: `La validation de la commande par la cliente entraîne l'acceptation pleine et entière des présentes CGV. Dès confirmation du paiement, la pièce est immédiatement réservée et retirée de la vente.`
        },
        {
          heading: "Article 3 — Prix & Modalités de Règlement",
          body: `Les prix sont indiqués en Euros (€) toutes taxes comprises (TTC), hors frais de livraison. Le règlement s'effectue en ligne via carte bancaire sécurisée (3D Secure), Apple Pay ou PayPal. L'encaissement est immédiat lors de la confirmation.`
        },
        {
          heading: "Article 4 — Droit Légal de Rétractation (14 Jours)",
          body: `Conformément à l'article L.221-18 du Code de la consommation, la cliente dispose d'un délai légal de 14 jours calendaires à compter de la réception de son colis pour exercer son droit de rétractation sans pénalité. Les pièces doivent être retournées dans leur état d'origine munies de leur étiquette de scellé LOOP FASHION.`
        },
        {
          heading: "Article 5 — Garanties Légales & Règlement des Litiges",
          body: `Les articles bénéficient de la garantie légale de conformité (art. L.217-4 et suivants du Code de la consommation) et de la garantie contre les vices cachés (art. 1641 du Code civil). En cas de litige non résolu à l'amiable, la cliente peut recourir gratuitement au service de médiation de la consommation : [Nom et coordonnées du médiateur agréé].`
        }
      ]
    },

    'confidentialite': {
      title: "Politique de Confidentialité & Données Personnelles",
      tag: "Protection RGPD",
      intro: "LOOP FASHION attache une importance fondamentale à la confidentialité de vos données personnelles. La présente politique détaille notre engagement conforme au Règlement Général sur la Protection des Données (RGPD 2016/679) et à la loi Informatique et Libertés.",
      sections: [
        {
          heading: "1. Responsable de Traitement",
          body: `Le responsable du traitement des données personnelles collectées est : [Raison Sociale de l'entreprise], dont le siège est situé à [Adresse du siège], représentée par [Nom du DPO / Représentant légal]. Contact : privacy@loop-fashion.fr`
        },
        {
          heading: "2. Données Collectées & Finalités",
          body: `- Gestion des commandes et livraison : nom, prénom, adresse postale, email, numéro de téléphone (base légale : exécution du contrat).
- Gestion de la relation client et conciergerie (base légale : intérêt légitime).
- Newsletter et invitations exclusives : avec votre consentement explicite révocable à tout moment.`
        },
        {
          heading: "3. Non-Cession des Données & Conservation",
          body: `LOOP FASHION ne vend, ne loue et ne cède aucune donnée personnelle à des tiers à des fins publicitaires. Vos données sont conservées pendant la durée nécessaire aux finalités contractuelles et aux obligations comptables légales (5 ans pour les factures).`
        },
        {
          heading: "4. Vos Droits Informatique et Libertés",
          body: `Vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition au traitement de vos données. Pour exercer vos droits, adressez votre demande accompagnée d'un justificatif à privacy@loop-fashion.fr. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).`
        }
      ]
    },

    'cookies': {
      title: "Gestion des Cookies & Témoins de Connexion",
      tag: "Consentement & Préférences",
      intro: "Cette page vous informe sur l'utilisation des cookies lors de votre navigation sur www.loop-fashion.fr et vous permet d'ajuster vos choix de consentement à tout instant.",
      sections: [
        {
          heading: "1. Qu'est-ce qu'un cookie ?",
          body: `Un cookie est un petit fichier texte déposé sur votre terminal lors de la consultation d'un site web. Il permet au site de mémoriser vos actions et préférences (panier d'achat, langue d'affichage) pendant une durée déterminée.`
        },
        {
          heading: "2. Types de cookies utilisés",
          body: `- Cookies essentiels de navigation : nécessaires au maintien de la session, de l'état du panier et de la sécurité.
- Cookies de mesure d'audience anonymisée : permettant d'optimiser l'ergonomie de nos pages.
- Cookies de personnalisation : permettant d'adapter les suggestions selon vos préférences.`
        }
      ]
    }
  };

  const activeContent = content[type] || content['mentions-legales'];

  return (
    <div className="legal-page">
      <Breadcrumbs items={[{ label: activeContent.title }]} />

      <section style={{ backgroundColor: '#FAF8F4', padding: '3.5rem 0 4rem', borderBottom: '1px solid #E8E2D6', marginBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <span className="section-tag" style={{ color: '#8FA88A' }}>{activeContent.tag}</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, marginBottom: '1rem' }}>
            {activeContent.title}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#6B6862', lineHeight: 1.6 }}>
            {activeContent.intro}
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '860px', paddingBottom: '6rem' }}>
        {/* Placeholder banner */}
        <div style={{ padding: '1rem 1.25rem', backgroundColor: '#FAF8F4', borderLeft: '4px solid #A65D43', marginBottom: '3rem', fontSize: '0.82rem', color: '#6B6862' }}>
          <strong>Note de conformité éditoriale :</strong> Les champs entre crochets [Raison Sociale, SIRET, etc.] sont des variables prêtes à accueillir les informations juridiques immatriculées définitives de l'entreprise.
        </div>

        {/* Content blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {activeContent.sections.map((sec, idx) => (
            <article key={idx} style={{ backgroundColor: '#FFFFFF', padding: '2rem', border: '1px solid #E8E2D6', borderRadius: '4px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 600, marginBottom: '1rem', color: '#242424' }}>
                {sec.heading}
              </h2>
              <div style={{ fontSize: '0.92rem', color: '#383838', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {sec.body}
              </div>
            </article>
          ))}
        </div>

        {/* Interactive cookie reset button for cookies page */}
        {type === 'cookies' && (
          <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2.5rem', backgroundColor: '#FAF8F4', border: '1px solid #E8E2D6', borderRadius: '4px' }}>
            <Cookie size={32} style={{ color: '#8FA88A', margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              Modifier vos choix de consentement
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#6B6862', marginBottom: '1.5rem' }}>
              Vous pouvez réinitialiser vos autorisations à tout instant.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem('loop_cookie_consent');
                window.location.reload();
              }}
              className="btn btn-primary"
            >
              <Settings size={15} />
              <span>Ouvrir le panneau de paramétrage</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
