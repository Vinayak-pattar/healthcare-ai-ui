import { Link } from "react-router-dom"

export default function LandingPage() {

  return (

    <div className="min-h-screen bg-[#0F172A] text-white overflow-hidden">

      {/* Navbar */}

      <nav className="flex justify-between items-center px-10 py-6">

        <h1 className="text-3xl font-bold">
          MediAssist
        </h1>

        <Link to="/dashboard">

          <button
            className="
            bg-gradient-to-r
            from-blue-500
            to-cyan-400
            px-6 py-3
            rounded-2xl
            shadow-lg
            hover:scale-105
            transition-all duration-300
          "
          >

            Open Dashboard

          </button>

        </Link>

      </nav>

      {/* Hero Section */}

      <section
        className="
        flex flex-col md:flex-row
        items-center justify-between
        px-10 py-20
        gap-10
      "
      >

        {/* Left */}

        <div className="max-w-xl">

          <p className="text-cyan-400 mb-4 tracking-widest">
            AI Powered Healthcare Routing
          </p>

          <h1 className="text-6xl font-bold leading-tight mb-6">

            Smarter <br />
            Healthcare System

          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">

            MediAssist uses artificial intelligence to analyze symptoms,
            prioritize emergencies, route patients to nearby specialists,
            and assist healthcare professionals in real time.

          </p>

          <div className="flex gap-4">

            <Link to="/dashboard">

              <button
                className="
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                px-6 py-3
                rounded-2xl
                shadow-xl
                hover:scale-105
                transition-all duration-300
              "
              >

                Launch Dashboard

              </button>

            </Link>

            <button
              className="
              border border-gray-500
              px-6 py-3
              rounded-2xl
              hover:bg-white hover:text-black
              transition-all duration-300
            "
            >

              Learn More

            </button>

          </div>

        </div>

        {/* Right Card */}

        <div
          className="
          bg-white/10
          backdrop-blur-lg
          p-8
          rounded-3xl
          shadow-2xl
          border border-white/20
          w-full
          max-w-md
        "
        >

          <h2 className="text-2xl font-semibold mb-6">

            Live AI Routing

          </h2>

          <div className="space-y-4">

            <div className="bg-[#1E293B] p-4 rounded-2xl">

              ❤️ Chest Pain → Cardiology

            </div>

            <div className="bg-[#1E293B] p-4 rounded-2xl">

              🤒 Fever → General Medicine

            </div>

            <div className="bg-[#1E293B] p-4 rounded-2xl">

              🦴 Fracture → Orthopedics

            </div>

            <div className="bg-[#1E293B] p-4 rounded-2xl">

              📄 AI Report Analysis Completed

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="px-10 pb-20">

        <h2 className="text-4xl font-bold text-center mb-14">

          Core Features

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div
            className="
            bg-white/10
            backdrop-blur-lg
            p-8
            rounded-3xl
            border border-white/10
            hover:-translate-y-2
            transition-all duration-300
          "
          >

            <h3 className="text-2xl font-semibold mb-4">

              Smart Routing

            </h3>

            <p className="text-gray-300">

              AI analyzes patient symptoms and routes them
              to the most suitable healthcare specialist instantly.

            </p>

          </div>

          <div
            className="
            bg-white/10
            backdrop-blur-lg
            p-8
            rounded-3xl
            border border-white/10
            hover:-translate-y-2
            transition-all duration-300
          "
          >

            <h3 className="text-2xl font-semibold mb-4">

              Emergency Detection

            </h3>

            <p className="text-gray-300">

              Detects high-priority medical emergencies
              and triggers urgent notifications immediately.

            </p>

          </div>

          <div
            className="
            bg-white/10
            backdrop-blur-lg
            p-8
            rounded-3xl
            border border-white/10
            hover:-translate-y-2
            transition-all duration-300
          "
          >

            <h3 className="text-2xl font-semibold mb-4">

              AI Assistance

            </h3>

            <p className="text-gray-300">

              Assists doctors with patient history,
              report summaries, and treatment recommendations.

            </p>

          </div>

        </div>

      </section>

    </div>

  )
}