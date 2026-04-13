import { useState, useEffect } from 'react'
import { Users, Star, Clock, LogOut, Plus, CheckCircle, XCircle, Camera, Search } from 'lucide-react'
import config from '../config'
import QRScanner from '../components/QRScanner'
import {
  getAllClients, getPendingRedemptions, adminAddPoints,
  updateRedemptionStatus, getClientById
} from '../services/supabase'

export default function Admin({ business, onLogout }) {
  const [tab, setTab] = useState('clients')
  const [toast, setToast] = useState(null)
  const [clients, setClients] = useState([])
  const [pendingRedemptions, setPendingRedemptions] = useState([])
  const [addPointsClient, setAddPointsClient] = useState(null)
  const [pointsToAdd, setPointsToAdd] = useState('')
  const [amountSpent, setAmountSpent] = useState('')
  const [showScanner, setShowScanner] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    if (!business?.id) return
    try {
      const [c, r] = await Promise.all([
        getAllClients(business.id),
        getPendingRedemptions(business.id)
      ])
      setClients(c)
      setPendingRedemptions(r)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [business?.id])

  const totalPoints = clients.reduce((sum, c) => sum + c.points_balance, 0)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const handleAddPoints = (client) => {
    if (addPointsClient?.id === client.id) setAddPointsClient(null)
    else { setAddPointsClient(client); setPointsToAdd(''); setAmountSpent('') }
  }

  const submitPoints = async () => {
    const ptsPerDollar = business?.points_per_dollar || config.pointsPerDollar
    const pts = amountSpent ? parseInt(amountSpent) * ptsPerDollar : parseInt(pointsToAdd)
    if (pts > 0 && addPointsClient) {
      try {
        const desc = amountSpent ? `Achat de ${amountSpent}$` : 'Points ajoutés manuellement'
        await adminAddPoints(business.id, addPointsClient.id, pts, desc, amountSpent ? parseFloat(amountSpent) : null)
        showToast(`+${pts} points ajoutés à ${addPointsClient.name}`)
        setAddPointsClient(null)
        await loadData()
      } catch (e) {
        showToast('Erreur: ' + (e.message || 'réessayez'))
      }
    }
  }

  const handleApprove = async (redemption) => {
    try {
      await updateRedemptionStatus(redemption.id, 'approved')
      showToast('Récompense approuvée!')
      await loadData()
    } catch (e) {
      showToast('Erreur')
    }
  }

  const handleReject = async (redemption) => {
    try {
      await updateRedemptionStatus(redemption.id, 'rejected')
      showToast('Récompense refusée')
      await loadData()
    } catch (e) {
      showToast('Erreur')
    }
  }

  const handleQRScan = async (data) => {
    setShowScanner(false)
    // QR contains client ID
    try {
      const client = await getClientById(data)
      if (client && client.business_id === business.id) {
        setAddPointsClient(client)
        setTab('clients')
        showToast(`Client trouvé: ${client.name}`)
      } else {
        showToast('Client non trouvé')
      }
    } catch {
      showToast('QR invalide')
    }
  }

  const filteredClients = searchQuery
    ? clients.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)
      )
    : clients

  return (
    <div className="page-content" style={{ paddingTop: 0 }}>
      {toast && <div className="toast">{toast}</div>}
      {showScanner && <QRScanner onScan={handleQRScan} onClose={() => setShowScanner(false)} />}

      <div className="admin-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            {config.logoLight ? (
              <img src={config.logoLight} alt="" style={{ height: 28, marginBottom: 8, opacity: 0.9 }} />
            ) : (
              <div style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 8 }}>{config.businessName}</div>
            )}
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>Administration</div>
          </div>
          <button className="btn btn-small" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', width: 'auto', border: '1px solid rgba(255,255,255,0.15)' }} onClick={onLogout}>
            <LogOut size={14} /> Déconnexion
          </button>
        </div>

        <div className="admin-stats-grid">
          <div className="card admin-stat" style={{ border: 'none' }}>
            <div style={{ color: 'var(--accent)', marginBottom: 6 }}><Users size={20} /></div>
            <div className="admin-stat-number">{clients.length}</div>
            <div className="admin-stat-label">Clients</div>
          </div>
          <div className="card admin-stat" style={{ border: 'none' }}>
            <div style={{ color: 'var(--accent)', marginBottom: 6 }}><Star size={20} /></div>
            <div className="admin-stat-number">{totalPoints.toLocaleString()}</div>
            <div className="admin-stat-label">Points</div>
          </div>
          <div className="card admin-stat" style={{ border: 'none' }}>
            <div style={{ color: 'var(--accent)', marginBottom: 6 }}><Clock size={20} /></div>
            <div className="admin-stat-number">{pendingRedemptions.length}</div>
            <div className="admin-stat-label">En attente</div>
          </div>
        </div>
      </div>

      {/* Scan QR Button */}
      <button
        className="btn btn-accent"
        style={{ margin: '0 16px 16px', display: 'flex', gap: 8 }}
        onClick={() => setShowScanner(true)}
      >
        <Camera size={18} /> Scanner le QR d'un client
      </button>

      {/* Tabs */}
      <div className="admin-tabs">
        <button className={`admin-tab ${tab === 'clients' ? 'active' : ''}`} onClick={() => setTab('clients')}>
          Clients
        </button>
        <button className={`admin-tab ${tab === 'redemptions' ? 'active' : ''}`} onClick={() => setTab('redemptions')}>
          Échanges {pendingRedemptions.length > 0 && <span className="tab-badge">{pendingRedemptions.length}</span>}
        </button>
      </div>

      {tab === 'clients' && (
        <>
          {/* Search */}
          <div style={{ padding: '0 16px 12px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: 13, color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Chercher par nom ou téléphone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px 10px 36px', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', fontSize: 14, background: 'var(--bg-card)'
                }}
              />
            </div>
          </div>

          <div className="card" style={{ margin: '0 16px' }}>
            {loading ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>Chargement...</p>
            ) : filteredClients.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>Aucun client</p>
            ) : (
              filteredClients.map(c => (
                <div key={c.id}>
                  <div className="client-row" onClick={() => handleAddPoints(c)} style={{ cursor: 'pointer' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{c.name || c.phone}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.phone}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--accent-dark)' }}>{c.points_balance}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>pts</div>
                    </div>
                  </div>

                  {addPointsClient?.id === c.id && (
                    <div style={{ padding: '12px 16px 16px', background: 'var(--bg-warm)', borderTop: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Montant ($)</label>
                          <input
                            type="number"
                            placeholder="Ex: 150"
                            value={amountSpent}
                            onChange={e => { setAmountSpent(e.target.value); setPointsToAdd('') }}
                            style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14 }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Ou points directs</label>
                          <input
                            type="number"
                            placeholder="Ex: 100"
                            value={pointsToAdd}
                            onChange={e => { setPointsToAdd(e.target.value); setAmountSpent('') }}
                            style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14 }}
                          />
                        </div>
                      </div>
                      {amountSpent && (
                        <p style={{ fontSize: 12, color: 'var(--success)', marginBottom: 8 }}>
                          = {parseInt(amountSpent) * (business?.points_per_dollar || config.pointsPerDollar)} points
                        </p>
                      )}
                      <button className="btn btn-accent btn-small" onClick={submitPoints}>
                        <Plus size={14} /> Ajouter les points
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}

      {tab === 'redemptions' && (
        <div className="card" style={{ margin: '0 16px' }}>
          {pendingRedemptions.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 24 }}>Aucun échange en attente</p>
          ) : (
            pendingRedemptions.map(r => (
              <div key={r.id} className="client-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{r.loyalty_clients?.name || 'Client'}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-light)' }}>{r.reward_name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {r.points_spent} pts · {new Date(r.created_at).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long' })}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-small" style={{ flex: 1, background: 'var(--success)', color: 'white', border: 'none' }} onClick={() => handleApprove(r)}>
                    <CheckCircle size={14} /> Approuver
                  </button>
                  <button className="btn btn-small btn-secondary" style={{ flex: 1 }} onClick={() => handleReject(r)}>
                    <XCircle size={14} /> Refuser
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
