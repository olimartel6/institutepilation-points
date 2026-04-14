import { useState, useEffect } from 'react'
import { Tag, X } from 'lucide-react'
import config from '../config'
import { getActiveOffers, claimOffer, getClientClaims } from '../services/supabase'

export default function Offers({ client, business }) {
  const [offers, setOffers] = useState([])
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [claimQR, setClaimQR] = useState(null) // { code, title }

  useEffect(() => {
    if (!business?.id || !client?.id) return
    Promise.all([
      getActiveOffers(business.id),
      getClientClaims(client.id),
    ]).then(([o, c]) => {
      setOffers(o)
      setClaims(c)
    }).finally(() => setLoading(false))
  }, [business?.id, client?.id])

  const claimedOfferIds = claims.map(c => c.offer_id)

  const handleClaim = async (offer) => {
    if (claimedOfferIds.includes(offer.id)) return
    const confirmed = window.confirm(`Réclamer "${offer.title}"?\n\nUn QR code sera généré pour présenter à la caisse.`)
    if (!confirmed) return
    try {
      const claim = await claimOffer(offer.id, client.id)
      setClaims([...claims, { ...claim, loyalty_offers: offer }])
      setClaimQR({ code: claim.claim_code, title: offer.title })
    } catch (e) {
      setToast(e.message || 'Erreur')
      setTimeout(() => setToast(null), 3000)
    }
  }

  // Brightness boost on QR modal
  useEffect(() => {
    if (claimQR) {
      document.body.style.filter = 'brightness(1.3)'
    } else {
      document.body.style.filter = ''
    }
    return () => { document.body.style.filter = '' }
  }, [claimQR])

  if (loading) {
    return <div className="page-content" style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Chargement...</div>
  }

  return (
    <div className="page-content">
      {toast && <div className="toast">{toast}</div>}

      {/* Claim QR Modal */}
      {claimQR && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div style={{
            background: 'white', borderRadius: 20, padding: 32,
            maxWidth: 360, width: '100%', textAlign: 'center', position: 'relative',
          }}>
            <button onClick={() => setClaimQR(null)} style={{
              position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: '50%',
              border: 'none', background: 'var(--bg-warm)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><X size={16} /></button>

            <div style={{ fontSize: 48, marginBottom: 12 }}>🎫</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Offre réclamée!</h2>
            <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 20 }}>{claimQR.title}</p>

            <div style={{
              display: 'inline-block', padding: 16, background: 'white',
              borderRadius: 16, border: '2px solid var(--accent)', marginBottom: 16,
            }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(claimQR.code)}`}
                alt="QR Offre" width={200} height={200} style={{ borderRadius: 8 }}
              />
            </div>

            <div style={{
              background: 'var(--bg-warm)', borderRadius: 10, padding: '10px 16px',
              marginBottom: 12, fontSize: 22, fontWeight: 800, letterSpacing: 4, color: 'var(--accent-dark)',
            }}>
              {claimQR.code}
            </div>

            <p style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.5 }}>
              Montrez ce QR à la caisse pour utiliser votre offre
            </p>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
        <Tag size={32} color="var(--accent)" />
        <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>Offres spéciales</h2>
        <p style={{ fontSize: 14, color: 'var(--text-light)', marginTop: 4 }}>
          Offres exclusives de {config.businessName}
        </p>
      </div>

      <div className="gold-line" style={{ margin: '16px auto 28px' }} />

      {offers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>🎫</p>
          <p>Aucune offre pour le moment</p>
          <p style={{ fontSize: 13, marginTop: 8 }}>Revenez bientôt!</p>
        </div>
      ) : (
        offers.map(offer => {
          const isClaimed = claimedOfferIds.includes(offer.id)
          const isExpired = offer.valid_until && new Date(offer.valid_until) < new Date()
          const isFull = offer.max_claims && offer.claims_count >= offer.max_claims

          return (
            <div key={offer.id} className="reward-card" style={{ marginBottom: 16 }}>
              {offer.image_url && (
                <img
                  src={offer.image_url}
                  alt={offer.title}
                  style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: 12 }}
                />
              )}
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{offer.title}</h3>
              {offer.description && (
                <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.5, marginBottom: 12 }}>{offer.description}</p>
              )}
              {offer.valid_until && (
                <p style={{ fontSize: 12, color: 'var(--warning)', fontWeight: 600, marginBottom: 12 }}>
                  ⏱ Expire le {new Date(offer.valid_until).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long' })}
                </p>
              )}
              <button
                className={`btn ${isClaimed ? 'btn-secondary' : isExpired || isFull ? 'btn-secondary' : 'btn-accent'} btn-small`}
                style={{ width: '100%' }}
                disabled={isClaimed || isExpired || isFull}
                onClick={() => handleClaim(offer)}
              >
                {isClaimed ? '✅ Déjà réclamée' : isExpired ? 'Expirée' : isFull ? 'Complet' : '🎫 Réclamer cette offre'}
              </button>
            </div>
          )
        })
      )}

      {/* My active claims */}
      {claims.length > 0 && (
        <>
          <div className="section-title" style={{ marginTop: 28 }}>Mes offres réclamées</div>
          {claims.map(claim => (
            <div key={claim.id} className="card" style={{ padding: 16, marginBottom: 12, cursor: 'pointer' }}
              onClick={() => setClaimQR({ code: claim.claim_code, title: claim.loyalty_offers?.title || 'Offre' })}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{claim.loyalty_offers?.title || 'Offre'}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    Tapez pour afficher le QR
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-dark)' }}>
                  {claim.claim_code}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
