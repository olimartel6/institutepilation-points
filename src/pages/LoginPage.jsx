import { useState } from 'react'
import { Mail, ShieldCheck, ArrowLeft } from 'lucide-react'
import config from '../config'
import { sendEmail } from '../services/supabase'

export default function LoginPage({ onLogin, onAdminLogin, referralFrom }) {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [code, setCode] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [step, setStep] = useState('info')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [consent, setConsent] = useState(false)

  const handleSendCode = async (e) => {
    e.preventDefault()
    if (!email || !consent) return

    setSending(true)
    // Generate 4-digit code
    const newCode = String(Math.floor(1000 + Math.random() * 9000))
    setGeneratedCode(newCode)

    // Send code by email
    const sent = await sendEmail('verify_code', email, config.businessName, {
      clientName: name,
      code: newCode,
    })

    if (sent) {
      setStep('verify')
    } else {
      // If email fails, still go to verify (demo mode)
      setStep('verify')
    }
    setSending(false)
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    if (code === '0000') {
      onAdminLogin()
      return
    }
    // Check code matches (or accept any in demo mode if email wasn't configured)
    if (code.length === 4 && (code === generatedCode || !generatedCode)) {
      setLoading(true)
      try {
        await onLogin(phone, name, birthday, email)
      } catch (err) {
        alert('Erreur: ' + (err.message || 'réessayez'))
      } finally {
        setLoading(false)
      }
    } else if (code.length === 4) {
      alert('Code invalide. Vérifiez votre courriel.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {config.logo ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <img src={config.logo} alt={config.businessName} className="login-logo" />
            <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', letterSpacing: -0.5 }}>{config.businessName}</h2>
          </div>
        ) : (
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>{config.businessName}</h2>
        )}
        <div className="gold-line" style={{ margin: '0 auto 24px' }} />
        <h1>Programme Fidélité</h1>
        <p>{config.tagline}</p>

        {referralFrom && (
          <div style={{ background: 'var(--bg-warm)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: 24, fontSize: 13, color: 'var(--accent-dark)', fontWeight: 600 }}>
            Vous avez été parrainé(e) — inscrivez-vous pour recevoir {config.referralBonus} points!
          </div>
        )}

        {step === 'info' ? (
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
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16, cursor: 'pointer', fontSize: 12, color: 'var(--text-light)', lineHeight: 1.5 }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0 }}
              />
              <span>
                J'accepte la <a href="#/privacy" style={{ color: 'var(--accent-dark)', fontWeight: 600 }}>politique de confidentialité</a> et je consens à recevoir des courriels relatifs à mon compte fidélité.
              </span>
            </label>
            <button type="submit" className="btn btn-primary" disabled={!email || !consent || sending}>
              <Mail size={16} />
              {sending ? 'Envoi...' : 'Recevoir mon code par courriel'}
            </button>
            <div className="login-divider"><span>Sécurisé par courriel</span></div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <ShieldCheck size={14} />
              Un code de vérification sera envoyé à votre courriel
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
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
              {loading ? 'Connexion...' : 'Connexion'}
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
              Vérifiez vos courriels indésirables si vous ne voyez pas le code. Code « 0000 » pour l'admin.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
