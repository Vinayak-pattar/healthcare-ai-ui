import {
  Menu,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function PatientTopbar({
  onMenuClick,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="
      flex
      justify-between
      items-center
      bg-slate-900
border border-slate-800
text-white
      rounded-3xl
      p-5
      mb-8
      shadow-sm
      "
    >
      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
        >
          <Menu />
        </button>

        <button
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </button>

        <h2 className="text-xl font-bold text-white">
  Patient Portal
</h2>

      </div>

      <div className="text-slate-300">
        Welcome Patient
      </div>
    </div>
  );
}