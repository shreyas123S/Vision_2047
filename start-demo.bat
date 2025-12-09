@echo off
REM Demo Setup Script for Kannama Hackathon
REM This script sets up everything needed for the call demo

echo.
echo ========================================
echo  Kannama Demo Setup
echo ========================================
echo.

REM Check if .env exists
if not exist "backend\.env" (
    echo Error: backend\.env not found!
    echo Please create backend\.env with Exotel credentials first.
    echo See DEMO_CALL_SETUP.md for instructions.
    pause
    exit /b 1
)

echo [1/3] Starting Flask Backend...
echo.
start "" cmd /k "cd backend && python app.py"
timeout /t 3 /nobreak

echo [2/3] Starting ngrok (webhook tunnel)...
echo.
echo Note: Install ngrok from https://ngrok.com/download first!
echo.
start "" cmd /k "ngrok http 5000"
timeout /t 5 /nobreak

echo [3/3] Starting React Frontend...
echo.
start "" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo Services running:
echo   - Backend:   http://localhost:5000
echo   - Frontend:  http://localhost:5173
echo   - ngrok:     Check ngrok terminal for forwarding URL
echo.
echo Update IVR_CALLBACK_BASE_URL in backend\.env with ngrok URL!
echo.
echo Press any key to exit this window...
pause
