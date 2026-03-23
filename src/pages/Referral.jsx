import { useState } from 'react'
import QRCode from 'react-qr-code'
import { mockClient, mockReferrals } from '../data/mock'
import { Copy, Check, Share2, MessageCircle, Send } from 'lucide-react'

export default function Referral() {
  const [copied, setCopied] = useState(false)
  const baseUrl = window.location.origin + window.location.pathname
  const referralLink = `${baseUrl}?ref=${mockClient.referral_code}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform) => {
    const text = `Rejoins le programme fidélité de l'Institut d'Épilation Laser et obtiens 75 points gratuits! ${referralLink}`
    const encodedText = encodeURIComponent(text)

    const urls = {
      sms: `sms:?body=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent('Rejoins le programme fidélité de l\'Institut d\'Épilation Laser!')}`,
    }

    window.open(urls[platform], '_blank')
  }

  return (
    <div className="page-content">
      {copied && <div className="toast">Lien copié!</div>}

      <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', background: 'var(--bg-warm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px', color: 'var(--accent-dark)'
        }}>
          <Share2 size={28} />
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

        <button className="btn btn-accent" onClick={handleCopy}>
          {copied ? <><Check size={16} /> Copié!</> : <><Copy size={16} /> Copier le lien</>}
        </button>

        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button className="btn btn-secondary btn-small" style={{ flex: 1 }} onClick={() => handleShare('sms')}>
            <MessageCircle size={15} /> SMS
          </button>
          <button className="btn btn-secondary btn-small" style={{ flex: 1 }} onClick={() => handleShare('whatsapp')}>
            <Send size={15} /> WhatsApp
          </button>
          <button className="btn btn-secondary btn-small" style={{ flex: 1 }} onClick={() => handleShare('facebook')}>
            <Share2 size={15} /> Facebook
          </button>
        </div>
      </div>

      <div className="section-title" style={{ marginTop: 28 }}>Parrainages</div>
      <div className="card">
        {mockReferrals.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>
            Aucun parrainage encore. Partagez votre lien!
          </p>
        ) : (
          mockReferrals.map((ref, i) => (
            <div key={i} className="client-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{ref.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {new Date(ref.date).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long' })}
                </div>
              </div>
              <span className={`badge ${ref.status === 'completed' ? 'badge-success' : 'badge-pending'}`}>
                {ref.status === 'completed' ? '+75 pts' : 'En attente'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
