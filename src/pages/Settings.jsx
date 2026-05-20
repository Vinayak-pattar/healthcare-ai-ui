import { useState } from "react"

export default function Settings() {

  const [darkMode, setDarkMode] = useState(false)
  return (
    <div
  className={`min-h-screen p-8 lg:p-10 transition-all duration-300 ${
    darkMode
      ? "bg-gray-900 text-white"
      : "bg-gradient-to-br from-gray-100 to-blue-50 text-black"
  }`}
>

      <h1 className="text-5xl font-extrabold tracking-tight mb-10">
        Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Profile Settings */}

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>

          <h2 className="text-2xl font-bold mb-6">
            Profile Settings
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Doctor Name"
              className={`w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${
  darkMode
    ? "bg-gray-700 text-white placeholder-gray-300"
    : "bg-white text-black"
}`}
            />

            <input
              type="email"
              placeholder="Email Address"
              className={`w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${
  darkMode
    ? "bg-gray-700 text-white placeholder-gray-300"
    : "bg-white text-black"
}`}
            />

            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300">

              Save Changes

            </button>

          </div>

        </div>

        {/* App Preferences */}

        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>

          <h2 className="text-2xl font-bold mb-6">
            App Preferences
          </h2>

          <div className="space-y-5">

            <div className="flex items-center justify-between">

              <p>Email Notifications</p>

              <input type="checkbox" />

            </div>

            <div className="flex items-center justify-between">

              <p>Dark Mode</p>

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />

            </div>

            <div className="flex items-center justify-between">

              <p>Auto Report Sync</p>

              <input type="checkbox" />

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}