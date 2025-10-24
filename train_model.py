import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
data = pd.read_csv('data/loan_data.csv')

# Drop missing values
data = data.dropna(subset=['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Credit_History', 'Loan_Status'])

# Encode target variable
data['Loan_Status'] = data['Loan_Status'].map({'Y': 1, 'N': 0})

# Feature selection
X = data[['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Credit_History']]
y = data['Loan_Status']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model training
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("Model Accuracy:", accuracy_score(y_test, y_pred))

# Save model
joblib.dump(model, 'model.pkl')
print("✅ Model trained and saved successfully.")
