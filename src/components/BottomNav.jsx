import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Gift, Users } from 'lucide-react'

const tabs = [
  { path: '/', icon: Home, label: 'Accueil' },
  { path: '/rewards', icon: Gift, label: 'Récompenses' },
  { path: '/referral', icon: Users, label: 'Parrainage' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => {
        const Icon = tab.icon
        const active = location.pathname === tab.path
        return (
          <button
            key={tab.path}
            className={`nav-item ${active ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
