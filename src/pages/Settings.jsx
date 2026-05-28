import Layout from "../components/Layout"

export default function Settings() {

  return (

    <Layout>

      <div className="space-y-6">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-[#0F172A]">
              Settings
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your healthcare dashboard preferences.
            </p>

          </div>

        </div>

        {/* Appearance */}

        <div
          className="
          bg-white/80
          backdrop-blur-lg
          rounded-3xl
          p-6
          shadow-lg
          border border-white/40
        "
        >

          <h2 className="text-2xl font-bold text-[#0F172A]">
            Appearance
          </h2>

          <p className="text-gray-500 mt-2">
            Customize dashboard theme and accessibility.
          </p>

          <button className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">

            Toggle Dark Mode

          </button>

        </div>

        {/* Security */}

        <div
          className="
          bg-white/80
          backdrop-blur-lg
          rounded-3xl
          p-6
          shadow-lg
          border border-white/40
        "
        >

          <h2 className="text-2xl font-bold text-[#0F172A]">
            Security
          </h2>

          <p className="text-gray-500 mt-2">
            Manage passwords and authentication settings.
          </p>

          <button className="mt-6 bg-[#0F172A] text-white px-6 py-3 rounded-2xl hover:bg-[#1E293B] transition-all duration-300">

            Change Password

          </button>

        </div>

      </div>

    </Layout>

  )
}