from flask import Flask, request, render_template, jsonify
import joblib
import numpy as np
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the trained model
model = joblib.load('model.pkl')


# -------------------------------
# ROUTE 1: Old HTML form frontend
# -------------------------------
@app.route('/')
def home():
    # Renders your existing form.html (for backward compatibility)
    return render_template('form.html')


@app.route('/predict', methods=['POST'])
def predict():
    """
    Handles predictions from the existing HTML form.
    Renders the same form with the prediction result.
    """
    try:
        income = float(request.form['ApplicantIncome'])
        co_income = float(request.form['CoapplicantIncome'])
        loan_amount = float(request.form['LoanAmount'])
        credit = float(request.form['Credit_History'])

        # Prepare features for model prediction
        features = np.array([[income, co_income, loan_amount, credit]])
        prediction = model.predict(features)[0]

        # Convert numeric prediction to label
        result = 'Eligible' if prediction == 1 else 'Not Eligible'

        # Render the same page with the result
        return render_template('form.html', prediction=result)

    except Exception as e:
        return render_template('form.html', prediction=f"Error: {str(e)}")


# ----------------------------------------
# ROUTE 2: JSON API for React (Vite) app
# ----------------------------------------
@app.route('/api/predict', methods=['POST'])
def api_predict():
    """
    Handles predictions from the React frontend.
    Returns a JSON response instead of HTML.
    """
    try:
        # Get data either as form-data or JSON
        data = request.form or request.json

        income = float(data['ApplicantIncome'])
        co_income = float(data['CoapplicantIncome'])
        loan_amount = float(data['LoanAmount'])
        credit = float(data['Credit_History'])

        # Predict
        features = np.array([[income, co_income, loan_amount, credit]])
        prediction = model.predict(features)[0]
        result = 'Eligible' if prediction == 1 else 'Not Eligible'

        # Return clean JSON
        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# -------------------------------
# MAIN ENTRY POINT
# -------------------------------
if __name__ == '__main__':
    # You can change host='127.0.0.1' if you want it local-only
    app.run(host='0.0.0.0', port=5000, debug=True)
