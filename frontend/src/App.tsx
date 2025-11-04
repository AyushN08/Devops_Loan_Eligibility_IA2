import { useState } from "react";
import axios from "axios";

function App() {
  const [ApplicantIncome, setApplicantIncome] = useState("");
  const [CoapplicantIncome, setCoapplicantIncome] = useState("");
  const [LoanAmount, setLoanAmount] = useState("");
  const [Credit_History, setCreditHistory] = useState("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPrediction(null);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/predict", {
        ApplicantIncome,
        CoapplicantIncome,
        LoanAmount,
        Credit_History,
      });

      if (response.data.prediction) {
        setPrediction(response.data.prediction);
      } else if (response.data.error) {
        setError(response.data.error);
      }
    } catch (err: any) {
      setError("Failed to connect to backend. Make sure Flask is running.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg px-10 py-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
          🏦 Loan Eligibility Predictor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Applicant Income
            </label>
            <input
              type="number"
              value={ApplicantIncome}
              onChange={(e) => setApplicantIncome(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Coapplicant Income
            </label>
            <input
              type="number"
              value={CoapplicantIncome}
              onChange={(e) => setCoapplicantIncome(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Loan Amount
            </label>
            <input
              type="number"
              value={LoanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Credit History (1 for Yes, 0 for No)
            </label>
            <input
              type="number"
              value={Credit_History}
              onChange={(e) => setCreditHistory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              min="0"
              max="1"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-[1px] transition-all duration-200"
          >
            Predict
          </button>
        </form>

        {prediction && (
          <div className="mt-8 text-center text-lg font-semibold text-green-600 bg-green-50 border border-green-200 py-3 rounded-lg">
            ✅ Result: {prediction}
          </div>
        )}

        {error && (
          <div className="mt-8 text-center text-lg font-semibold text-red-600 bg-red-50 border border-red-200 py-3 rounded-lg">
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
