@echo off
title Swiss Nik Launcher (Repair Mode)
cd /d "C:\Users\karpo\swiss-nik"
cls
echo ===================================================
echo   SWISS NIK - REPAIR & LAUNCH
echo ===================================================
echo.
echo 1. Stopping any stuck processes...
taskkill /f /im node.exe >nul 2>&1
echo.
echo 2. Clearing temporary build files...
rmdir /s /q .next >nul 2>&1
echo.
echo 3. Installing dependencies (just in case)...
call npm install
echo.
echo 4. Launching App...
echo    - Please wait for "Ready" to appear below.
echo    - Your browser will open automatically.
echo.
start "" "http://localhost:3000"
npm run dev
pause
