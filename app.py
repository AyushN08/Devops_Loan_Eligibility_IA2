from flask import Flask, request, render_template
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load('model.pkl')

# Home page with form
@app.route('/')
def home():
    return render_template('form.html')

# Form submission endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        income = float(request.form['ApplicantIncome'])
        co_income = float(request.form['CoapplicantIncome'])
        loan_amount = float(request.form['LoanAmount'])
        credit = float(request.form['Credit_History'])

        features = np.array([[income, co_income, loan_amount, credit]])
        prediction = model.predict(features)[0]
        result = 'Eligible' if prediction == 1 else 'Not Eligible'

        return render_template('form.html', prediction=result)
    
    except Exception as e:
        # In case user inputs are invalid
        return render_template('form.html', prediction=f"Error: {str(e)}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
