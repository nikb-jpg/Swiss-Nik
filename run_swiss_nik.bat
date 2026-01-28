@echo off
title Swiss Nik Launcher
cd /d "C:\Users\karpo\swiss-nik"
echo Starting Swiss Nik...
echo.
echo 1. Cleaning up previous sessions...
taskkill /f /im node.exe >nul 2>&1
echo 2. Installing/Updating dependencies (this might take a moment)...
call npm install
echo.
echo 3. Starting the App Server...
echo    - Once started, your browser should open automatically.
echo    - If it doesn't, go to: http://localhost:3000
echo.
start "" "http://localhost:3000"
npm run dev
pause