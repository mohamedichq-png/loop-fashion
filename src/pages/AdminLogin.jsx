import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowRight, ArrowLeft, ShieldCheck, KeyRound } from 'lucide-react';
import Logo from '../components/Logo';
import { useStore } from '../context/StoreContext';

export default function AdminLogin({ onLoginSuccess }) {
  const { navigate } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || 'Identifiants invalides.');
        setIsLoading(false);
        return;
      }

      // Save token securely in session storage
      sessionStorage.setItem('loop_admin_token', data.token);
      sessionStorage.setItem('loop_admin_user', JSON.stringify(data.user));
      
      onLoginSuccess(data.token, data.user);
    } catch (err) {
      console.error('Login error', err);
      setErrorMessage('Impossible de joindre le serveur d\'authentification.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="admin-login-view"
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        backgroundColor: '#F5F1E8'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          border: '1px solid #E8E2D6',
          boxShadow: 'var(--shadow-lg)',
          padding: '3rem 2.5rem',
          position: 'relative'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
            <Logo size="normal" showTagline={false} />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(166, 93, 67, 0.1)', color: '#A65D43', padding: '3px 10px', borderRadius: '2px', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <Lock size={12} />
            <span>Portail d'Administration Sécurisé</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 600, marginTop: '0.75rem', color: '#242424' }}>
            Accès Réservé à la Direction
          </h1>
          <p style={{ fontSize: '0.82rem', color: '#6B6862', marginTop: '0.35rem' }}>
            Authentification serveur obligatoire pour la gestion du vestiaire.
          </p>
        </div>

        {errorMessage && (
          <div 
            style={{
              padding: '0.85rem 1rem',
              backgroundColor: '#FDF2F0',
              border: '1px solid #E58F78',
              borderRadius: '3px',
              color: '#A65D43',
              fontSize: '0.82rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            <ShieldAlert size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.78rem' }}>Identifiant Administrateur</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#8E8A83' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@loop-fashion.fr"
                className="form-input"
                style={{ paddingLeft: '38px', fontSize: '0.88rem' }}
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label" style={{ fontSize: '0.78rem' }}>Mot de passe sécurisé</label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#8E8A83' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="form-input"
                style={{ paddingLeft: '38px', fontSize: '0.88rem' }}
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.95rem', fontSize: '0.9rem' }}
          >
            {isLoading ? (
              <span>Vérification sécurisée...</span>
            ) : (
              <>
                <span>Accéder au panneau de contrôle</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div 
          style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #E8E2D6',
            fontSize: '0.78rem',
            color: '#8E8A83',
            lineHeight: 1.5
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#5B7256', fontWeight: 600, marginBottom: '0.35rem' }}>
            <ShieldCheck size={14} />
            <span>Session sécurisée par jeton cryptographique serveur</span>
          </div>
          <p style={{ margin: '0 0 1rem 0' }}>
            Accès strictement réservé aux administrateurs autorisés. Les clés et identifiants sont vérifiés de manière sécurisée côté serveur.
          </p>
          <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: 'none',
                color: '#242424',
                fontSize: '0.8rem',
                textDecoration: 'underline',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <ArrowLeft size={13} />
              <span>Retourner à la boutique publique</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
