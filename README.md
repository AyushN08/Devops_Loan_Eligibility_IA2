# 🏦 Loan Eligibility Prediction (Devops + AI)

A full-stack web application that predicts loan approval eligibility based on user inputs such as income, loan amount, and credit history.  
This project uses a **React (TypeScript)** frontend and a **Flask (Python)** backend API for prediction.

---

## 🚀 Features
- Simple and intuitive UI for loan input fields.
- Real-time prediction using a trained model (Flask API).
- Modular frontend-backend separation for easy deployment.
- Ready for CI/CD integration using Jenkins or GitHub Actions.

---

## 🧩 Tech Stack
| Layer | Technology |
|--------|-------------|
| Frontend | React + TypeScript + Axios |
| Backend | Python + Flask |
| Styling | CSS (custom responsive styling) |
| API | REST (POST `/api/predict`) |

---

## 📁 Folder Structure
loan-prediction-app/
│
├── backend/
│ ├── app.py # Flask backend
│ ├── model.pkl # Trained ML model (if applicable)
│ ├── requirements.txt # Python dependencies
│
├── frontend/
│ ├── src/
│ │ ├── App.tsx # React component with form + logic
│ │ ├── App.css # Styling
│ │ ├── index.tsx
│ │ └── ...other files
│ ├── package.json
│
├── README.md
└── ...

## ⚙️ Backend Setup (Flask API)
### 1️⃣ Navigate to the backend folder:
cd backend

### 2️⃣ Create and activate a virtual environment:
python -m venv venv
venv\Scripts\activate    # (Windows)
# OR
source venv/bin/activate # (Mac/Linux)

### 3️⃣ Install dependencies:
pip install -r requirements.txt

### 4️⃣ Run the flask App:
python app.py
The backend will start on http://localhost:5000.


## 🧩 Frontend Setup (React + TypeScript)
### 1️⃣ Navigate to the frontend folder:
cd frontend

### 2️⃣ Install dependencies:
npm install

### 3️⃣ Start the frontend:
npm run dev
Frontend will run on http://localhost:5173.


