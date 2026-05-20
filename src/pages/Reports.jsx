export default function Reports() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-8 lg:p-10">

      <h1 className="text-5xl font-extrabold mb-10">
        Reports Viewer
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Report Preview */}

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

          <h2 className="text-2xl font-bold mb-6">
            Uploaded Medical Report
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-xl h-80 flex items-center justify-center">

            <div className="text-center">

              <p className="text-5xl mb-4">
                📄
              </p>

              <p className="font-semibold">
                Blood_Test_Report.pdf
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Uploaded Successfully
              </p>

            </div>

          </div>

          <div className="mt-6 flex gap-4">

            <button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 hover:scale-105 active:scale-95 transition-all duration-300">
              Upload Report
            </button>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300">
              Download Report
            </button>

          </div>

        </div>

        {/* AI Summary */}

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

          <h2 className="text-2xl font-bold mb-6">
            AI Generated Summary
          </h2>

          <div className="space-y-5 text-gray-700">

            <p>• Mild fever detected</p>

            <p>• Chest pain symptoms require monitoring</p>

            <p>• Recommended consultation with cardiologist</p>

            <p>• Urgency Level: Moderate</p>

          </div>

        </div>

      </div>

    </div>
  )
}