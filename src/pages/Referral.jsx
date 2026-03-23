import { useState } from 'react'
import QRCode from 'react-qr-code'
import { mockClient, mockReferrals } from '../data/mock'
import { Copy, Check, Share2, UserPlus } from 'lucide-react'

export default function Referral() {
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState(null)

  const baseUrl = window.location.origin + window.location.pathname
  const referralLink = baseUrl + '?ref=' + mockClient.referral_code
  const shareText = 'Rejoins le programme fidelite et obtiens 75 points gratuits!'

  function showToast(msg) {
    setToast(msg)
    setTimeout(function() { setToast(null) }, 2500)
  }

  function handleCopy() {
    try {
      navigator.clipboard.writeText(referralLink)
      setCopied(true)
      showToast('Lien copie!')
      setTimeout(function() { setCopied(false) }, 2500)
    } catch (e) {
      // fallback
      var input = document.createElement('input')
      input.value = referralLink
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      showToast('Lien copie!')
      setTimeout(function() { setCopied(false) }, 2500)
    }
  }

  function handleNativeShare() {
    if (navigator.share) {
      navigator.share({
        title: 'Programme Fidelite',
        text: shareText,
        url: referralLink,
      }).catch(function() {})
    } else {
      handleCopy()
    }
  }

  var smsLink = 'sms:?&body=' + encodeURIComponent(shareText + ' ' + referralLink)
  var whatsappLink = 'https://wa.me/?text=' + encodeURIComponent(shareText + ' ' + referralLink)
  var facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(referralLink)

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
          Invitez une amie et recevez chacune <strong style={{ color: 'var(--accent-dark)' }}>75 points</strong>
        </p>
      </div>

      <div className="gold-line" style={{ margin: '16px auto 28px' }} />

      <div className="card">
        <div className="section-title" style={{ textAlign: 'center' }}>Votre code</div>
        <div className="referral-link-box">
          <div className="referral-code">{mockClient.referral_code}</div>
        </div>

        <div className="qr-container">
          <QRCode value={referralLink} size={140} fgColor="#32373c" />
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 16, wordBreak: 'break-all', lineHeight: 1.5 }}>
          {referralLink}
        </p>

        <button className="btn btn-accent" onClick={handleNativeShare} type="button">
          <Share2 size={16} /> Partager le lien
        </button>

        <button className="btn btn-secondary" style={{ marginTop: 8 }} onClick={handleCopy} type="button">
          {copied ? <><Check size={16} /> Copie!</> : <><Copy size={16} /> Copier le lien</>}
        </button>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <a href={smsLink} className="btn btn-secondary btn-small" style={{ flex: 1, textDecoration: 'none' }}>
            SMS
          </a>
          <a href={whatsappLink} className="btn btn-secondary btn-small" style={{ flex: 1, textDecoration: 'none' }}
            target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={facebookLink} className="btn btn-secondary btn-small" style={{ flex: 1, textDecoration: 'none' }}
            target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
      </div>

      <div className="section-title" style={{ marginTop: 28 }}>Parrainages</div>
      <div className="card">
        {mockReferrals.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>
            Aucun parrainage encore. Partagez votre lien!
          </p>
        ) : (
          mockReferrals.map(function(ref, i) {
            return (
              <div key={i} className="client-row">
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{ref.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {new Date(ref.date).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long' })}
                  </div>
                </div>
                <span className={'badge ' + (ref.status === 'completed' ? 'badge-success' : 'badge-pending')}>
                  {ref.status === 'completed' ? '+75 pts' : 'En attente'}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
