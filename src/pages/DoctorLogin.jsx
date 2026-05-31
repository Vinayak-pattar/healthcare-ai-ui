import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Stethoscope } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function DoctorLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login("doctor");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#071133] to-[#0F172A] flex items-center justify-center px-6">

      <div
        className="
          w-full
          max-w-md
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-[32px]
          p-10
          shadow-2xl
        "
      >

        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-cyan-400 flex items-center justify-center">
            <Stethoscope size={40} className="text-slate-950" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white text-center mb-3">
          Doctor Login
        </h1>

        <p className="text-slate-400 text-center mb-10">
          Sign in to access the MediAssist dashboard
        </p>

        <div className="space-y-6">

          <div>
            <label className="text-slate-300 text-sm mb-2 block">
              Email
            </label>

            <div className="flex items-center gap-3 bg-slate-900/70 rounded-2xl px-4 py-4">
              <Mail className="text-cyan-400" size={20} />
              <input
                type="email"
                placeholder="doctor@hospital.com"
                className="bg-transparent outline-none text-white w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 text-sm mb-2 block">
              Password
            </label>

            <div className="flex items-center gap-3 bg-slate-900/70 rounded-2xl px-4 py-4">
              <Lock className="text-cyan-400" size={20} />
              <input
                type="password"
                placeholder="Enter password"
                className="bg-transparent outline-none text-white w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-slate-400">
              <input type="checkbox" />
              Remember me
            </label>

            <button className="text-cyan-400">
              Forgot Password?
            </button>

          </div>

          <button
            onClick={handleLogin}
            className="
              w-full
              bg-gradient-to-r
              from-blue-500
              to-cyan-400
              py-4
              rounded-2xl
              font-semibold
              text-white
              shadow-xl
              hover:scale-105
              transition-all
            "
          >
            Login
          </button>

          <Link
            to="/role"
            className="block text-center text-slate-400"
          >
            ← Back
          </Link>

        </div>

      </div>

    </div>
  );
}