import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";

import Alerts from "./pages/Alerts";

import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import ActiveCases from "./pages/ActiveCases";
import PendingReports from "./pages/PendingReports";
import AIRecommendations from "./pages/AIRecommendations";
import PatientHistory from "./pages/PatientHistory";
import TimelinePage from "./pages/TimelinePage";
import DailyStats from "./pages/DailyStats";
import Performance from "./pages/Performance";
import ExportData from "./pages/ExportData";
import Notifications from "./pages/Notifications";
import SettingsPage from "./pages/SettingsPage";
import Help from "./pages/Help";
import DecisionPanel from "./pages/DecisionPanel";

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>

      <div className="flex bg-slate-50 min-h-screen text-slate-900">

        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((current) => !current)} />

        <div
          className="flex-1 p-8 xl:p-10 transition-all duration-300"
          style={{ marginLeft: sidebarCollapsed ? "5rem" : "18rem" }}
        >

          <Topbar />

          <Routes>

            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/patients" element={<Patients />} />

             <Route path="/patients/:id" element={<PatientProfile />} />

            <Route path="/alerts" element={<Alerts />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/active-cases" element={<ActiveCases />} />

            <Route path="/pending-reports" element={<PendingReports />} />

            <Route path="/ai-recommendations" element={<AIRecommendations />} />

            <Route path="/patient-history" element={<PatientHistory />} />

            <Route path="/timeline" element={<TimelinePage />} />

            <Route path="/daily-stats" element={<DailyStats />} />

            <Route path="/performance" element={<Performance />} />

            <Route path="/export-data" element={<ExportData />} />

            <Route path="/notifications" element={<Notifications />} />

            <Route path="/decision-panel" element={<DecisionPanel />} />

            <Route path="/settings" element={<SettingsPage />} />

            <Route path="/help" element={<Help />} />

            <Route path="/reports/:id" element={<Reports />} />

            <Route path="*" element={<div className="rounded-[32px] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Navigation</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">Page not found</h1>
              <p className="mt-3 text-sm text-slate-600">The requested page could not be located. Return to the dashboard to continue.</p>
            </div>} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}