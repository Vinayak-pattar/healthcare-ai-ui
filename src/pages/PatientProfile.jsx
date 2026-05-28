import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecommendationDecision, patients, recordRecommendationDecision } from "../data/mockData";
import { ArrowLeft, FileText } from "lucide-react";

export default function PatientProfile() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const locationPatient = location.state?.selectedPatient;
  const [showConfirmModal, setShowConfirmModal] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [decisionRefresh, setDecisionRefresh] = useState(0);
  const [selectedReport, setSelectedReport] = useState(null);
  const [testRequestMessage, setTestRequestMessage] = useState("");

  const patient = locationPatient || patients.find((p) => p.id === id);

  useEffect(() => {
    if (patient?.reports?.length) {
      setSelectedReport(patient.reports[0]);
    } else {
      setSelectedReport(null);
    }
    setTestRequestMessage("");
  }, [patient]);

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="rounded-[32px] bg-white p-12 shadow-sm ring-1 ring-slate-200 text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Patient Not Found</h1>
          <p className="text-slate-600 mb-6">We couldn't find the patient record you're looking for.</p>
          <button
            onClick={() => navigate("/patients")}
            className="rounded-3xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            ← Back to Patients
          </button>
        </div>
      </div>
    );
  }

  const recommendationText = patient.aiSuggestions?.[0] || "No AI recommendation available";
  const recommendationDetails = patient.aiSuggestions?.slice(1) || [];
  const recommendationReason = recommendationDetails.length > 0
    ? `AI highlights: ${recommendationDetails.join("; ")}.`
    : "AI did not provide additional supporting flags for this case.";

  const patientDecision = getRecommendationDecision(patient.id);
  const latestUpdate = patient.history.at(-1);
  const latestUpdateLabel = latestUpdate?.match(/^\d{1,2}:\d{2}\s*(?:AM|PM)/)?.[0] || "Today";

  const handleRecommendationAction = (action) => {
    const recordedDecision = recordRecommendationDecision(
      patient.id,
      action,
      action === "reject" ? rejectionReason.trim() || "No reason provided" : "Accepted by clinician"
    );

    if (recordedDecision) {
      setDecisionRefresh((current) => current + 1);
    }

    setShowConfirmModal(null);
    setRejectionReason("");
  };

  return (
    <div className="space-y-8">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/patients")}
        className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition"
      >
        <ArrowLeft size={16} />
        Back to Patients
      </button>

      {/* HEADER */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Patient profile</p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900">{patient.name}</h1>
          <p className="mt-3 text-sm text-slate-500">Full clinical view and comprehensive report summary for the current patient.</p>
        </div>

        <div className="inline-flex flex-wrap items-center gap-3">
          <span className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">{patient.id}</span>
          <span className="rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">{patient.disease}</span>
          <span className={`rounded-3xl px-4 py-3 text-sm font-semibold text-white ${
            patient.severity === "Critical" ? "bg-red-600" : patient.severity === "Moderate" ? "bg-amber-600" : "bg-emerald-600"
          }`}>
            {patient.severity}
          </span>
        </div>
      </div>

      {/* VITALS STRIP */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs uppercase tracking-[0.15em] text-slate-600 font-semibold">Heart Rate</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">78</p>
          <p className="text-xs text-slate-600 mt-1">bpm • Normal</p>
        </div>
        <div className="rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs uppercase tracking-[0.15em] text-slate-600 font-semibold">Blood Pressure</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">120/80</p>
          <p className="text-xs text-slate-600 mt-1">mmHg • Stable</p>
        </div>
        <div className="rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs uppercase tracking-[0.15em] text-slate-600 font-semibold">SpO2</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">97</p>
          <p className="text-xs text-slate-600 mt-1">% • Good</p>
        </div>
        <div className="rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs uppercase tracking-[0.15em] text-slate-600 font-semibold">Temperature</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">37.2</p>
          <p className="text-xs text-slate-600 mt-1">°C • Normal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[2.3fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Patient History</h2>
                <p className="mt-2 text-sm text-slate-500">A quick timeline of events and current review status.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                Latest update: {latestUpdateLabel}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {patient.history.map((item, index) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Report Viewer</h2>
                <p className="mt-2 text-sm text-slate-500">Preview the selected document and review the active upload for this patient.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
                {patient.reports.length} uploaded
              </span>
            </div>

            <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4 rounded-3xl bg-white px-4 py-3 ring-1 ring-slate-200">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Active preview</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{selectedReport || "No report selected"}</p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {patient.name}
                </span>
              </div>

              <div className="mt-4 h-[320px] rounded-[24px] bg-slate-950 text-white p-6">
                <div className="flex h-full flex-col justify-between rounded-[20px] border border-slate-800 bg-slate-900/80 p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Clinical document preview</p>
                    <p className="mt-3 text-2xl font-semibold">{selectedReport || "No document available"}</p>
                    <p className="mt-2 text-sm text-slate-300">Generated from the latest uploaded patient record and linked AI findings.</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-4 text-sm text-slate-200">
                    {selectedReport
                      ? `Preview details for ${selectedReport}: key findings remain synced with ${patient.name}'s current clinical plan.`
                      : "Upload a report to enable the preview panel and related annotations."}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button className="rounded-3xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Zoom In
              </button>
              <button className="rounded-3xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Zoom Out
              </button>
            </div>

            {/* FILE LIST */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Uploaded Files ({patient.reports.length})</h3>
              <div className="space-y-2">
                {patient.reports && patient.reports.length > 0 ? (
                  patient.reports.map((report, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedReport(report)}
                      className={`flex w-full items-center gap-3 rounded-3xl p-4 text-left transition ${selectedReport === report ? "bg-slate-900 text-white" : "bg-slate-50 hover:bg-slate-100 text-slate-700"}`}
                    >
                      <FileText className={`h-5 w-5 ${selectedReport === report ? "text-white" : "text-slate-600"}`} />
                      <span className="text-sm font-medium">{report}</span>
                    </button>
                  ))
                ) : (
                  <div className="rounded-3xl bg-slate-50 p-4 text-center text-slate-600 text-sm">
                    No reports uploaded
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900 mb-5">Patient summary</h2>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                <span>Age</span>
                <span className="font-semibold text-slate-900">{patient.age}</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                <span>Organ system</span>
                <span className="font-semibold text-slate-900">{patient.organ}</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                <span>Severity</span>
                <span className="font-semibold text-slate-900">{patient.severity}</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                <span>Admitted</span>
                <span className="font-semibold text-slate-900">{patient.admitted}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900 mb-5">Symptoms</h2>
            <ul className="space-y-3 text-slate-700">
              {patient.symptoms.map((symptom, index) => (
                <li key={index} className="rounded-3xl bg-slate-50 px-4 py-3">
                  • {symptom}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900 mb-5">AI Recommendation</h2>
            <div className="space-y-5">
              <div className="rounded-3xl bg-blue-50 p-5 border border-blue-200">
                <p className="font-semibold text-lg text-slate-900">AI Suggested Action</p>
                <p className="mt-2 text-sm text-slate-600">{recommendationText}</p>
              </div>
              <div className="rounded-3xl bg-red-50 p-5 border border-red-200">
                <p className="font-semibold text-slate-900">Why This Case Was Flagged</p>
                <p className="mt-2 text-sm text-slate-600">{recommendationReason}</p>
              </div>
              {patientDecision && (
                <div className={`rounded-3xl border p-5 ${patientDecision.action === "accept" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
                  <p className="font-semibold text-slate-900">Decision recorded: {patientDecision.action === "accept" ? "Accepted" : "Rejected"}</p>
                  <p className="mt-2 text-sm text-slate-600">Recorded at {patientDecision.recordedAt}</p>
                  <p className="mt-2 text-xs text-slate-600">Reason: {patientDecision.reason}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowConfirmModal({ type: "accept", isOpen: true })}
                  disabled={Boolean(patientDecision)}
                  className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Accept recommendation
                </button>
                <button
                  onClick={() => setShowConfirmModal({ type: "reject", isOpen: true })}
                  disabled={Boolean(patientDecision)}
                  className="rounded-3xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Reject recommendation
                </button>
                <button
                  onClick={() => {
                    const requestedTests = patient.aiSuggestions?.slice(0, 2).join("; ") || "No AI-suggested tests available";
                    setTestRequestMessage(`${patient.name} test request queued: ${requestedTests}.`);
                  }}
                  className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Request tests
                </button>
              </div>

              {testRequestMessage && (
                <div className="rounded-3xl bg-blue-50 p-4 text-sm text-blue-800 ring-1 ring-blue-200">
                  {testRequestMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirmModal?.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="rounded-[32px] bg-white p-8 shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {showConfirmModal.type === "accept" ? "Accept Recommendation" : "Reject Recommendation"}
            </h3>
            <p className="text-slate-600 mb-6">
              {showConfirmModal.type === "accept"
                ? "Are you sure you want to accept this AI recommendation for the patient?"
                : "Are you sure you want to reject this recommendation? Please provide your reasoning."}
            </p>
            {showConfirmModal.type === "reject" && (
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Your reason for rejection..."
                className="w-full rounded-3xl border border-slate-200 p-4 mb-6 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                rows={3}
              />
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(null)}
                className="flex-1 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRecommendationAction(showConfirmModal.type)}
                className={`flex-1 rounded-3xl px-4 py-3 text-sm font-semibold text-white transition ${
                  showConfirmModal.type === "accept"
                    ? "bg-emerald-600 hover:bg-emerald-500"
                    : "bg-red-600 hover:bg-red-500"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}