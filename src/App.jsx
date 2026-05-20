import { Routes, Route } from "react-router-dom"

import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/reports" element={<Reports />} />

      <Route path="/settings" element={<Settings />} />

    </Routes>
  )
}