import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Rewards from './pages/Rewards'
import Referral from './pages/Referral'
import Admin from './pages/Admin'
import BottomNav from './components/BottomNav'
import './index.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [referralFrom, setReferralFrom] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) setReferralFrom(ref)
  }, [])

  if (!isLoggedIn) {
    return (
      <HashRouter>
        <div className="app">
          <LoginPage
            onLogin={() => setIsLoggedIn(true)}
            onAdminLogin={() => { setIsLoggedIn(true); setIsAdmin(true) }}
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
          <Admin onLogout={() => { setIsLoggedIn(false); setIsAdmin(false) }} />
        </div>
      </HashRouter>
    )
  }

  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <BottomNav />
      </div>
    </HashRouter>
  )
}

export default App
