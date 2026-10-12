import React from 'react';
import { ShieldCheck, Sparkles, Truck, RotateCcw, Check, Box, HeartHandshake } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function EngagementsPage() {
  const { navigate } = useStore();

  return (
    <div className="engagements-page">
      <Breadcrumbs items={[{ label: 'Nos Engagements' }]} />

      <section style={{ backgroundColor: '#FAF8F4', padding: '4rem 0 5rem', borderBottom: '1px solid #E8E2D6', marginBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '840px', textAlign: 'center' }}>
          <span className="section-tag" style={{ color: '#8FA88A' }}>Transparence & Qualité Vérifiée</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', fontWeight: 500, lineHeight: 1.2, marginBottom: '1.25rem' }}>
            Des Engagements Concrets, Vérifiés et Tenus
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#6B6862', lineHeight: 1.7, fontWeight: 300 }}>
            Chez LOOP FASHION, nous refusons les promesses écologiques vagues. Nous préférons une démarche transparente et tangible axée sur le respect du vêtement, de votre confiance et de la législation française.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '960px', paddingBottom: '6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {/* Engagement 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#F0F4EF', color: '#8FA88A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={32} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                1. Contrôle Rigoureux Pièce par Pièce
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#383838', lineHeight: 1.7, marginBottom: '1rem' }}>
                Contrairement aux plateformes de revente entre particuliers, aucune pièce n’est mise en ligne sans avoir été préalablement manipulée, examinée sous lumière neutre, nettoyée et mesurée par nos soins à Paris.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: '#5C5852' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} style={{ color: '#8FA88A' }} /> Vérification des coutures, des poches et de la tenue des boutons.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} style={{ color: '#8FA88A' }} /> Examen minutieux des doublures intérieures pour déceler toute usure.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} style={{ color: '#8FA88A' }} /> Description fidèle et photographies non retouchées pour chaque pièce.
                </li>
              </ul>
            </div>
          </div>

          {/* Engagement 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#F9EFEA', color: '#A65D43', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box size={32} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                2. Emballages Responsables & Expédition Raisonnée
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#383838', lineHeight: 1.7, marginBottom: '1rem' }}>
                Nous protégeons vos pièces de collection avec des matériaux recyclés et recyclables conçus pour minimiser l’empreinte sans compromettre le plaisir de l’ouverture :
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: '#5C5852' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} style={{ color: '#A65D43' }} /> Cartons certifiés FSC recyclés, adaptés à la juste taille du vêtement.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} style={{ color: '#A65D43' }} /> Papier de soie non blanchi et adhésifs kraft écologiques sans plastique.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} style={{ color: '#A65D43' }} /> Expéditions groupées pour limiter les trajets postaux superflus.
                </li>
              </ul>
            </div>
          </div>

          {/* Engagement 3 */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#FAF8F4', color: '#242424', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RotateCcw size={32} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                3. Respect Scrupuleux du Droit de Rétractation de 14 Jours
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#383838', lineHeight: 1.7, marginBottom: '1rem' }}>
                Acheter de la seconde main en ligne doit être aussi serein qu'acheter du neuf. Conformément à l'article L.221-18 du Code de la consommation français, vous bénéficiez d'un délai légal de 14 jours francs pour essayer votre pièce et nous la retourner si la coupe ne correspond pas parfaitement à vos attentes.
              </p>
              <p style={{ fontSize: '0.88rem', color: '#6B6862' }}>
                Le remboursement intervient sous 72h à compter de la réception de la pièce dans notre atelier parisien.
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '5rem', padding: '3rem', backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>
            Une question sur notre démarche ou sur une pièce ?
          </h3>
          <p style={{ color: '#6B6862', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
            Notre équipe de curatrices vous répond avec plaisir et précision.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Contacter la conciergerie LOOP
          </button>
        </div>
      </div>
    </div>
  );
}
