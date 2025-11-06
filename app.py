from flask import Flask, request, jsonify, send_from_directory
import joblib
import numpy as np
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__, static_folder="frontend/dist", static_url_path="")
CORS(app, resources={r"/*": {"origins": "*"}})

# Load trained model
model = joblib.load('model.pkl')


# -------------------------------
# ROUTE: React Frontend
# -------------------------------
@app.route('/')
def serve_react():
    """Serve React build index.html"""
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:path>')
def static_proxy(path):
    """Serve other React static assets (JS, CSS, etc.)"""
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        # If route not found, fallback to index.html (for React Router)
        return send_from_directory(app.static_folder, 'index.html')


# -------------------------------
# ROUTE: JSON API for React App
# -------------------------------
@app.route('/api/predict', methods=['POST'])
def api_predict():
    try:
        data = request.get_json() or request.form
        income = float(data['ApplicantIncome'])
        co_income = float(data['CoapplicantIncome'])
        loan_amount = float(data['LoanAmount'])
        credit = float(data['Credit_History'])

        # Predict
        features = np.array([[income, co_income, loan_amount, credit]])
        prediction = model.predict(features)[0]
        result = 'Eligible' if prediction == 1 else 'Not Eligible'

        return jsonify({"prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# -------------------------------
# MAIN ENTRY POINT
# -------------------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
