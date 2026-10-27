@echo off
setlocal enabledelayedexpansion

:: Check if running as administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ========================================================
    echo  Requesting Administrator permission to fix folder access...
    echo ========================================================
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process cmd -ArgumentList '/c \"\"%~f0\"\"' -Verb RunAs"
    exit /b
)

cd /d "%~dp0"
title Push Portfolio to GitHub

echo ========================================================
echo    Push Portfolio Changes to GitHub
echo ========================================================
echo.

:: Step 1: Fix permissions on the project directory
echo [1/5] Granting full permissions to project and .git folder...
icacls "%~dp0." /grant Users:(OI)(CI)F /T >nul 2>&1

:: Step 2: Configure Git user and remote
echo [2/5] Setting up Git repository configuration...
git config user.name "AlbashengineerAhmed"
git config user.email "albashengineerahmed@gmail.com"

set "DEFAULT_REMOTE=https://github.com/albashmohandisahmed/portfolio.git"
echo.
echo Current target repository: %DEFAULT_REMOTE%
echo (Press Enter to keep this, or paste a new GitHub repository URL)
set /p USER_REMOTE="Enter GitHub URL [or press Enter]: "
if "!USER_REMOTE!"=="" set "USER_REMOTE=%DEFAULT_REMOTE%"

git remote set-url origin !USER_REMOTE!

:: Step 3: Clear any cached credentials so the browser prompt opens for the other account
echo [3/5] Resetting cached GitHub credentials for browser login...
cmdkey /delete:LegacyGeneric:target=git:https://github.com >nul 2>&1

:: Step 4: Add and commit changes
echo [4/5] Staging and committing changes...
git add .
git commit -m "style: enhance UI design, contact page, and page video layout"

:: Step 5: Push to GitHub
echo.
echo ========================================================
echo [5/5] Pushing to GitHub...
echo A browser window will now open to log into your GitHub account.
echo Please sign in with the account that has access to !USER_REMOTE!
echo ========================================================
echo.
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo  SUCCESS: All changes pushed to GitHub!
    echo ========================================================
) else (
    echo ========================================================
    echo  Push encountered an issue. Please review the output above.
    echo ========================================================
)

echo.
pause
