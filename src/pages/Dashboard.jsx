import { NavLink } from "react-router-dom"
import {
  FaFileMedical,
  FaChartLine,
  FaCog
} from "react-icons/fa"
export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-blue-50">

      {/* Sidebar */}
<div className="w-72 bg-blue-700 text-white p-6">

  <h1 className="text-3xl font-bold mb-10">
    Healthcare AI
  </h1>

  <div className="flex flex-col gap-6 text-lg">

    <NavLink
      to="/dashboard"
      className={({ isActive }) =>
        isActive
          ? "flex items-center gap-3 text-left p-3 rounded-xl bg-blue-600 text-white"
          : "flex items-center gap-3 text-left p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
      }
    >
      <FaChartLine />
      Dashboard
    </NavLink>

    <NavLink
      to="/reports"
      className={({ isActive }) =>
        isActive
          ? "flex items-center gap-3 text-left p-3 rounded-xl bg-blue-600 text-white"
          : "flex items-center gap-3 text-left p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
      }
    >
      <FaFileMedical />
      Reports
    </NavLink>

    <NavLink
  to="/settings"
  className={({ isActive }) =>
    isActive
      ? "flex items-center gap-3 text-left p-3 rounded-xl bg-blue-600 text-white"
      : "flex items-center gap-3 text-left p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
  }
>
  <FaCog />
  Settings
</NavLink>

  </div>

</div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-10">

        <h1 className="text-5xl font-extrabold tracking-tight mb-10">
          Healthcare Dashboard
        </h1>
        {/* Top Stats */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

  <div className="bg-white p-5 rounded-2xl shadow-lg">

    <p className="text-gray-500">
      Total Patients
    </p>

    <h2 className="text-3xl font-bold mt-2">
      1,248
    </h2>

  </div>

  <div className="bg-white p-5 rounded-2xl shadow-lg">

    <p className="text-gray-500">
      Critical Cases
    </p>

    <h2 className="text-3xl font-bold mt-2 text-red-500">
      32
    </h2>

  </div>

  <div className="bg-white p-5 rounded-2xl shadow-lg">

    <p className="text-gray-500">
      Reports Uploaded
    </p>

    <h2 className="text-3xl font-bold mt-2">
      542
    </h2>

  </div>

  <div className="bg-white p-5 rounded-2xl shadow-lg">

    <p className="text-gray-500">
      Doctors Available
    </p>

    <h2 className="text-3xl font-bold mt-2 text-green-600">
      18
    </h2>

  </div>

</div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

            <h2 className="text-xl font-semibold mb-3">
              Patient Name
            </h2>

            <p className="text-gray-600">
              Ravi Kumar
            </p>

          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

            <h2 className="text-xl font-semibold mb-3">
              Symptoms
            </h2>

            <p className="text-gray-600">
              Fever, Chest Pain
            </p>

          </div>

          {/* Card 3 */}
          <div className="bg-red-500 text-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-semibold mb-3">
              Urgency
            </h2>

            <p>
              High Risk
            </p>

          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

            <h2 className="text-xl font-semibold mb-3">
              Doctor Assigned
            </h2>

            <p className="text-gray-600">
              Dr. Sharma
            </p>

          </div>

        </div>
        {/* Patient Table */}

<div className="mt-12 bg-white p-6 rounded-2xl shadow-lg">

  <h2 className="text-2xl font-bold mb-6">
    Recent Patients
  </h2>

  <table className="w-full">

    <thead>

      <tr className="text-left border-b">

        <th className="pb-4">Patient</th>
        <th className="pb-4">Symptoms</th>
        <th className="pb-4">Status</th>
        <th className="pb-4">Doctor</th>

      </tr>

    </thead>

    <tbody>

      <tr className="border-b">

        <td className="py-4">Ravi Kumar</td>
        <td>Fever</td>

        <td>
          <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm">
            Moderate
          </span>
        </td>

        <td>Dr. Sharma</td>

      </tr>

      <tr className="border-b">

        <td className="py-4">Anjali Mehta</td>
        <td>Chest Pain</td>

        <td>
          <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm">
            High Risk
          </span>
        </td>

        <td>Dr. Verma</td>

      </tr>

      <tr>

        <td className="py-4">Suresh Patel</td>
        <td>Headache</td>

        <td>
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
            Stable
          </span>
        </td>

        <td>Dr. Rao</td>

      </tr>

    </tbody>

  </table>

</div>

{/* Recent Activity */}

<div className="mt-10 bg-white p-6 rounded-2xl shadow-lg">

  <h2 className="text-2xl font-bold mb-6">
    Recent Activity
  </h2>

  <div className="space-y-5">

    <div className="flex justify-between border-b pb-4">

      <p>
        Ravi Kumar uploaded a blood test report
      </p>

      <span className="text-gray-400">
        2 mins ago
      </span>

    </div>

    <div className="flex justify-between border-b pb-4">

      <p>
        AI classified patient as Moderate Risk
      </p>

      <span className="text-gray-400">
        10 mins ago
      </span>

    </div>

    <div className="flex justify-between">

      <p>
        Dr. Sharma reviewed patient summary
      </p>

      <span className="text-gray-400">
        25 mins ago
      </span>

    </div>

  </div>

</div>
      </div>

    </div>
  )
}