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
import { getBusiness, getClientByPhone, createLoyaltyClient, generateReferralCode, sendSMS, sendEmail, generateWalletPass, registerClient, loginClient } from './services/supabase'
import './index.css'

function App() {
  const savedClient = (() => { try { return JSON.parse(localStorage.getItem('loyalty_client')) } catch { return null } })()
  const [isLoggedIn, setIsLoggedIn] = useState(!!savedClient)
  const [isAdmin, setIsAdmin] = useState(false)
  const [client, setClient] = useState(savedClient)
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

  const handleLogin = async (email, password) => {
    if (!business) return
    const c = await loginClient(business.id, email, password)
    localStorage.setItem('loyalty_client', JSON.stringify(c))
    setClient(c)
    setIsLoggedIn(true)
  }

  const handleSignup = async (email, password, name, phone, birthday) => {
    if (!business) return
    const code = generateReferralCode(name || 'CLIENT')
    const referralFromParam = new URLSearchParams(window.location.search).get('ref')
    let referredBy = null
    if (referralFromParam) {
      // Lookup referrer by referral code
      referredBy = referralFromParam
    }
    const c = await registerClient(business.id, email, password, name, phone, birthday, code, referredBy)
    if (email) sendEmail('welcome', email, business.name, { clientName: name, businessId: business.id, clientId: c.id })
    if (phone) sendSMS('welcome', phone, business.name, { clientName: name, businessId: business.id, clientId: c.id })
    generateWalletPass(c.id)
    localStorage.setItem('loyalty_client', JSON.stringify(c))
    setClient(c)
    setIsLoggedIn(true)
  }

  const handleDemo = () => {
    const demoClient = {
      id: 'demo',
      name: 'Marie',
      email: 'demo@logiccsupplies.ca',
      points_balance: 325,
      total_points_earned: 575,
      visit_count: 8,
      referral_code: 'MARIE2024',
      created_at: '2026-01-15',
    }
    setClient(demoClient)
    setIsLoggedIn(true)
  }

  const handleAdminLogin = () => {
    setIsLoggedIn(true)
    setIsAdmin(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('loyalty_client')
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
            onSignup={handleSignup}
            onAdminLogin={handleAdminLogin}
            onDemo={handleDemo}
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
          <Route path="/" element={<Dashboard client={client} business={business} setClient={setClient} onLogout={handleLogout} />} />
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
