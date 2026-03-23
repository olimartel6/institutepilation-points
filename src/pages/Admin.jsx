import { useState } from 'react'
import { mockAllClients, mockPendingRedemptions } from '../data/mock'
import { Users, Star, Clock, LogOut, Plus, CheckCircle, XCircle, Camera } from 'lucide-react'

export default function Admin({ onLogout }) {
  const [tab, setTab] = useState('clients')
  const [toast, setToast] = useState(null)
  const [addPointsClient, setAddPointsClient] = useState(null)
  const [pointsToAdd, setPointsToAdd] = useState('')
  const [amountSpent, setAmountSpent] = useState('')

  const totalPoints = mockAllClients.reduce((sum, c) => sum + c.points_balance, 0)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const handleAddPoints = (client) => {
    if (addPointsClient?.id === client.id) setAddPointsClient(null)
    else { setAddPointsClient(client); setPointsToAdd(''); setAmountSpent('') }
  }

  const submitPoints = () => {
    const pts = amountSpent ? parseInt(amountSpent) * 10 : parseInt(pointsToAdd)
    if (pts > 0) { showToast(`+${pts} points ajoutés à ${addPointsClient.name}`); setAddPointsClient(null) }
  }

  return (
    <div className="page-content" style={{ paddingTop: 0 }}>
      {toast && <div className="toast">{toast}</div>}

      <div className="admin-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <img src="./logo.png" alt="" style={{ height: 28, marginBottom: 8, opacity: 0.9 }} />
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>Administration</div>
          </div>
          <button className="btn btn-small" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', width: 'auto', border: '1px solid rgba(255,255,255,0.15)' }} onClick={onLogout}>
            <LogOut size={14} /> Déconnexion
          </button>
        </div>

        <div className="admin-stats-grid">
          <div className="card admin-stat" style={{ border: 'none' }}>
            <div style={{ color: 'var(--accent)', marginBottom: 6 }}><Users size={20} /></div>
            <div className="admin-stat-number">{mockAllClients.length}</div>
            <div className="admin-stat-label">Clients</div>
          </div>
          <div className="card admin-stat" style={{ border: 'none' }}>
            <div style={{ color: 'var(--accent)', marginBottom: 6 }}><Star size={20} /></div>
            <div className="admin-stat-number">{totalPoints.toLocaleString()}</div>
            <div className="admin-stat-label">Points</div>
          </div>
          <div className="card admin-stat" style={{ border: 'none' }}>
            <div style={{ color: 'var(--accent)', marginBottom: 6 }}><Clock size={20} /></div>
            <div className="admin-stat-number">{mockPendingRedemptions.length}</div>
            <div className="admin-stat-label">En attente</div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'clients' ? 'active' : ''}`} onClick={() => setTab('clients')}>Clients</button>
        <button className={`tab ${tab === 'redemptions' ? 'active' : ''}`} onClick={() => setTab('redemptions')}>Échanges</button>
        <button className={`tab ${tab === 'scan' ? 'active' : ''}`} onClick={() => setTab('scan')}>Scanner</button>
      </div>

      {tab === 'clients' && (
        <div className="card">
          {mockAllClients.map(client => (
            <div key={client.id}>
              <div className="client-row" onClick={() => handleAddPoints(client)} style={{ cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{client.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{client.phone}</div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--accent-dark)', fontSize: 16 }}>{client.points_balance} pts</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      {new Date(client.created_at).toLocaleDateString('fr-CA', { month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  <Plus size={16} color="var(--text-muted)" />
                </div>
              </div>
              {addPointsClient?.id === client.id && (
                <div style={{ background: 'var(--bg-warm)', margin: '0 -24px', padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--text-light)' }}>
                    Ajouter des points à {client.name}
                  </div>
                  <div className="input-group">
                    <label>Montant de l'achat ($)</label>
                    <input type="number" placeholder="Ex: 150 → 1 500 pts" value={amountSpent}
                      onChange={e => { setAmountSpent(e.target.value); setPointsToAdd('') }} />
                  </div>
                  <div className="input-group">
                    <label>Ou points manuels</label>
                    <input type="number" placeholder="Ex: 25" value={pointsToAdd}
                      onChange={e => { setPointsToAdd(e.target.value); setAmountSpent('') }} />
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-accent btn-small" style={{ flex: 1 }} onClick={submitPoints}>
                      <Plus size={14} /> Ajouter
                    </button>
                    <button className="btn btn-secondary btn-small" style={{ flex: 1 }} onClick={() => setAddPointsClient(null)}>
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'redemptions' && (
        <div className="card">
          {mockPendingRedemptions.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>Aucun échange en attente</p>
          ) : (
            mockPendingRedemptions.map(r => (
              <div key={r.id} style={{ padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{r.client_name}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-light)', marginTop: 2 }}>{r.reward}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                    {new Date(r.created_at).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long' })} — {r.points_spent} pts
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-success btn-small" style={{ flex: 1 }} onClick={() => showToast(`${r.reward} confirmé`)}>
                    <CheckCircle size={14} /> Confirmer
                  </button>
                  <button className="btn btn-danger btn-small" style={{ flex: 1 }} onClick={() => showToast('Échange refusé')}>
                    <XCircle size={14} /> Refuser
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'scan' && (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-warm)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', color: 'var(--primary)'
          }}>
            <Camera size={36} />
          </div>
          <h3 style={{ marginBottom: 8, fontSize: 18 }}>Scanner un QR client</h3>
          <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 24, lineHeight: 1.5 }}>
            Scannez le QR code du client pour valider une visite ou enregistrer un achat.
          </p>
          <button className="btn btn-accent" onClick={() => showToast('Visite validée! +25 points')}>
            Simuler un scan
          </button>
        </div>
      )}
    </div>
  )
}
