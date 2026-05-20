import Navbar from "../components/Navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">

      <Navbar />

      <div className="flex flex-col items-center justify-center text-center px-6 mt-40">

        <h1 className="text-6xl font-bold text-blue-700 mb-6">
          Healthcare AI Assistant
        </h1>

        <p className="text-gray-600 text-xl max-w-2xl mb-10">
          AI-powered multilingual healthcare navigation platform for patients in villages and cities.
        </p>

        <div className="flex gap-5">

          <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300">
            Start Checkup
          </button>

          <button className="bg-white px-8 py-4 rounded-2xl shadow-lg border border-gray-300 hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300">
            Upload Report
          </button>

        </div>

      </div>

    </div>
  )
}