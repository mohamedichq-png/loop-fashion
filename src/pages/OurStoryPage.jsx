import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function OurStoryPage() {
  const { t, navigate } = useStore();

  return (
    <div className="our-story-page">
      <Breadcrumbs items={[{ label: 'Notre Histoire' }]} />

      {/* Hero Editorial */}
      <section style={{ backgroundColor: '#FAF8F4', padding: '4rem 0 5rem', borderBottom: '1px solid #E8E2D6', marginBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
          <span className="section-tag">Maison de Curatelle Parisienne</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 500, lineHeight: 1.15, marginBottom: '1.5rem', color: '#242424' }}>
            « Le style se réinvente.<br />Les belles pièces continuent. »
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#6B6862', lineHeight: 1.7, fontWeight: 300 }}>
            LOOP FASHION est née d’une conviction simple : les vêtements les plus désirables, les mieux coupés et les plus durables existent déjà. Notre mission est de les dénicher, les célébrer et leur offrir une nouvelle histoire.
          </p>
        </div>
      </section>

      {/* Story Narrative */}
      <div className="container" style={{ maxWidth: '1080px', paddingBottom: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80"
            alt="L'artisanat du vêtement vintage chez LOOP FASHION"
            style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: '2px', boxShadow: 'var(--shadow-md)' }}
          />

          <div>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A65D43', fontWeight: 600 }}>
              Genèse & Philosophie
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 600, margin: '0.75rem 0 1.5rem' }}>
              Redonner leurs lettres de noblesse aux trésors d'archives
            </h2>
            <p style={{ fontSize: '1rem', color: '#383838', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              Face à la prolifération de vêtements standardisés et éphémères, LOOP FASHION prend le contre-pied : nous arpentons les archives de la confection française et européenne des années 70, 80 et 90 pour sélectionner des pièces d'une qualité textile aujourd'hui presque introuvable.
            </p>
            <p style={{ fontSize: '1rem', color: '#383838', lineHeight: 1.8 }}>
              Ce sont des blazers d'ateliers parisiens montés sur toile, des trenchs en gabardine de coton dense, des soies lavées au tombé caressant et des pulls en cachemire 4 fils confectionnés avec une patience infinie.
            </p>
          </div>
        </div>

        {/* Curation Process */}
        <div style={{ backgroundColor: '#EDE7DC', padding: '4rem 3rem', borderRadius: '4px', marginBottom: '6rem', border: '1px solid #D5CCBE' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span className="section-tag" style={{ color: '#8FA88A' }}>Le Protocole Exigeant</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 600 }}>
              Comment nous sélectionnons chaque pièce
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '2px', border: '1px solid #E8E2D6' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F0F4EF', color: '#8FA88A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Sparkles size={20} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.65rem' }}>
                1. Chinerie Individuelle
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6B6862', lineHeight: 1.6 }}>
                Aucun lot anonyme, aucun arrivage de masse. Chaque pièce est repérée une à une auprès de collectionneurs privés, d'ateliers et de ventes patrimoniales.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '2px', border: '1px solid #E8E2D6' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F9EFEA', color: '#A65D43', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <ShieldCheck size={20} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.65rem' }}>
                2. Examen & Restauration
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6B6862', lineHeight: 1.6 }}>
                Chaque couture, doublure, bouton et fermeture est ausculté. Les pièces sont confiées à un pressing écologique spécialisé pour retrouver leur éclat originel.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '2px', border: '1px solid #E8E2D6' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FAF8F4', color: '#242424', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Award size={20} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.65rem' }}>
                3. Mesures au Millimètre
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6B6862', lineHeight: 1.6 }}>
                Parce que les tailles vintage diffèrent du prêt-à-porter moderne, chaque silhouette est mesurée précisément à plat pour vous garantir un tombé idéal.
              </p>
            </div>
          </div>
        </div>

        {/* Showroom & Conclusion */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '1rem' }}>
            Prête à découvrir notre vestiaire ?
          </h2>
          <p style={{ color: '#6B6862', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Toutes nos pièces sont uniques et n’attendent qu’à écrire un nouveau chapitre avec vous.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/boutique')} style={{ padding: '1rem 2.5rem' }}>
            <span>Explorer la boutique en ligne</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          div[style*="1fr 1.2fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
