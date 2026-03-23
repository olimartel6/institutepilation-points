import { useState } from 'react'
import { mockClient, mockRewards } from '../data/mock'
import { Sparkles, DollarSign, Gem, Lock } from 'lucide-react'

const rewardIcons = {
  discount_percent: <Sparkles size={22} />,
  discount_fixed: <DollarSign size={22} />,
  free_service: <Gem size={22} />
}

export default function Rewards() {
  const [toast, setToast] = useState(null)

  const handleRedeem = (reward) => {
    if (mockClient.points_balance >= reward.points_required) {
      setToast(`${reward.name} demandé avec succès!`)
      setTimeout(() => setToast(null), 3000)
    }
  }

  return (
    <div className="page-content">
      {toast && <div className="toast">{toast}</div>}

      <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
          Votre solde
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, color: 'var(--primary)', marginTop: 4 }}>
          {mockClient.points_balance}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 2 }}>points disponibles</div>
      </div>

      <div className="gold-line" style={{ margin: '16px auto 28px' }} />
      <div className="section-title">Récompenses</div>

      {mockRewards.map(reward => {
        const canRedeem = mockClient.points_balance >= reward.points_required
        const progress = Math.min(100, (mockClient.points_balance / reward.points_required) * 100)
        const remaining = reward.points_required - mockClient.points_balance

        return (
          <div key={reward.id} className="reward-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: canRedeem ? 'var(--accent)' : 'var(--bg-warm)',
                color: canRedeem ? 'white' : 'var(--text-muted)',
                borderRadius: 'var(--radius-sm)', flexShrink: 0
              }}>
                {rewardIcons[reward.type]}
              </div>
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
              disabled={!canRedeem}
              onClick={() => handleRedeem(reward)}
            >
              {canRedeem ? (
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
