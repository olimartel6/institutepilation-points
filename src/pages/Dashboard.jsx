import { useState, useEffect } from 'react'
import { CreditCard, MapPin, Users, Gift, ChevronRight } from 'lucide-react'
import config from '../config'
import { getClientTransactions, getClientById } from '../services/supabase'

const typeLabels = { purchase: 'Achat', visit: 'Visite', referral: 'Parrainage', redemption: 'Échange', manual: 'Manuel' }
const typeIcons = {
  purchase: <CreditCard size={18} />,
  visit: <MapPin size={18} />,
  referral: <Users size={18} />,
  redemption: <Gift size={18} />,
  manual: <CreditCard size={18} />
}
const typeColors = { purchase: 'var(--success)', visit: 'var(--accent-dark)', referral: '#7C5CFC', redemption: 'var(--danger)', manual: 'var(--success)' }

export default function Dashboard({ client, business, setClient }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const rewards = business?.rewards || config.rewards

  useEffect(() => {
    if (!client?.id) return
    // Refresh client data + transactions
    Promise.all([
      getClientById(client.id),
      getClientTransactions(client.id)
    ]).then(([freshClient, txns]) => {
      if (freshClient) setClient(freshClient)
      setTransactions(txns)
    }).finally(() => setLoading(false))
  }, [client?.id])

  const nextReward = rewards.find(r => r.points_required > (client?.points_balance || 0))
  const progress = nextReward ? Math.min(100, ((client?.points_balance || 0) / nextReward.points_required) * 100) : 100

  return (
    <div className="page-content">
      <div className="welcome-header">
        <div>
          <div className="welcome-sub">Bonjour,</div>
          <div className="welcome-name">{client?.name || 'Client'}</div>
        </div>
        {config.logo ? (
          <img src={config.logo} alt="" className="welcome-logo" />
        ) : (
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-dark)' }}>{config.businessName}</span>
        )}
      </div>

      <div className="points-display" style={config.heroImage ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.7)), url(${config.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : {}}>
        <div className="points-number">{client?.points_balance || 0}</div>
        <div className="points-label">{config.pointsLabel}</div>
        <div className="points-sub">
          Membre depuis {client?.created_at ? new Date(client.created_at).toLocaleDateString('fr-CA', { month: 'long', year: 'numeric' }) : '—'}
        </div>
      </div>

      {nextReward && (
        <div className="next-reward">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="next-reward-label">Prochaine récompense</div>
              <div className="next-reward-name">{nextReward.name}</div>
            </div>
            <ChevronRight size={20} color="var(--text-muted)" />
          </div>
          <div className="reward-progress">
            <div className="reward-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="next-reward-count">
            {client?.points_balance || 0} / {nextReward.points_required} points — encore {nextReward.points_required - (client?.points_balance || 0)} points
          </div>
        </div>
      )}

      <div className="stat-grid">
        <div className="stat-mini">
          <div className="stat-mini-number" style={{ color: 'var(--success)' }}>
            {transactions.filter(t => t.type === 'purchase').length}
          </div>
          <div className="stat-mini-label">Achats</div>
        </div>
        <div className="stat-mini">
          <div className="stat-mini-number" style={{ color: 'var(--accent-dark)' }}>
            {transactions.filter(t => t.type === 'visit').length}
          </div>
          <div className="stat-mini-label">Visites</div>
        </div>
        <div className="stat-mini">
          <div className="stat-mini-number" style={{ color: '#7C5CFC' }}>
            {transactions.filter(t => t.type === 'referral').length}
          </div>
          <div className="stat-mini-label">Parrainages</div>
        </div>
      </div>

      {config.galleryImages && config.galleryImages.length > 0 && (
        <>
          <div className="section-title">Nos spécialités</div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 16, scrollSnapType: 'x mandatory' }}>
            {config.galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                style={{
                  width: 160, height: 160, borderRadius: 'var(--radius-sm)',
                  objectFit: 'cover', flexShrink: 0, scrollSnapAlign: 'start',
                  border: '1px solid var(--border)',
                }}
              />
            ))}
          </div>
        </>
      )}

      <div className="section-title">Activité récente</div>
      <div className="card">
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>Chargement...</p>
        ) : transactions.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>Aucune activité encore</p>
        ) : (
          transactions.map(t => (
            <div key={t.id} className="transaction-item">
              <div style={{
                width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--bg-warm)', color: typeColors[t.type] || 'var(--text)', marginRight: 14, flexShrink: 0
              }}>
                {typeIcons[t.type] || <CreditCard size={18} />}
              </div>
              <div className="transaction-info">
                <div className={`transaction-type ${t.type}`}>{typeLabels[t.type] || t.type}</div>
                <div className="transaction-desc">{t.description}</div>
                <div className="transaction-date">
                  {new Date(t.created_at).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long' })}
                </div>
              </div>
              <div className={`transaction-points ${t.points >= 0 ? 'positive' : 'negative'}`}>
                {t.points >= 0 ? '+' : ''}{t.points}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
