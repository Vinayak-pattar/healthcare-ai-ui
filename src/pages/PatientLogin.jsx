import { useNavigate } from "react-router-dom";
import { UserRound, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function PatientLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#071133] to-[#0F172A] flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-xl p-10 shadow-2xl">

        <h1 className="text-4xl font-bold text-white mb-2">
          Patient Login
        </h1>

        <p className="text-slate-400 mb-8">
          Access your treatment records and reports
        </p>

        <div className="space-y-5">

          <div className="flex items-center gap-3 bg-slate-900/70 rounded-2xl px-4 py-4">
            <UserRound className="text-cyan-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent w-full outline-none text-white placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-3 bg-slate-900/70 rounded-2xl px-4 py-4">
            <Lock className="text-cyan-400" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent w-full outline-none text-white placeholder:text-slate-500"
            />
          </div>

          <button
  onClick={() => {
    login("patient");
    navigate("/patient/dashboard");
  }}
  className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 py-4 rounded-2xl text-white font-bold shadow-xl hover:scale-105 transition-all"
>
  Login
</button>

        </div>

      </div>

    </div>
  );
}