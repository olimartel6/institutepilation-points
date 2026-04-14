import { useState } from 'react'
import { Sparkles, DollarSign, Gem, Lock, X } from 'lucide-react'
import config from '../config'
import { createRedemption, getClientById } from '../services/supabase'

const rewardIcons = {
  discount_percent: <Sparkles size={22} />,
  discount_fixed: <DollarSign size={22} />,
  free_service: <Gem size={22} />
}

export default function Rewards({ client, business, setClient }) {
  const [toast, setToast] = useState(null)
  const [redeeming, setRedeeming] = useState(null)
  const [redemptionQR, setRedemptionQR] = useState(null) // { code, rewardName, expiresAt }

  const rewards = business?.rewards || config.rewards

  const handleRedeem = async (reward) => {
    if (!client || client.points_balance < reward.points_required) return
    setRedeeming(reward.id)
    try {
      const redemption = await createRedemption(business.id, client.id, reward.name, reward.points_required)
      const fresh = await getClientById(client.id)
      if (fresh) setClient(fresh)
      // Show the QR code modal
      setRedemptionQR({
        code: redemption.redemption_code,
        rewardName: reward.name,
        expiresAt: redemption.expires_at,
      })
    } catch (e) {
      setToast('Erreur: ' + (e.message || 'réessayez'))
      setTimeout(() => setToast(null), 3000)
    } finally {
      setRedeeming(null)
    }
  }

  // Countdown component
  const ExpiryTimer = ({ expiresAt }) => {
    const [remaining, setRemaining] = useState('')
    useState(() => {
      const interval = setInterval(() => {
        const diff = new Date(expiresAt) - new Date()
        if (diff <= 0) { setRemaining('Expiré'); clearInterval(interval); return }
        const min = Math.floor(diff / 60000)
        const sec = Math.floor((diff % 60000) / 1000)
        setRemaining(`${min}:${sec.toString().padStart(2, '0')}`)
      }, 1000)
      return () => clearInterval(interval)
    })
    return <span>{remaining}</span>
  }

  return (
    <div className="page-content">
      {toast && <div className="toast">{toast}</div>}

      {/* Redemption QR Modal */}
      {redemptionQR && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}>
          <div style={{
            background: 'white', borderRadius: 20, padding: 32,
            maxWidth: 360, width: '100%', textAlign: 'center',
            position: 'relative',
          }}>
            <button
              onClick={() => setRedemptionQR(null)}
              style={{
                position: 'absolute', top: 12, right: 12,
                width: 32, height: 32, borderRadius: '50%',
                border: 'none', background: 'var(--bg-warm)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={16} />
            </button>

            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Récompense prête!</h2>
            <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 20 }}>
              {redemptionQR.rewardName}
            </p>

            <div style={{
              display: 'inline-block', padding: 16,
              background: 'white', borderRadius: 16,
              border: '2px solid var(--accent)',
              marginBottom: 16,
            }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(redemptionQR.code)}`}
                alt="QR Rédemption"
                width={200}
                height={200}
                style={{ borderRadius: 8 }}
              />
            </div>

            <div style={{
              background: 'var(--bg-warm)', borderRadius: 10, padding: '10px 16px',
              marginBottom: 12, fontSize: 22, fontWeight: 800, letterSpacing: 4,
              color: 'var(--accent-dark)',
            }}>
              {redemptionQR.code}
            </div>

            <p style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.5 }}>
              Montrez ce QR à la caisse pour réclamer votre récompense
            </p>

            <div style={{
              marginTop: 12, fontSize: 13, fontWeight: 600,
              color: 'var(--warning)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 6,
            }}>
              ⏱ Expire dans <ExpiryTimer expiresAt={redemptionQR.expiresAt} />
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
          Votre solde
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, color: 'var(--primary)', marginTop: 4 }}>
          {client?.points_balance || 0}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 2 }}>points disponibles</div>
      </div>

      <div className="gold-line" style={{ margin: '16px auto 28px' }} />
      <div className="section-title">Récompenses</div>

      {rewards.map(reward => {
        const canRedeem = (client?.points_balance || 0) >= reward.points_required
        const progress = Math.min(100, ((client?.points_balance || 0) / reward.points_required) * 100)
        const remaining = reward.points_required - (client?.points_balance || 0)

        return (
          <div key={reward.id} className="reward-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              {reward.image ? (
                <img
                  src={reward.image}
                  alt={reward.name}
                  style={{
                    width: 52, height: 52, borderRadius: 'var(--radius-sm)',
                    objectFit: 'cover', flexShrink: 0,
                    border: canRedeem ? '2px solid var(--accent)' : '1px solid var(--border)',
                  }}
                />
              ) : (
                <div style={{
                  width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: canRedeem ? 'var(--accent)' : 'var(--bg-warm)',
                  color: canRedeem ? 'white' : 'var(--text-muted)',
                  borderRadius: 'var(--radius-sm)', flexShrink: 0
                }}>
                  {rewardIcons[reward.type] || <Gem size={22} />}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div className="reward-info">
                  <h3>{reward.name}</h3>
                  <p className="reward-points">{reward.points_required.toLocaleString()} points</p>
                </div>
                <div className="reward-progress">
                  <div className="reward-progress-bar" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
            <button
              className={`btn ${canRedeem ? 'btn-accent' : 'btn-secondary'} btn-small`}
              style={{ marginTop: 16, width: '100%' }}
              disabled={!canRedeem || redeeming === reward.id}
              onClick={() => handleRedeem(reward)}
            >
              {redeeming === reward.id ? 'En cours...' : canRedeem ? (
                <>Échanger maintenant</>
              ) : (
                <><Lock size={14} /> Encore {remaining} points</>
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}
