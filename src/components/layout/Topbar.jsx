
import { Bell, Search, UserCircle2, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { patientNotifications } from "../../data/mockData";
import Timeline from "../dashboard/Timeline";


export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const notificationsRef = useRef(null);

  const unreadCount = patientNotifications.filter((n) => n.unread).length;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!showNotifications) return;

    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showNotifications]);

  const getPageLabel = (pathname) => {
    const paths = {
      '/': 'Dashboard',
      '/active-cases': 'Active Cases',
      '/alerts': 'High Risk Alerts',
      '/patients': 'Patient List',
      '/decision-panel': 'Decision Panel',
      '/profile': 'Profile',
    };
    return paths[pathname] || 'Dashboard';
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) return;

    navigate("/patients", { state: { searchTerm: trimmedSearch } });
    setSearchTerm("");
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-[32px] bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200 mb-8">
      {/* LEFT - SEARCH, BREADCRUMB & DATE/TIME */}
      <div className="flex items-center gap-3 flex-1">
        <form onSubmit={handleSearch} className="flex max-w-md items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search patients"
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
          />
        </form>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Dashboard</span>
          <ChevronRight size={16} className="text-slate-400" />
          <span className="font-semibold text-slate-900">{getPageLabel(location.pathname)}</span>
        </div>
        <div className="ml-4 text-xs text-slate-500">
          {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* RIGHT - ACTIONS */}
      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setShowNotifications((v) => !v)}
          className="relative inline-flex items-center gap-2 rounded-3xl bg-slate-100 hover:bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition"
          aria-label="Open notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div ref={notificationsRef} className="absolute right-0 top-12 z-50 w-[420px] max-w-[90vw]">
            <div className="rounded-[32px] bg-white p-0 shadow-2xl ring-1 ring-slate-200">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div>
                  <p className="font-semibold text-slate-900 text-lg">Real-Time Notifications</p>
                  <p className="mt-1 text-xs text-slate-500">{unreadCount} unread updates available</p>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-900 p-1 rounded-full"
                  aria-label="Close notifications"
                >
                  ×
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
                <Timeline compact showHeader={false} maxItems={6} />
              </div>
              <div className="border-t border-slate-100 px-6 py-4">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate("/notifications");
                  }}
                  className="w-full rounded-3xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Open full notifications center
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate("/profile")}
          className="inline-flex items-center gap-3 rounded-3xl bg-slate-100 hover:bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition"
        >
          <UserCircle2 className="h-6 w-6 text-slate-600" />
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900">Dr. Sharma</p>
            <p className="text-xs text-slate-600">Cardiologist</p>
          </div>
        </button>
      </div>
    </div>
  );
}