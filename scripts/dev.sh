#!/bin/bash

# Development script for Qualifica Leads
# This script helps start both frontend and backend services

echo "🚀 Starting Qualifica Leads Development Environment"

# Function to start backend
start_backend() {
    echo "📡 Starting Python FastAPI backend..."
    cd backend
    if [ ! -d "venv" ]; then
        echo "Creating Python virtual environment..."
        python -m venv venv
    fi
    source venv/bin/activate
    pip install -r requirements.txt
    python main.py &
    BACKEND_PID=$!
    cd ..
}

# Function to start frontend
start_frontend() {
    echo "🎨 Starting Next.js frontend..."
    npm run dev &
    FRONTEND_PID=$!
}

# Trap to cleanup processes on exit
cleanup() {
    echo "🛑 Shutting down services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start services
start_backend
start_frontend

echo "✅ Services started!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for processes
wait