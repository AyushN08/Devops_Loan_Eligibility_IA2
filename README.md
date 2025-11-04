🏦 Loan Eligibility Prediction — Full Stack (Flask + Vite)
📘 Project Overview

The Loan Eligibility Prediction project is a full-stack application built using Flask (Python) for the backend and Vite + React + TypeScript for the frontend.
It predicts whether a loan applicant is eligible or not eligible based on income, co-applicant income, loan amount, and credit history — using a pre-trained Machine Learning model (model.pkl).

This project is also integrated with Docker, Jenkins CI/CD, and GitHub Actions, demonstrating a complete DevOps workflow.

🧠 Features

Machine Learning model trained on real-world loan dataset

Flask backend API for predictions

Modern frontend built with Vite + React (TypeScript)

CORS-enabled backend for API communication

Dockerized setup for easy deployment

Jenkins pipeline for CI/CD automation

GitHub webhook integration for automatic build triggers

🧩 Tech Stack
Layer	Technology
Frontend	React + TypeScript (Vite)
Backend	Python Flask
Machine Learning	scikit-learn, joblib, numpy
Build & Deploy	Docker
CI/CD	Jenkins + GitHub Webhooks
Version Control	Git + GitHub
📁 Folder Structure
Loan_Eligibility_Devops_IA/
│
├── data/
│   └── loan_data.csv
│
├── templates/
│   └── form.html          # Old Flask-based form (still supported)
│
├── venv/                  # Virtual environment (ignored in .gitignore)
│
├── frontend/              # Vite + React frontend
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── App.tsx
│       └── App.css
│
├── app.py                 # Flask backend API
├── model.pkl              # Trained ML model
├── requirements.txt       # Python dependencies
├── Dockerfile             # Container setup
├── Jenkinsfile            # CI/CD pipeline configuration
└── .gitignore             # Files ignored by Git

⚙️ Local Setup
🐍 Backend Setup (Flask)

Create and activate virtual environment

python -m venv venv
venv\Scripts\activate      # (Windows)
source venv/bin/activate   # (Mac/Linux)


Install dependencies

pip install -r requirements.txt


Run Flask server

python app.py


Backend will start on http://localhost:5000

⚛️ Frontend Setup (Vite + React + TypeScript)

Navigate to frontend

cd frontend


Install dependencies

npm install


Run development server

npm run dev


Frontend runs on http://localhost:5173

🌐 Connect Frontend & Backend

The frontend sends POST requests to:

http://localhost:5000/api/predict


Flask handles the request, predicts eligibility, and returns JSON:

{ "prediction": "Eligible" }


Make sure both servers are running at the same time.

🐳 Docker Setup

Build Docker image

docker build -t loan_eligibility_app .


Run container

docker run -d -p 5000:5000 loan_eligibility_app


Access Flask API at:

http://localhost:5000

🔄 CI/CD Setup
⚙️ Jenkins Configuration

Install NodeJS Plugin and Python Plugin

Configure:

NodeJS installation (Manage Jenkins → Tools → NodeJS)

Python installation (optional, if not using Docker)

Add GitHub credentials under Manage Jenkins → Credentials

Create a Jenkins pipeline project linked to your GitHub repo

Use the included Jenkinsfile for pipeline stages:

Build frontend (Vite)

Build Docker image

Run container

Post success/failure status

🔗 GitHub Webhook Setup

Go to your GitHub repo → Settings → Webhooks

Click Add webhook

Enter:

Payload URL:
http://<your_jenkins_server>:8080/github-webhook/

Content type: application/json

Select “Just the push event”

Click Add webhook

Now every push triggers Jenkins to build automatically 🚀


🚀 Run Everything Together

Start Flask (or Docker)

Run Vite frontend

Open browser → http://localhost:5173

Fill out loan form → Click Predict

See your loan eligibility result instantly 🎯