import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function CheckoutPage() {
  const {
    lang,
    t,
    cart,
    cartSubtotal,
    discountAmount,
    discountedSubtotal,
    appliedDiscount,
    remainingForFreeShipping,
    clearCart,
    user,
    setUser,
    navigate
  } = useStore();

  // Form Fields
  const [email, setEmail] = useState(user?.email || 'camille.laurent@paris-mode.fr');
  const [firstName, setFirstName] = useState(user?.firstName || 'Camille');
  const [lastName, setLastName] = useState(user?.lastName || 'Laurent');
  const [phone, setPhone] = useState(user?.phone || '06 12 34 56 78');
  const [street, setStreet] = useState('24 Rue de Turenne');
  const [postalCode, setPostalCode] = useState('75003');
  const [city, setCity] = useState('Paris');
  const [country, setCountry] = useState('France');

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState('colissimo'); // colissimo | relay | showroom
  const [paymentMethod, setPaymentMethod] = useState('card'); // card | applepay | paypal

  // Card Simulator Fields
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('•••');

  // Submission State
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(null);

  // Compute Shipping Cost
  const shippingCost = shippingMethod === 'showroom' 
    ? 0 
    : remainingForFreeShipping === 0 
      ? 0 
      : shippingMethod === 'relay' 
        ? 4.50 
        : 5.90;

  const totalAmount = discountedSubtotal + shippingCost;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderRef = `LP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const completedOrder = {
      id: orderRef,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      items: [...cart],
      shippingAddress: { firstName, lastName, street, postalCode, city, country, phone },
      shippingMethod,
      shippingCost,
      total: totalAmount,
      paymentMethod
    };

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: orderRef,
          customer: { firstName, lastName, email, phone },
          shippingAddress: { firstName, lastName, street, postalCode, city, country, phone },
          shippingMethod,
          shippingCost,
          total: totalAmount,
          paymentMethod,
          items: cart.map(it => ({
            id: it.id,
            name: it.name,
            price: it.price,
            selectedSize: it.selectedSize,
            quantity: it.quantity,
            images: it.images
          }))
        })
      });
    } catch (err) {
      console.warn('Failed to sync order to server DB', err);
    }

    // Add to user orders
    if (setUser) {
      setUser(prev => ({
        ...prev,
        orders: [completedOrder, ...(prev?.orders || [])]
      }));
    }

    setOrderCompleted(completedOrder);
    clearCart();
    setIsProcessing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If order is completed, show the official Order Confirmation Receipt
  if (orderCompleted) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem 8rem', maxWidth: '820px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#F0F4EF', color: '#8FA88A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle2 size={40} />
          </div>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8FA88A', fontWeight: 600 }}>
            Commande Validée avec Succès
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', fontWeight: 600, margin: '0.5rem 0' }}>
            Merci pour votre confiance, {orderCompleted.shippingAddress.firstName}.
          </h1>
          <p style={{ color: '#6B6862', fontSize: '1.05rem' }}>
            Votre commande n° <strong>{orderCompleted.id}</strong> a été enregistrée. Un email de confirmation détaillé vous a été adressé à <strong>{email}</strong>.
          </p>
        </div>

        {/* Order Details Receipt Card */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px', padding: '2.5rem', boxShadow: 'var(--shadow-md)', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E8E2D6', paddingBottom: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#8E8A83', textTransform: 'uppercase' }}>Date de commande</span>
              <div style={{ fontWeight: 600 }}>{orderCompleted.date}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#8E8A83', textTransform: 'uppercase' }}>Mode de livraison</span>
              <div style={{ fontWeight: 600 }}>
                {shippingMethod === 'colissimo' ? 'Colissimo Suivi Domicile (48h)' : shippingMethod === 'relay' ? 'Mondial Relay Point Relais' : 'Retrait Showroom Paris (75003)'}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#8E8A83', textTransform: 'uppercase' }}>Paiement</span>
              <div style={{ fontWeight: 600 }}>Carte Bancaire (Sécurisé SSL)</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#8E8A83', textTransform: 'uppercase' }}>Total réglé</span>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#A65D43' }}>{orderCompleted.total.toFixed(2)} €</div>
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '1rem' }}>
            Pièces réservées & expédiées :
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {orderCompleted.items.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #FAF8F4' }}>
                <img src={item.images[0]} alt="" style={{ width: '60px', height: '78px', objectFit: 'cover', borderRadius: '2px' }} />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.72rem', color: '#A65D43', textTransform: 'uppercase', fontWeight: 600 }}>{item.brand}</div>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B6862' }}>Taille : {item.selectedSize} &bull; Pièce Unique Certifiée</div>
                </div>
                <div style={{ fontWeight: 700 }}>{item.price} €</div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#FAF8F4', padding: '1.25rem', borderRadius: '4px', fontSize: '0.85rem', color: '#383838' }}>
            <strong>Adresse d'expédition :</strong><br />
            {orderCompleted.shippingAddress.firstName} {orderCompleted.shippingAddress.lastName}<br />
            {orderCompleted.shippingAddress.street}<br />
            {orderCompleted.shippingAddress.postalCode} {orderCompleted.shippingAddress.city}, {orderCompleted.shippingAddress.country}<br />
            Tél : {orderCompleted.shippingAddress.phone}
          </div>
        </div>

        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={() => navigate('/compte')}>
            Accéder à mon compte
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/boutique')}>
            Continuer mes visites
          </button>
        </div>
      </div>
    );
  }

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>
          Votre panier est actuellement vide.
        </h2>
        <p style={{ color: '#6B6862', marginBottom: '2rem' }}>
          Ajoutez des pièces à votre panier avant de passer commande.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/boutique')}>
          Explorer la boutique
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Breadcrumbs items={[{ label: 'Panier', href: '/panier' }, { label: 'Commande Sécurisée' }]} />

      <div className="container" style={{ paddingBottom: '6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <Lock size={20} style={{ color: '#8FA88A' }} />
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 600 }}>
            {t('checkout_title')}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3.5rem', alignItems: 'start' }} className="checkout-layout">
          {/* Form Side */}
          <form onSubmit={handleSubmitOrder}>
            {/* Step 1: Contact */}
            <section style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px', padding: '2rem', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#242424', color: '#FFF', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
                <span>Coordonnées de l'acheteuse</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Prénom *</label>
                  <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Nom *</label>
                  <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} className="form-input" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email de confirmation *</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone (suivi SMS) *</label>
                  <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="form-input" />
                </div>
              </div>
            </section>

            {/* Step 2: Delivery & Shipping */}
            <section style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px', padding: '2rem', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#242424', color: '#FFF', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
                <span>Adresse & Mode de livraison</span>
              </h2>

              <div className="form-group">
                <label className="form-label">Adresse postale *</label>
                <input type="text" required value={street} onChange={e => setStreet(e.target.value)} className="form-input" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Code Postal *</label>
                  <input type="text" required value={postalCode} onChange={e => setPostalCode(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Ville *</label>
                  <input type="text" required value={city} onChange={e => setCity(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Pays</label>
                  <select value={country} onChange={e => setCountry(e.target.value)} className="form-select">
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Luxembourg">Luxembourg</option>
                  </select>
                </div>
              </div>

              {/* Carrier Selection */}
              <label className="form-label" style={{ marginBottom: '0.75rem', display: 'block' }}>
                Choisir le transporteur
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid', borderColor: shippingMethod === 'colissimo' ? '#A65D43' : '#E8E2D6', borderRadius: '4px', cursor: 'pointer', backgroundColor: shippingMethod === 'colissimo' ? '#FAF8F4' : '#FFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input type="radio" name="shipping" checked={shippingMethod === 'colissimo'} onChange={() => setShippingMethod('colissimo')} style={{ accentColor: '#A65D43' }} />
                    <div>
                      <strong>Colissimo Suivi à Domicile</strong>
                      <div style={{ fontSize: '0.78rem', color: '#6B6862' }}>Livraison sous 48h avec numéro de suivi et remise en boîte aux lettres</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 600 }}>{remainingForFreeShipping === 0 ? 'Offert' : '5.90 €'}</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid', borderColor: shippingMethod === 'relay' ? '#A65D43' : '#E8E2D6', borderRadius: '4px', cursor: 'pointer', backgroundColor: shippingMethod === 'relay' ? '#FAF8F4' : '#FFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input type="radio" name="shipping" checked={shippingMethod === 'relay'} onChange={() => setShippingMethod('relay')} style={{ accentColor: '#A65D43' }} />
                    <div>
                      <strong>Mondial Relay en Point Relais</strong>
                      <div style={{ fontSize: '0.78rem', color: '#6B6862' }}>Retrait dans l'un des 12 000 commerces de proximité (3-4 jours)</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 600 }}>{remainingForFreeShipping === 0 ? 'Offert' : '4.50 €'}</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid', borderColor: shippingMethod === 'showroom' ? '#A65D43' : '#E8E2D6', borderRadius: '4px', cursor: 'pointer', backgroundColor: shippingMethod === 'showroom' ? '#FAF8F4' : '#FFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input type="radio" name="shipping" checked={shippingMethod === 'showroom'} onChange={() => setShippingMethod('showroom')} style={{ accentColor: '#A65D43' }} />
                    <div>
                      <strong>Retrait Showroom Paris Marais (Gratuit)</strong>
                      <div style={{ fontSize: '0.78rem', color: '#6B6862' }}>Disponible sous 24h au 24 Rue de Turenne, 75003 Paris</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 600, color: '#5B7256' }}>Gratuit</span>
                </label>
              </div>
            </section>

            {/* Step 3: Payment */}
            <section style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px', padding: '2rem', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#242424', color: '#FFF', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                <span>Paiement sécurisé crypté SSL</span>
              </h2>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  style={{
                    flexGrow: 1,
                    padding: '0.75rem',
                    border: '1px solid',
                    borderColor: paymentMethod === 'card' ? '#A65D43' : '#E8E2D6',
                    backgroundColor: paymentMethod === 'card' ? '#FAF8F4' : '#FFF',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  Carte Bancaire (CB, Visa, MC)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  style={{
                    flexGrow: 1,
                    padding: '0.75rem',
                    border: '1px solid',
                    borderColor: paymentMethod === 'applepay' ? '#A65D43' : '#E8E2D6',
                    backgroundColor: paymentMethod === 'applepay' ? '#FAF8F4' : '#FFF',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  style={{
                    flexGrow: 1,
                    padding: '0.75rem',
                    border: '1px solid',
                    borderColor: paymentMethod === 'paypal' ? '#A65D43' : '#E8E2D6',
                    backgroundColor: paymentMethod === 'paypal' ? '#FAF8F4' : '#FFF',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  PayPal
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div style={{ backgroundColor: '#FAF8F4', padding: '1.25rem', borderRadius: '4px', border: '1px solid #E8E2D6' }}>
                  <div className="form-group">
                    <label className="form-label">Numéro de carte</label>
                    <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="form-input" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Date d'expiration</label>
                      <input type="text" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Cryptogramme (CVC)</label>
                      <input type="text" value={cardCvc} onChange={e => setCardCvc(e.target.value)} className="form-input" />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#6B6862' }}>
                <ShieldCheck size={16} style={{ color: '#8FA88A' }} />
                <span>Transaction 3D-Secure 256-bit garantie sans conservation de vos données bancaires.</span>
              </div>
            </section>

            <button
              type="submit"
              disabled={isProcessing}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1.2rem', fontSize: '1rem' }}
            >
              {isProcessing ? 'Traitement sécurisé en cours...' : `Confirmer et régler ${totalAmount.toFixed(2)} €`}
            </button>
          </form>

          {/* Right Summary Panel */}
          <aside style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E2D6', borderRadius: '4px', padding: '2rem', position: 'sticky', top: '100px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E8E2D6' }}>
              Votre Sélection ({cart.length})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '340px', overflowY: 'auto' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <img src={item.images[0]} alt="" style={{ width: '50px', height: '65px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }} />
                  <div style={{ flexGrow: 1, fontSize: '0.82rem' }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ color: '#6B6862' }}>Taille : {item.selectedSize}</div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.price} €</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', paddingTop: '1rem', borderTop: '1px solid #E8E2D6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B6862' }}>
                <span>Sous-total articles</span>
                <span>{cartSubtotal.toFixed(2)} €</span>
              </div>
              {appliedDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5B7256', fontWeight: 600 }}>
                  <span>Code privilège (-{appliedDiscount}%)</span>
                  <span>-{discountAmount.toFixed(2)} €</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B6862' }}>
                <span>Frais d'expédition</span>
                <span>{shippingCost === 0 ? 'Offerts' : `${shippingCost.toFixed(2)} €`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 700, color: '#242424', paddingTop: '1rem', borderTop: '1px solid #E8E2D6' }}>
                <span>Total TTC</span>
                <span>{totalAmount.toFixed(2)} €</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
