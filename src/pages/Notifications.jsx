import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle, FileText, Bell, Zap, Users } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import { patientNotifications } from "../data/mockData";

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(patientNotifications);

  const unreadCount = notifications.filter((notification) => notification.unread).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "critical_alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "report_upload":
        return <FileText className="h-5 w-5 text-amber-500" />;
      case "escalation":
        return <Zap className="h-5 w-5 text-red-600" />;
      case "medication":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case "specialist":
        return <Users className="h-5 w-5 text-blue-500" />;
      case "document_upload":
        return <FileText className="h-5 w-5 text-cyan-500" />;
      case "emergency":
        return <AlertTriangle className="h-5 w-5 text-rose-600" />;
      case "critical_arrival":
        return <Zap className="h-5 w-5 text-red-600" />;
      default:
        return <Bell className="h-5 w-5 text-slate-500" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case "critical_alert":
        return "bg-red-50 border-red-200 hover:bg-red-100";
      case "report_upload":
        return "bg-amber-50 border-amber-200 hover:bg-amber-100";
      case "document_upload":
        return "bg-cyan-50 border-cyan-200 hover:bg-cyan-100";
      case "escalation":
        return "bg-red-50 border-red-200 hover:bg-red-100";
      case "emergency":
        return "bg-rose-50 border-rose-200 hover:bg-rose-100";
      case "critical_arrival":
        return "bg-red-50 border-red-200 hover:bg-red-100";
      case "medication":
        return "bg-emerald-50 border-emerald-200 hover:bg-emerald-100";
      case "specialist":
        return "bg-blue-50 border-blue-200 hover:bg-blue-100";
      default:
        return "bg-slate-50 border-slate-200 hover:bg-slate-100";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "Moderate":
        return "bg-amber-100 text-amber-700";
      case "Low":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <PageShell
      title="Notifications"
      subtitle="Live notifications and critical alerts for your patients."
      status="Real-time messaging center"
      footer={
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-900">Notification settings</p>
            <p className="mt-2 text-sm text-slate-600">Control how and when you receive alerts.</p>
          </div>
          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-900">Alert history</p>
            <p className="mt-2 text-sm text-slate-600">Review recent notifications for audit and follow-up.</p>
          </div>
        </div>
      }
    >
      <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 mb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Inbox status</p>
            <p className="mt-1 text-sm text-slate-500">{unreadCount} unread notifications queued for review.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setNotifications((current) => current.map((notification) => ({ ...notification, unread: false })))}
              className="rounded-3xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Mark all read
            </button>
            <span className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {notifications.length} total
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="rounded-[32px] bg-slate-50 p-8 text-center shadow-sm ring-1 ring-slate-200">
            <Bell className="h-12 w-12 mx-auto text-slate-300 mb-3" />
            <p className="text-slate-600">No notifications at this time</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => {
                setNotifications((current) => current.map((item) => item.id === notification.id ? { ...item, unread: false } : item));
                navigate(`/patients/${notification.patientId}`);
              }}
              className={`cursor-pointer rounded-[28px] border p-5 shadow-sm transition duration-200 ${getBackgroundColor(
                notification.type
              )}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-slate-900">
                        {notification.title}
                      </h3>
                      {notification.unread && (
                        <span className="inline-block h-2 w-2 rounded-full bg-red-500"></span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-xs font-semibold text-slate-700">
                        {notification.patientName}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getSeverityColor(
                          notification.severity
                        )}`}
                      >
                        {notification.severity}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 whitespace-nowrap ml-4">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </PageShell>
  );
}