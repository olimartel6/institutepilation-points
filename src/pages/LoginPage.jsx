import { useState } from 'react'
import { Mail, ShieldCheck, ArrowLeft, Lock, UserPlus, LogIn, Eye } from 'lucide-react'
import config from '../config'
import { sendEmail } from '../services/supabase'

export default function LoginPage({ onLogin, onSignup, onAdminLogin, onDemo, referralFrom }) {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [step, setStep] = useState('info') // 'info' | 'verify' (verify only for signup)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [birthday, setBirthday] = useState('')
  const [code, setCode] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [consent, setConsent] = useState(false)

  const handleSendCode = async (e) => {
    e.preventDefault()
    if (!email || !password || !consent) return
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.')
      return
    }

    setSending(true)
    const newCode = String(Math.floor(1000 + Math.random() * 9000))
    setGeneratedCode(newCode)

    try {
      const sent = await sendEmail('verify_code', email, config.businessName, {
        clientName: name,
        code: newCode,
      })
      if (!sent) {
        alert('Erreur: impossible d\'envoyer le courriel. Vérifiez votre adresse.')
      }
    } catch (err) {
      console.error('Email send error:', err)
      alert('Erreur: ' + (err?.text || err?.message || 'échec envoi'))
    }
    setStep('verify')
    setSending(false)
  }

  const handleVerifyAndSignup = async (e) => {
    e.preventDefault()
    if (code.length === 4 && (code === generatedCode || !generatedCode)) {
      setLoading(true)
      try {
        await onSignup(email, password, name, phone, birthday)
      } catch (err) {
        alert('Erreur: ' + (err.message || 'réessayez'))
      } finally {
        setLoading(false)
      }
    } else if (code.length === 4) {
      alert('Code invalide. Vérifiez votre courriel.')
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    try {
      await onLogin(email, password)
    } catch (err) {
      alert('Erreur: ' + (err.message || 'réessayez'))
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (newMode) => {
    setMode(newMode)
    setStep('info')
    setCode('')
    setGeneratedCode('')
    setPassword('')
    setConfirmPassword('')
    setLoading(false)
    setSending(false)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {config.logo ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <img src={config.logo} alt={config.businessName} className="login-logo" />
            <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', letterSpacing: -0.5 }}>{config.businessName}</h2>
          </div>
        ) : (
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>{config.businessName}</h2>
        )}
        <div className="gold-line" style={{ margin: '0 auto 24px' }} />
        <h1>Programme Fidélité</h1>
        <p>{config.tagline}</p>

        {referralFrom && mode === 'signup' && (
          <div style={{ background: 'var(--bg-warm)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: 24, fontSize: 13, color: 'var(--accent-dark)', fontWeight: 600 }}>
            Vous avez été parrainé(e) — inscrivez-vous pour recevoir {config.referralBonus} points!
          </div>
        )}

        {/* ========== LOGIN MODE ========== */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div className="input-group">
              <label>Courriel</label>
              <input
                type="email"
                placeholder="marie@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="input-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!email || !password || loading}>
              <LogIn size={16} />
              {loading ? 'Connexion...' : 'Connexion'}
            </button>
            <div className="login-divider"><span>ou</span></div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => switchMode('signup')}
            >
              <UserPlus size={16} />
              Pas de compte? Inscrivez-vous
            </button>
            {onDemo && (
              <button
                type="button"
                className="btn btn-secondary"
                style={{ marginTop: 8, opacity: 0.7 }}
                onClick={onDemo}
              >
                <Eye size={16} />
                Voir la démo sans créer de compte
              </button>
            )}
          </form>
        )}

        {/* ========== SIGNUP MODE — STEP 1: INFO ========== */}
        {mode === 'signup' && step === 'info' && (
          <form onSubmit={handleSendCode}>
            <div className="input-group">
              <label>Votre nom</label>
              <input
                type="text"
                placeholder="Marie Tremblay"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Courriel *</label>
              <input
                type="email"
                placeholder="marie@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="input-group">
              <label>Mot de passe *</label>
              <input
                type="password"
                placeholder="Choisissez un mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="input-group">
              <label>Confirmer le mot de passe *</label>
              <input
                type="password"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
              {confirmPassword && password !== confirmPassword && (
                <p style={{ fontSize: 12, color: 'var(--danger, #dc3545)', marginTop: 6 }}>Les mots de passe ne correspondent pas</p>
              )}
            </div>
            <div className="input-group">
              <label>Numéro de téléphone (optionnel)</label>
              <input
                type="tel"
                placeholder="(418) 555-0123"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Date de naissance (optionnel)</label>
              <input
                type="date"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
              />
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16, cursor: 'pointer', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: '#C9A96E' }}
              />
              <span>
                J'accepte la <a href="#/privacy" style={{ color: 'var(--accent)', fontWeight: 600 }}>politique de confidentialité</a> et je consens à recevoir des courriels relatifs à mon compte fidélité.
              </span>
            </label>
            <button type="submit" className="btn btn-primary" disabled={!email || !password || !confirmPassword || password !== confirmPassword || !consent || sending}>
              <Mail size={16} />
              {sending ? 'Envoi...' : 'Recevoir mon code par courriel'}
            </button>
            <div className="login-divider"><span>ou</span></div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => switchMode('login')}
            >
              <LogIn size={16} />
              Déjà un compte? Connectez-vous
            </button>
          </form>
        )}

        {/* ========== SIGNUP MODE — STEP 2: VERIFY CODE ========== */}
        {mode === 'signup' && step === 'verify' && (
          <form onSubmit={handleVerifyAndSignup}>
            <p style={{ marginBottom: 20, fontSize: 14, color: 'var(--text-light)' }}>
              Code envoyé à <strong>{email}</strong>
            </p>
            <div className="input-group">
              <label>Code de vérification</label>
              <input
                type="text"
                placeholder="• • • •"
                maxLength={4}
                value={code}
                onChange={e => setCode(e.target.value)}
                autoFocus
                style={{ textAlign: 'center', fontSize: 28, letterSpacing: 12, fontWeight: 700 }}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={code.length < 4 || loading}>
              <ShieldCheck size={16} />
              {loading ? 'Inscription...' : 'Créer mon compte'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginTop: 10 }}
              onClick={() => { setStep('info'); setCode(''); setGeneratedCode('') }}
            >
              <ArrowLeft size={16} />
              Modifier mes informations
            </button>
            <p style={{ marginTop: 20, fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Vérifiez vos courriels indésirables si vous ne voyez pas le code.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
