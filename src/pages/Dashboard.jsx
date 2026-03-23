import { mockClient, mockTransactions, mockRewards } from '../data/mock'

const typeLabels = { purchase: 'Achat', visit: 'Visite', referral: 'Parrainage', redemption: 'Échange' }
const typeIcons = { purchase: '💳', visit: '📍', referral: '👥', redemption: '🎁' }

export default function Dashboard() {
  const nextReward = mockRewards.find(r => r.points_required > mockClient.points_balance)
  const progress = nextReward ? Math.min(100, (mockClient.points_balance / nextReward.points_required) * 100) : 100

  return (
    <div className="page-content">
      <div className="welcome-header">
        <div>
          <div className="welcome-sub">Bonjour,</div>
          <div className="welcome-name">{mockClient.name}</div>
        </div>
        <img src="./logo-dark.png" alt="" className="welcome-logo" />
      </div>

      <div className="points-display">
        <div className="points-number">{mockClient.points_balance}</div>
        <div className="points-label">Points fidélité</div>
        <div className="points-sub">Membre depuis {new Date(mockClient.created_at).toLocaleDateString('fr-CA', { month: 'long', year: 'numeric' })}</div>
      </div>

      {nextReward && (
        <div className="next-reward">
          <div className="next-reward-label">Prochaine récompense</div>
          <div className="next-reward-name">{nextReward.name}</div>
          <div className="reward-progress">
            <div className="reward-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="next-reward-count">
            {mockClient.points_balance} / {nextReward.points_required} points — encore {nextReward.points_required - mockClient.points_balance} points
          </div>
        </div>
      )}

      <div className="stat-grid">
        <div className="stat-mini">
          <div className="stat-mini-number" style={{ color: 'var(--success)' }}>
            {mockTransactions.filter(t => t.type === 'purchase').length}
          </div>
          <div className="stat-mini-label">Achats</div>
        </div>
        <div className="stat-mini">
          <div className="stat-mini-number" style={{ color: 'var(--accent-dark)' }}>
            {mockTransactions.filter(t => t.type === 'visit').length}
          </div>
          <div className="stat-mini-label">Visites</div>
        </div>
        <div className="stat-mini">
          <div className="stat-mini-number" style={{ color: '#7C5CFC' }}>
            {mockTransactions.filter(t => t.type === 'referral').length}
          </div>
          <div className="stat-mini-label">Parrainages</div>
        </div>
      </div>

      <div className="section-title">Activité récente</div>
      <div className="card">
        {mockTransactions.map(t => (
          <div key={t.id} className="transaction-item">
            <div style={{ fontSize: 24, marginRight: 14 }}>{typeIcons[t.type]}</div>
            <div className="transaction-info">
              <div className={`transaction-type ${t.type}`}>{typeLabels[t.type]}</div>
              <div className="transaction-desc">{t.description}</div>
              <div className="transaction-date">{new Date(t.created_at).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long' })}</div>
            </div>
            <div className={`transaction-points ${t.points >= 0 ? 'positive' : 'negative'}`}>
              {t.points >= 0 ? '+' : ''}{t.points}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
