import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function AccountPage() {
  const { lang, t, user, setUser, wishlist, showToast, navigate } = useStore();
  const [activeTab, setActiveTab] = useState('orders'); // orders | addresses | preferences

  const handleLogout = () => {
    setUser(null);
    showToast(lang === 'fr' ? 'Vous avez été déconnectée avec succès.' : 'Logged out successfully.', 'info');
  };

  const handleDemoLogin = () => {
    setUser({
      isLoggedIn: true,
      firstName: "Camille",
      lastName: "Laurent",
      email: "camille.laurent@paris-mode.fr",
      phone: "+33 6 12 34 56 78",
      addresses: [
        {
          id: 1,
          isDefault: true,
          title: "Domicile Paris",
          street: "24 Rue de Turenne",
          postalCode: "75003",
          city: "Paris",
          country: "France"
        }
      ],
      orders: [
        {
          id: "LP-2026-9041",
          date: "04 Octobre 2026",
          total: 135,
          status: "Livrée",
          items: [
            {
              id: "lp-001",
              name: "Blazer en Laine Pied-de-Poule Vintage",
              price: 135,
              image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
              size: "38 (FR)"
            }
          ]
        }
      ]
    });
    showToast(lang === 'fr' ? 'Connexion réussie (Session démo)' : 'Demo login successful', 'success');
  };

  if (!user) {
    return (
      <div className="account-page">
        <Breadcrumbs items={[{ label: 'Espace Client' }]} />
        <div className="container" style={{ paddingBottom: '6rem', maxWidth: '520px' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px', padding: '3rem 2rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#FAF8F4', color: '#8FA88A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <User size={30} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem' }}>
              Connexion Client
            </h1>
            <p style={{ color: '#6B6862', fontSize: '0.88rem', marginBottom: '2rem' }}>
              Accédez à vos commandes, factures et adresses d'expédition.
            </p>

            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }} onClick={handleDemoLogin}>
              Se connecter (Compte Démo Camille Laurent)
            </button>

            <div style={{ fontSize: '0.78rem', color: '#8E8A83' }}>
              Nouvelle cliente ? Votre compte se crée automatiquement lors de votre première commande.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <Breadcrumbs items={[{ label: t('account_title') }]} />

      <div className="container" style={{ paddingBottom: '6rem' }}>
        {/* Welcome Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid #E8E2D6', paddingBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A65D43', fontWeight: 600 }}>
              Bienvenue dans votre vestiaire
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 600 }}>
              {user.firstName} {user.lastName}
            </h1>
            <p style={{ color: '#6B6862', fontSize: '0.9rem' }}>{user.email}</p>
          </div>

          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
            <LogOut size={14} />
            <span>Se déconnecter</span>
          </button>
        </div>

        {/* Tab Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '3rem', alignItems: 'start' }} className="account-layout">
          {/* Tabs Menu */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px', overflow: 'hidden' }}>
            <button
              onClick={() => setActiveTab('orders')}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                textAlign: 'left',
                backgroundColor: activeTab === 'orders' ? '#FAF8F4' : '#FFF',
                borderLeft: activeTab === 'orders' ? '3px solid #A65D43' : '3px solid transparent',
                color: activeTab === 'orders' ? '#A65D43' : '#242424',
                borderBottom: '1px solid #F5F1E8'
              }}
            >
              <Package size={17} />
              <span>{t('account_orders')} ({user.orders?.length || 0})</span>
            </button>

            <button
              onClick={() => navigate('/favoris')}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                textAlign: 'left',
                backgroundColor: '#FFF',
                borderLeft: '3px solid transparent',
                color: '#242424',
                borderBottom: '1px solid #F5F1E8'
              }}
            >
              <Heart size={17} />
              <span>{t('account_wishlist')} ({wishlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                textAlign: 'left',
                backgroundColor: activeTab === 'addresses' ? '#FAF8F4' : '#FFF',
                borderLeft: activeTab === 'addresses' ? '3px solid #A65D43' : '3px solid transparent',
                color: activeTab === 'addresses' ? '#A65D43' : '#242424',
                borderBottom: '1px solid #F5F1E8'
              }}
            >
              <MapPin size={17} />
              <span>{t('account_addresses')}</span>
            </button>

            <button
              onClick={() => setActiveTab('preferences')}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                textAlign: 'left',
                backgroundColor: activeTab === 'preferences' ? '#FAF8F4' : '#FFF',
                borderLeft: activeTab === 'preferences' ? '3px solid #A65D43' : '3px solid transparent',
                color: activeTab === 'preferences' ? '#A65D43' : '#242424'
              }}
            >
              <Settings size={17} />
              <span>{t('account_preferences')}</span>
            </button>
          </div>

          {/* Tab Content */}
          <main>
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
                  Vos Commandes Récentes
                </h2>

                {(!user.orders || user.orders.length === 0) ? (
                  <p style={{ color: '#6B6862' }}>Vous n'avez pas encore passé de commande.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {user.orders.map(order => (
                      <div key={order.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px', padding: '1.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F5F1E8', paddingBottom: '1rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', color: '#8E8A83' }}>Référence :</span>
                            <strong style={{ marginLeft: '6px' }}>{order.id}</strong>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.75rem', color: '#8E8A83' }}>Date :</span>
                            <span style={{ marginLeft: '6px' }}>{order.date}</span>
                          </div>
                          <span className="badge badge-sage">
                            <CheckCircle2 size={12} />
                            {order.status || 'Confirmée'}
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
                          {order.items.map(item => (
                            <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                              <img src={item.images ? item.images[0] : item.image} alt="" style={{ width: '56px', height: '70px', objectFit: 'cover', borderRadius: '2px' }} />
                              <div style={{ flexGrow: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                                <div style={{ fontSize: '0.78rem', color: '#6B6862' }}>Taille : {item.selectedSize || item.size}</div>
                              </div>
                              <div style={{ fontWeight: 700 }}>{item.price} €</div>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F5F1E8', paddingTop: '1rem', fontSize: '0.9rem' }}>
                          <span style={{ color: '#6B6862' }}>Montant total réglé TTC :</span>
                          <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#A65D43' }}>{order.total} €</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
                  Vos Adresses Enregistrées
                </h2>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px', padding: '1.5rem', maxWidth: '420px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong>Domicile (Par défaut)</strong>
                    <span className="badge badge-outline">Principale</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#383838', lineHeight: 1.6 }}>
                    Camille Laurent<br />
                    24 Rue de Turenne<br />
                    75003 Paris, France<br />
                    Tél : +33 6 12 34 56 78
                  </p>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
                  Préférences & Confidentialité
                </h2>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px', padding: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#A65D43', width: '18px', height: '18px' }} />
                    <span style={{ fontSize: '0.88rem' }}>Recevoir l'annonce hebdomadaire des nouveaux arrivages par email</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#8FA88A', width: '18px', height: '18px' }} />
                    <span style={{ fontSize: '0.88rem' }}>Notifications de suivi de livraison par SMS</span>
                  </label>
                  <button className="btn btn-primary" onClick={() => showToast('Préférences enregistrées avec succès', 'success')}>
                    Sauvegarder mes préférences
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .account-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
