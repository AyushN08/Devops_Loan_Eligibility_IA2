pipeline {
    agent any

    environment {
        VENV_DIR = 'venv'
        BACKEND_DIR = '.'
        FRONTEND_DIR = 'frontend'  // change if your Vite app folder name differs
        DOCKER_IMAGE = 'loan_eligibility_app'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '🔄 Checking out code from GitHub...'
                git branch: 'feature/frontend-vite', url: 'https://github.com/AyushN08/Devops_Loan_Eligibility_IA2.git'
            }
        }

        stage('Setup Python Environment') {
            steps {
                echo '🐍 Setting up Python virtual environment...'
                bat """
                python -m venv %VENV_DIR%
                call %VENV_DIR%\\Scripts\\activate
                pip install --upgrade pip
                pip install -r requirements.txt
                """
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir("${FRONTEND_DIR}") {
                    echo '📦 Installing frontend dependencies...'
                    bat """
                    call npm install
                    """
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    echo '🏗️ Building Vite React app...'
                    bat """
                    call npm run build
                    """
                }
            }
        }

        stage('Test Backend') {
            steps {
                echo '🧪 Testing Flask app...'
                bat """
                call %VENV_DIR%\\Scripts\\activate
                python -m py_compile app.py
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                bat """
                docker build -t %DOCKER_IMAGE% .
                """
            }
        }

        stage('Post-Build Summary') {
            steps {
                echo '✅ Build successful! Flask backend and Vite frontend are ready.'
            }
        }
    }

    post {
        success {
            echo '🎉 Jenkins Pipeline completed successfully.'
        }
        failure {
            echo '❌ Build failed. Check logs for details.'
        }
    }
}
