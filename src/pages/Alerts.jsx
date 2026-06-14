import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// LIVE BACKEND API URL
const API_URL = "https://medverify-ai-ocr.onrender.com";

export default function Alerts() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [reviewedIds, setReviewedIds] = useState([]);
  const [sourceFilter, setSourceFilter] = useState("all");

  // Fetch live alerts from backend
  useEffect(() => {
    fetchAlerts();
    // Refresh every 10 seconds
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch(`${API_URL}/alerts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Convert backend alerts to dashboard format
      const formattedAlerts = (data.alerts || []).map(alert => ({
        patientId: alert.patient_id || alert.user_id || `alert_${alert.alert_id}`,
        patient: alert.patient_name || `Patient ${alert.patient_id || alert.user_id}`,
        issue: alert.reason || "Alert triggered",
        severity: alert.severity || "MEDIUM",
        action: alert.recommendation || alert.reason || "Review patient case",
        source: alert.source || "manual",
        created_at: alert.created_at,
        alert_id: alert.alert_id
      }));
      
      setAlerts(formattedAlerts);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error("Error fetching alerts:", err);
      setError("Could not load alerts. Make sure backend is running.");
      setLoading(false);
    }
  };

  // Function to check if alert is AI-generated
  const isAiAlert = (alert) => {
    return alert.source === "whatsapp_symptom" || alert.source === "whatsapp_image";
  };

  // Filter alerts based on source filter
  const getFilteredAlerts = () => {
    let filtered = alerts;
    
    if (sourceFilter === "ai") {
      filtered = filtered.filter(alert => isAiAlert(alert));
    } else if (sourceFilter === "manual") {
      filtered = filtered.filter(alert => !isAiAlert(alert));
    }
    
    return filtered;
  };

  const alertItems = getFilteredAlerts();

  const selectedPatient = selectedAlert
    ? { name: selectedAlert.patient, id: selectedAlert.patientId, history: ["Patient reported symptoms", "AI analysis completed", "Alert triggered"] }
    : null;

  const handleMarkReviewed = (alert) => {
    setReviewedIds((current) =>
      current.includes(alert.patientId) ? current : [...current, alert.patientId]
    );
  };

  // Show loading state
  if (loading && alerts.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-2xl mb-4">🔄</div>
          <p className="text-slate-600">Loading alerts from server...</p>
          <p className="text-sm text-slate-400 mt-2">Fetching from {API_URL}</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && alerts.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-2xl mb-4">⚠️</div>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchAlerts}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">Urgent alerts</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900">Critical Patient Alerts</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500">
              Live AI-powered alerts from WhatsApp. Severity levels: HIGH (red), MEDIUM (yellow), LOW (green).
            </p>
          </div>
          <div className="rounded-3xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-700">
            {alertItems.length} critical alerts
          </div>
        </div>
      </div>

      {/* AI Filter Section */}
      <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">Filter by source:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSourceFilter("all")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  sourceFilter === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All Alerts
              </button>
              <button
                onClick={() => setSourceFilter("ai")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  sourceFilter === "ai"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                🤖 AI Alerts Only
              </button>
              <button
                onClick={() => setSourceFilter("manual")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  sourceFilter === "manual"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Manual Alerts
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchAlerts}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              🔄 Refresh
            </button>
            <div className="text-xs text-slate-400">
              {sourceFilter === "ai" && "🤖 Showing AI-generated alerts from WhatsApp"}
              {sourceFilter === "manual" && "📋 Showing manually created alerts"}
              {sourceFilter === "all" && "📊 Showing all alerts"}
            </div>
          </div>
        </div>
      </div>

      {alertItems.length === 0 ? (
        <div className="rounded-[32px] bg-white p-8 text-center">
          <p className="text-slate-500">No alerts found. Send "chest pain" to WhatsApp to test.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {alertItems.map((alert) => {
            const isReviewed = reviewedIds.includes(alert.patientId);
            const aiGenerated = isAiAlert(alert);
            const severityColor = alert.severity === "HIGH" ? "bg-red-100 text-red-700" : 
                                  alert.severity === "MEDIUM" ? "bg-yellow-100 text-yellow-700" : 
                                  "bg-green-100 text-green-700";

            return (
              <div key={alert.patientId} className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">{alert.patient}</h2>
                    <p className="mt-2 text-sm text-slate-500">{alert.issue}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`rounded-full px-4 py-2 text-sm font-semibold ${severityColor}`}>
                      {alert.severity}
                    </span>
                    {isReviewed && (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Reviewed ✓
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-5 flex flex-wrap gap-2">
                  {aiGenerated && (
                    <span 
                      className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm"
                      title="AI-generated from WhatsApp"
                    >
                      🤖 AI Generated
                    </span>
                  )}
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    AI suggestion
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {alert.action}
                  </span>
                </div>

                <div className="mb-5 rounded-3xl bg-red-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">Recommended action</p>
                  <p className="mt-2">{alert.action}</p>
                  {aiGenerated && (
                    <p className="mt-3 text-xs text-purple-600 border-t border-red-100 pt-2">
                      📱 Source: {alert.source === "whatsapp_symptom" ? "WhatsApp Symptom Report" : "WhatsApp Image Upload"}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedAlert(alert)}
                    className="rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
                  >
                    Open critical history
                  </button>
                  <button
                    onClick={() => navigate(`/patients/${alert.patientId}`)}
                    className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    View Patient
                  </button>
                  <button
                    onClick={() => handleMarkReviewed(alert)}
                    disabled={isReviewed}
                    className={`rounded-3xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
                      isReviewed
                        ? "bg-emerald-200 text-emerald-900"
                        : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                    }`}
                  >
                    {isReviewed ? "Reviewed ✓" : "Mark Reviewed"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedPatient && (
        <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">{selectedPatient.name}</h2>
              <p className="mt-2 text-sm text-slate-500">Full case history and AI escalation guidance</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate(`/patients/${selectedPatient.id}`)}
                className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View Full Profile
              </button>
              <button
                onClick={() => setSelectedAlert(null)}
                className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Close details
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {selectedPatient.history.map((item, index) => (
              <div key={index} className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-red-50 p-6">
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">AI Emergency Recommendation</h3>
            <p className="text-sm text-slate-700">
              {selectedAlert?.action || "Immediate ICU observation and specialist consultation are recommended for this level of severity."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}