import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alerts, patients } from "../data/mockData";

export default function Alerts() {
  const navigate = useNavigate();
  const alertItems = alerts;
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [reviewedIds, setReviewedIds] = useState([]);

  const selectedPatient = selectedAlert
    ? patients.find((patient) => patient.id === selectedAlert.patientId)
    : null;

  const handleMarkReviewed = (alert) => {
    setReviewedIds((current) =>
      current.includes(alert.patientId) ? current : [...current, alert.patientId]
    );
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">Urgent alerts</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900">Critical Patient Alerts</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500">
              Review the highest-priority patient cases and open individual histories for immediate action.
            </p>
          </div>
          <div className="rounded-3xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-700">
            {alertItems.length} critical alerts
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {alertItems.map((alert) => {
          const isReviewed = reviewedIds.includes(alert.patientId);

          return (
            <div key={alert.patientId} className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{alert.patient}</h2>
                  <p className="mt-2 text-sm text-slate-500">{alert.issue}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
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
