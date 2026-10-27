@echo off
setlocal
set "PATH=C:\Program Files\Git\cmd;C:\Users\Anupriya\AppData\Local\Programs\nodejs;%PATH%"
echo ===================================================================
echo         DXNANCHAL Product Guide - Push to GitHub Utility
echo ===================================================================
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g., https://github.com/your-username/your-repo.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] No repository URL entered. Aborting.
    pause
    exit /b 1
)

echo.
echo [*] Setting remote origin to %REPO_URL%...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [*] Ensuring main branch...
git branch -M main

echo [*] Pushing to GitHub (origin/main)...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] Code successfully pushed to GitHub!
) else (
    echo.
    echo [NOTICE] If authentication failed, use a GitHub Personal Access Token (PAT)
    echo or ensure you have write permissions to this repository.
)

echo.
pause
