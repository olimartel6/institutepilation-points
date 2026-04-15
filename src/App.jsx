import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Rewards from './pages/Rewards'
import Referral from './pages/Referral'
import MyQR from './pages/MyQR'
import Offers from './pages/Offers'
import Privacy from './pages/Privacy'
import Admin from './pages/Admin'
import BottomNav from './components/BottomNav'
import { config, applyTheme } from './config'
import { getBusiness, getClientByPhone, createLoyaltyClient, generateReferralCode, sendSMS, sendEmail, generateWalletPass } from './services/supabase'
import './index.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [client, setClient] = useState(null)
  const [business, setBusiness] = useState(null)
  const [referralFrom, setReferralFrom] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    applyTheme(config.theme)
    document.title = `${config.pointsLabel} — ${config.businessName}`

    // Load business from Supabase
    getBusiness(config.slug)
      .then(b => setBusiness(b))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) setReferralFrom(ref)
  }, [])

  const handleLogin = async (phone, name, birthday, email) => {
    if (!business) return
    let c = await getClientByPhone(business.id, phone)
    if (!c) {
      const code = generateReferralCode(name || 'CLIENT')
      c = await createLoyaltyClient(business.id, phone, name || '', code, null, birthday, email)
      // Welcome notifications
      if (email) sendEmail('welcome', email, business.name, { clientName: name, businessId: business.id, clientId: c.id })
      if (phone) sendSMS('welcome', phone, business.name, { clientName: name, businessId: business.id, clientId: c.id })
      // Generate Apple Wallet pass
      generateWalletPass(c.id, name || 'Client', business.name, 0, 'Bronze')
    }
    setClient(c)
    setIsLoggedIn(true)
  }

  const handleAdminLogin = () => {
    setIsLoggedIn(true)
    setIsAdmin(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsAdmin(false)
    setClient(null)
  }

  if (loading) {
    return (
      <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Chargement...</div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <HashRouter>
        <div className="app">
          <LoginPage
            onLogin={handleLogin}
            onAdminLogin={handleAdminLogin}
            referralFrom={referralFrom}
          />
        </div>
      </HashRouter>
    )
  }

  if (isAdmin) {
    return (
      <HashRouter>
        <div className="app">
          <Admin business={business} onLogout={handleLogout} />
        </div>
      </HashRouter>
    )
  }

  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard client={client} business={business} setClient={setClient} />} />
          <Route path="/rewards" element={<Rewards client={client} business={business} setClient={setClient} />} />
          <Route path="/offers" element={<Offers client={client} business={business} />} />
          <Route path="/myqr" element={<MyQR client={client} />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/referral" element={<Referral client={client} business={business} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <BottomNav />
      </div>
    </HashRouter>
  )
}

export default App
