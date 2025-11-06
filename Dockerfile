# Step 1: Build React app
FROM node:18 AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Step 2: Setup Flask backend
FROM python:3.10-slim
WORKDIR /app

# Copy backend files
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Copy built React app into Flask static folder
COPY --from=build-frontend /app/frontend/dist ./frontend/dist

EXPOSE 5000
CMD ["python", "app.py"]
