import { mockClient } from '../data/mock'
import config from '../config'
import { getTier } from '../utils/tiers'

export default function MyQR({ client }) {
  const user = client || mockClient
  const tier = getTier(user.total_points_earned || 0)

  return (
    <div className="page-content">
      <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
        {config.logo ? (
          <img src={config.logo} alt="" style={{ height: 40, marginBottom: 12 }} />
        ) : null}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)' }}>{config.businessName}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-light)', marginTop: 4 }}>{user.name || 'Client'}</p>
      </div>

      <div className="gold-line" style={{ margin: '12px auto 24px' }} />

      <div style={{ textAlign: 'center', padding: '0 0 20px' }}>
        <div style={{
          display: 'inline-block', padding: 16,
          background: 'white', borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
        }}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(user.id || 'demo-client')}`}
            alt="Mon QR Code"
            width={220}
            height={220}
            style={{ borderRadius: 8 }}
          />
        </div>
      </div>

      <p style={{
        textAlign: 'center', fontSize: 14, color: 'var(--text-light)',
        fontWeight: 600, marginBottom: 24, lineHeight: 1.5,
      }}>
        Montrez ce code à la caisse pour<br />accumuler vos points
      </p>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--primary)' }}>{user.points_balance || 0}</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
          {config.pointsLabel}
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '10px 16px', margin: '0 auto',
        background: tier.color + '15', borderRadius: 'var(--radius-sm)',
        border: `1px solid ${tier.color}30`, width: 'fit-content',
      }}>
        <span style={{ fontSize: 22 }}>{tier.icon}</span>
        <span style={{ fontWeight: 700, fontSize: 15, color: tier.color }}>{tier.name}</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>x{tier.multiplier}</span>
      </div>
    </div>
  )
}
