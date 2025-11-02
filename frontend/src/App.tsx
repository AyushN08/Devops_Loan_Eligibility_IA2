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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Loan Eligibility Predictor
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Applicant Income
            </label>
            <input
              type="number"
              value={ApplicantIncome}
              onChange={(e) => setApplicantIncome(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Coapplicant Income
            </label>
            <input
              type="number"
              value={CoapplicantIncome}
              onChange={(e) => setCoapplicantIncome(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Loan Amount
            </label>
            <input
              type="number"
              value={LoanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Credit History (1 for Yes, 0 for No)
            </label>
            <input
              type="number"
              value={Credit_History}
              onChange={(e) => setCreditHistory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Predict
          </button>
        </form>

        {prediction && (
          <div className="mt-6 text-center text-lg font-semibold text-green-600">
            Result: {prediction}
          </div>
        )}

        {error && (
          <div className="mt-6 text-center text-lg font-semibold text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
