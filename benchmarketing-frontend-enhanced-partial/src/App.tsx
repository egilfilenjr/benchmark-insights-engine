
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Settings from '@/pages/Settings'
import Reports from '@/pages/Reports'
import Toolbox from '@/pages/Toolbox'
import Integrations from '@/pages/Integrations'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/toolbox" element={<Toolbox />} />
        <Route path="/integrations" element={<Integrations />} />
      </Routes>
    </Router>
  )
}

export default App
