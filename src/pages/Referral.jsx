import { useState, useEffect } from 'react'
import { Copy, Check, Share2, UserPlus } from 'lucide-react'
import config from '../config'
import { getReferrals } from '../services/supabase'

export default function Referral({ client, business }) {
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState(null)
  const [referrals, setReferrals] = useState([])

  useEffect(() => {
    if (client?.id) {
      getReferrals(client.id).then(setReferrals).catch(() => {})
    }
  }, [client?.id])

  const referralLink = window.location.origin + window.location.pathname + '?ref=' + (client?.referral_code || '')
  const shareText = config.referralMessage

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  function handleCopy() {
    try {
      navigator.clipboard.writeText(referralLink)
    } catch {
      const input = document.createElement('input')
      input.value = referralLink
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    setCopied(true)
    showToast('Lien copié!')
    setTimeout(() => setCopied(false), 2500)
  }

  function handleNativeShare() {
    if (navigator.share) {
      navigator.share({ title: 'Programme Fidélité', text: shareText, url: referralLink }).catch(() => {})
    } else {
      handleCopy()
    }
  }

  const smsHref = 'sms:?&body=' + encodeURIComponent(shareText + ' ' + referralLink)
  const waHref = 'https://wa.me/?text=' + encodeURIComponent(shareText + ' ' + referralLink)
  const fbHref = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(referralLink)

  return (
    <div className="page-content">
      {toast && <div className="toast">{toast}</div>}

      <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', background: 'var(--bg-warm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px', color: 'var(--accent-dark)'
        }}>
          <UserPlus size={28} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Parrainez, gagnez</h2>
        <p style={{ fontSize: 14, color: 'var(--text-light)', marginTop: 6, lineHeight: 1.5 }}>
          Invitez une amie et recevez chacune <strong style={{ color: 'var(--accent-dark)' }}>{config.referralBonus} points</strong>
        </p>
      </div>

      <div className="gold-line" style={{ margin: '16px auto 28px' }} />

      <div className="card">
        <div className="section-title" style={{ textAlign: 'center' }}>Votre code</div>
        <div className="referral-link-box">
          <div className="referral-code">{client?.referral_code || '—'}</div>
        </div>

        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <img
            src={'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=' + encodeURIComponent(referralLink)}
            alt="QR Code"
            width={160}
            height={160}
            style={{ borderRadius: 8 }}
          />
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 16, wordBreak: 'break-all', lineHeight: 1.5 }}>
          {referralLink}
        </p>

        <button className="btn btn-accent" onClick={handleNativeShare}>
          <Share2 size={16} /> Partager le lien
        </button>

        <button className="btn btn-secondary" style={{ marginTop: 8 }} onClick={handleCopy}>
          {copied ? <><Check size={16} /> Copié!</> : <><Copy size={16} /> Copier le lien</>}
        </button>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <a href={smsHref} className="btn btn-secondary btn-small" style={{ flex: 1, textDecoration: 'none' }}>SMS</a>
          <a href={waHref} className="btn btn-secondary btn-small" style={{ flex: 1, textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href={fbHref} className="btn btn-secondary btn-small" style={{ flex: 1, textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>

      <div className="section-title" style={{ marginTop: 28 }}>Parrainages</div>
      <div className="card">
        {referrals.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>
            Aucun parrainage encore. Partagez votre lien!
          </p>
        ) : (
          referrals.map((ref, i) => (
            <div key={i} className="client-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{ref.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {new Date(ref.created_at).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long' })}
                </div>
              </div>
              <span className="badge badge-success">+{config.referralBonus} pts</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
