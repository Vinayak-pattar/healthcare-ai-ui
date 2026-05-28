import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alerts, patients } from "../../data/mockData";
import { AlertCircle, Eye, CheckCircle } from "lucide-react";

export default function PatientSummary() {
  const navigate = useNavigate();
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState([]);
  
  const displayAlerts = alerts.slice(0, 3);
  const severityColors = {
    Critical: { bg: "bg-red-50", border: "border-red-200", icon: "text-red-600", label: "bg-red-100 text-red-700" },
    Moderate: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-600", label: "bg-amber-100 text-amber-700" },
    Low: { bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-600", label: "bg-emerald-100 text-emerald-700" },
  };

  const getPatientInfo = (patientName) => {
    return patients.find(p => p.name === patientName);
  };

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">AI Clinical Alerts</h2>
          <p className="text-sm text-slate-600 mt-1">Real-time alerts from AI analysis</p>
        </div>
        <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
          {alerts.length} Active
        </span>
      </div>

      <div className="space-y-4">
        {displayAlerts.map((alert, index) => {
          const isAcknowledged = acknowledgedAlerts.includes(alert.patient);
          const patient = getPatientInfo(alert.patient);
          const colors = severityColors[alert.severity] || severityColors.Low;

          return (
            <div key={index} className={`p-6 rounded-[28px] border-2 transition ${colors.bg} ${colors.border}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <AlertCircle className={`h-6 w-6 ${colors.icon} flex-shrink-0 mt-1`} />
                  <div className="flex-1">
                    <h3 className={`font-bold text-slate-900 flex items-center gap-2`}>
                      {alert.issue}
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${colors.label}`}>
                        {alert.severity}
                      </span>
                    </h3>
                    <p className="text-sm text-slate-700 mt-2">
                      <span className="font-semibold">Patient:</span> {alert.patient}
                    </p>
                    <p className="text-sm text-slate-700 mt-1">
                      <span className="font-semibold">Recommendation:</span> {alert.action}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {patient && (
                    <button
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-700 px-3 py-2 rounded-full text-xs font-semibold transition border border-slate-200"
                      title="View patient profile"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (isAcknowledged) {
                        setAcknowledgedAlerts(acknowledgedAlerts.filter(p => p !== alert.patient));
                      } else {
                        setAcknowledgedAlerts([...acknowledgedAlerts, alert.patient]);
                      }
                    }}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold transition border ${
                      isAcknowledged
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                    title={isAcknowledged ? "Undo acknowledgement" : "Acknowledge alert"}
                  >
                    <CheckCircle size={14} />
                    {isAcknowledged ? "✓" : "Ack"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/alerts")}
        className="mt-6 w-full rounded-3xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition"
      >
        View All Alerts ({alerts.length})
      </button>
    </div>
  );
}