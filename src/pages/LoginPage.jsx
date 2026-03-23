import { useState } from 'react'
import { Phone, ShieldCheck, ArrowLeft } from 'lucide-react'

export default function LoginPage({ onLogin, onAdminLogin, referralFrom }) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState('phone')

  const handleSendCode = (e) => {
    e.preventDefault()
    if (phone.length >= 10) setStep('verify')
  }

  const handleVerify = (e) => {
    e.preventDefault()
    if (code === '0000') onAdminLogin()
    else if (code.length === 4) onLogin()
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="./logo-dark.png" alt="Institut d'Épilation Laser" className="login-logo" />
        <div className="gold-line" style={{ margin: '0 auto 24px' }} />
        <h1>Programme Fidélité</h1>
        <p>Accumulez des points, obtenez des récompenses exclusives</p>

        {referralFrom && (
          <div style={{ background: 'var(--bg-warm)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: 24, fontSize: 13, color: 'var(--accent-dark)', fontWeight: 600 }}>
            Vous avez été parrainé(e) — inscrivez-vous pour recevoir 75 points!
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendCode}>
            <div className="input-group">
              <label>Numéro de téléphone</label>
              <input
                type="tel"
                placeholder="(418) 555-0123"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={phone.length < 10}>
              <Phone size={16} />
              Recevoir mon code
            </button>
            <div className="login-divider"><span>Sécurisé par SMS</span></div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <ShieldCheck size={14} />
              Un code de vérification sera envoyé à votre téléphone
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <p style={{ marginBottom: 20, fontSize: 14, color: 'var(--text-light)' }}>
              Code envoyé au <strong>{phone}</strong>
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
            <button type="submit" className="btn btn-primary" disabled={code.length < 4}>
              <ShieldCheck size={16} />
              Connexion
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginTop: 10 }}
              onClick={() => { setStep('phone'); setCode('') }}
            >
              <ArrowLeft size={16} />
              Changer de numéro
            </button>
            <p style={{ marginTop: 20, fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Démo : entrez n'importe quel code. Code « 0000 » pour l'admin.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
